import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  wa_id: String,
  name: String,
  message: String,
  timestamp: Date,
  status: { type: String, enum: ["sent", "delivered", "read"], default: "sent" },
  meta_msg_id: String,
  direction: { type: String, enum: ["incoming", "outgoing"], default: "incoming" }
});

// Create a unique index to prevent duplicates
messageSchema.index({ meta_msg_id: 1 }, { unique: true });

export default mongoose.model("Message", messageSchema);