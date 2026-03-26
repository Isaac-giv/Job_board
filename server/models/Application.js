import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  seeker: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resume: { type: String, required: true },
  coverLetter: String,
  status: { type: String, enum: ['pending', 'reviewed', 'rejected'], default: 'pending' },
}, { timestamps: true });

// Ensure a seeker can only apply once per job
ApplicationSchema.index({ job: 1, seeker: 1 }, { unique: true });

export default mongoose.model('Application', ApplicationSchema);