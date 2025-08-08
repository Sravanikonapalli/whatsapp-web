// backend/routes/messageRoutes.js
import express from 'express';
import { 
  getMessagesByUser, 
  postMessage, 
  getAllMessages,
  deleteMessage,
  getConversations
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/conversations", getConversations);
router.get("/messages", getAllMessages);
router.get("/messages/:wa_id", getMessagesByUser);
router.post("/messages", postMessage);
router.delete("/messages/:id", deleteMessage);

export default router;