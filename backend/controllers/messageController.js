// backend/controllers/messageController.js
import Message from "../models/Message.js";

export const getConversations = async (req, res) => {
  try {
    // Get unique conversations with last message
    const conversations = await Message.aggregate([
      { $sort: { timestamp: -1 } },
      { $group: {
          _id: "$wa_id",
          wa_id: { $first: "$wa_id" },
          name: { $first: "$name" },
          lastMessage: { $first: "$message" },
          lastTimestamp: { $first: "$timestamp" },
          lastStatus: { $first: "$status" }
      }},
      { $sort: { lastTimestamp: -1 } }
    ]);
    
    res.json(conversations);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
};

export const getMessagesByUser = async (req, res) => {
  try {
    const messages = await Message.find({ wa_id: req.params.wa_id }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch all messages" });
  }
};

export const postMessage = async (req, res) => {
  try {
    const { wa_id, name, message } = req.body;
    const BUSINESS_NUMBER = '918329446654';

    const newMessage = await Message.create({
      wa_id,
      name,
      message,
      timestamp: new Date(),
      status: "sent",
      meta_msg_id: Math.random().toString(36).substr(2, 9),
      direction: "outgoing"
    });

    // Emit the new message via socket
    req.app.get('io').emit('newMessage', newMessage);

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Deletion failed" });
  }
};