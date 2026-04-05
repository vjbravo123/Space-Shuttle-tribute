import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

export const connectDB = async () => {
  console.log("DB URI:", process.env.MONGODB_URI);
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGODB_URI);
};

// Story Schema
const storySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  title: { type: String, required: true },
  narrative: { type: String, required: true },
  mission: { type: String, enum: ["challenger", "columbia"], required: true },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Story = mongoose.models.Story || mongoose.model("Story", storySchema);