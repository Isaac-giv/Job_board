import express from 'express';
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import User from '../models/User.js';
import { protect, employerOnly, seekerOnly } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import { sendEmail } from '../utils/email.js'; // optional

const router = express.Router();

// @route   POST /api/applications/:jobId
router.post('/:jobId', protect, seekerOnly, upload.single('resume'), async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    const existing = await Application.findOne({
      job: req.params.jobId,
      seeker: req.user.id
    });
    if (existing) return res.status(400).json({ msg: 'Already applied to this job' });

    const { coverLetter } = req.body;
    // Store relative path (uploads/filename) instead of absolute path
    const resumePath = req.file ? `uploads/${req.file.filename}` : null;
    if (!resumePath) return res.status(400).json({ msg: 'Resume file is required' });

    const application = new Application({
      job: req.params.jobId,
      seeker: req.user.id,
      resume: resumePath,
      coverLetter
    });
    await application.save();

    // Optional email notification
    const employer = await User.findById(job.employer);
    if (employer && process.env.EMAIL_USER) {
      try {
        await sendEmail({
          to: employer.email,
          subject: `New application for ${job.title}`,
          text: `${req.user.name} applied to ${job.title}. Check the dashboard.`
        });
      } catch (emailErr) {
        console.error('Email failed:', emailErr);
      }
    }

    res.json(application);
  } catch (err) {
    console.error(err.message);
    if (err.code === 11000) {
      return res.status(400).json({ msg: 'Already applied to this job' });
    }
    res.status(500).send('Server error');
  }
});

// @route   GET /api/applications/employer
router.get('/employer', protect, employerOnly, async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user.id }).select('_id');
    const jobIds = jobs.map(j => j._id);
    const applications = await Application.find({ job: { $in: jobIds } })
      .populate('job', 'title company')
      .populate('seeker', 'name email');
    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/applications/seeker
router.get('/seeker', protect, seekerOnly, async (req, res) => {
  try {
    const applications = await Application.find({ seeker: req.user.id })
      .populate('job', 'title company location');
    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/applications/:id/status
router.put('/:id/status', protect, employerOnly, async (req, res) => {
  const { status } = req.body;
  try {
    const application = await Application.findById(req.params.id).populate('job');
    if (!application) return res.status(404).json({ msg: 'Application not found' });

    if (application.job.employer.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    application.status = status;
    await application.save();
    res.json(application);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;