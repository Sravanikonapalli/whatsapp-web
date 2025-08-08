import fs from 'fs';
import path from 'path';
import Message from '../models/Message.js';

const PAYLOAD_DIR = path.join(process.cwd(), "payloads");
const BUSINESS_NUMBER = '918329446654'; // Our business number

export async function processPayloads() {
  // Clear existing messages to start fresh
  await Message.deleteMany({});
  console.log("Cleared existing messages");
  
  const files = fs.readdirSync(PAYLOAD_DIR);
  const processedIds = new Set(); // Track processed message IDs

  for (const file of files) {
    const filePath = path.join(PAYLOAD_DIR, file);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const entry = jsonData.metaData?.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;

    // Handle messages
    const messages = value?.messages || [];
    const contact = value?.contacts?.[0];
    const businessNumber = value?.metadata?.display_phone_number || BUSINESS_NUMBER;

    for (const msg of messages) {
      const { from, text, timestamp, id } = msg;

      if (processedIds.has(id)) {
        console.log(`Message with ID ${id} already processed, skipping`);
        continue;
      }
      
      processedIds.add(id);

      // Determine direction
      const direction = from === businessNumber ? "outgoing" : "incoming";
      
      // For outgoing messages, the recipient is the contact
      const wa_id = direction === "incoming" ? from : contact?.wa_id;

      try {
        await Message.create({
          wa_id,
          name: contact?.profile?.name || "Unknown",
          message: text?.body || "",
          timestamp: new Date(Number(timestamp) * 1000),
          status: "sent",
          meta_msg_id: id,
          direction
        });

        console.log(`Processed message from ${from}`);
      } catch (err) {
        console.error(`Error processing message: ${err}`);
      }
    }

    // Handle statuses
    const statuses = value?.statuses || [];
    for (const statusObj of statuses) {
      const { id, status } = statusObj;

      try {
        const updated = await Message.findOneAndUpdate(
          { meta_msg_id: id },
          { status },
          { new: true }
        );

        if (updated) {
          console.log(`Updated status of ${id} to ${status}`);
        } else {
          console.warn(`Message with ID ${id} not found`);
        }
      } catch (err) {
        console.error(`Error updating status: ${err}`);
      }
    }
  }
}