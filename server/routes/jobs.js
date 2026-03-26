import express from 'express';
import Job from '../models/Job.js';
import { protect, employerOnly } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/jobs/:id
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('employer', 'name email');
    if (!job) return res.status(404).json({ msg: 'Job not found' });
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/jobs/employer/me
router.get('/employer/me', protect, employerOnly, async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/jobs
router.post('/', protect, employerOnly, async (req, res) => {
  const { title, company, location, description, requirements, salary } = req.body;
  try {
    const newJob = new Job({
      title,
      company,
      location,
      description,
      requirements,
      salary,
      employer: req.user.id
    });
    const job = await newJob.save();
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/jobs/:id
router.put('/:id', protect, employerOnly, async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: 'Job not found' });
    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    job = await Job.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/jobs/:id
router.delete('/:id', protect, employerOnly, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: 'Job not found' });
    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    await job.deleteOne();
    res.json({ msg: 'Job removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;