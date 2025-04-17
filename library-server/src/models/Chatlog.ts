import mongoose from 'mongoose';

const chatLogSchema = new mongoose.Schema({
  sessionId: { type: String, default: 'default-session' },
  userMessage: String,
  gemmaResponse: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('ChatLog', chatLogSchema);
