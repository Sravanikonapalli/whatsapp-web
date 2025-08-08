import mongoose from "mongoose";
import dotenv from "dotenv";
import { processPayloads } from "../utils/payloadProcessor.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log("Connected to MongoDB");
  await processPayloads();
  mongoose.disconnect();
})
.catch(err => console.error("DB connection failed:", err));