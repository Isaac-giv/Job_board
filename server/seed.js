// server/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Job from './models/Job.js';
import Application from './models/Application.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // 1. Create or find demo employer and seeker
    const employerPassword = await bcrypt.hash('employer123', 10);
    const seekerPassword = await bcrypt.hash('seeker123', 10);

    let employer = await User.findOne({ email: 'employer@demo.com' });
    if (!employer) {
      employer = new User({
        name: 'Demo Employer',
        email: 'employer@demo.com',
        password: employerPassword,
        role: 'employer',
      });
      await employer.save();
      console.log('Demo employer created');
    }

    let seeker = await User.findOne({ email: 'isaacakpan@gmail.com.com' });
    if (!seeker) {
      seeker = new User({
        name: 'Demo Seeker',
        email: 'seeker@demo.com',
        password: seekerPassword,
        role: 'seeker',
      });
      await seeker.save();
      console.log('Demo seeker created');
    }

    // 2. Create sample jobs (if none exist)
    const jobsCount = await Job.countDocuments();
    if (jobsCount === 0) {
      const sampleJobs = [
        {
          title: 'Frontend Developer',
          company: 'TechCorp',
          location: 'Remote',
          description: 'Build amazing user interfaces with React and modern tools.',
          requirements: 'React, JavaScript, HTML/CSS, 2+ years experience',
          salary: '$80,000 - $100,000',
          employer: employer._id,
        },
        {
          title: 'Backend Engineer',
          company: 'DataSys',
          location: 'New York, NY',
          description: 'Design and implement scalable backend services.',
          requirements: 'Node.js, Express, MongoDB, REST APIs',
          salary: '$90,000 - $120,000',
          employer: employer._id,
        },
        {
          title: 'Full Stack Developer',
          company: 'StartupX',
          location: 'San Francisco, CA',
          description: 'Work on both frontend and backend features.',
          requirements: 'MERN stack, TypeScript, Git',
          salary: '$100,000 - $130,000',
          employer: employer._id,
        },
      ];
      await Job.insertMany(sampleJobs);
      console.log('Sample jobs created');
    }

    // 3. Create sample applications for the demo seeker (if none exist)
    const applicationsCount = await Application.countDocuments({ seeker: seeker._id });
    if (applicationsCount === 0) {
      const jobs = await Job.find();
      if (jobs.length > 0) {
        const sampleApplications = jobs.slice(0, 2).map(job => ({
          job: job._id,
          seeker: seeker._id,
          resume: 'uploads/sample-resume.pdf', // dummy path; you can replace with a real file if needed
          coverLetter: 'I am very interested in this position. My skills align perfectly.',
          status: 'pending',
        }));
        await Application.insertMany(sampleApplications);
        console.log('Sample applications created for demo seeker');
      }
    }

    console.log('Seeding completed!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();