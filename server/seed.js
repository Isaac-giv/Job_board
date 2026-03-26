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

    // Clear existing data for fresh seed (optional - remove if you want to keep existing data)
    // await Application.deleteMany({});
    // await Job.deleteMany({});
    // await User.deleteMany({});

    const employerPassword = await bcrypt.hash('employer123', 10);
    const seekerPassword = await bcrypt.hash('seeker123', 10);

    // 1. Create Demo Employers
    const employersData = [
      { name: 'TechCorp Inc.', email: 'employer@demo.com', password: employerPassword, role: 'employer' },
      { name: 'StartupX Labs', email: 'startupx@demo.com', password: employerPassword, role: 'employer' },
      { name: 'DataFlow Systems', email: 'dataflow@demo.com', password: employerPassword, role: 'employer' },
      { name: 'CloudNine Solutions', email: 'cloudnine@demo.com', password: employerPassword, role: 'employer' },
    ];

    const employers = [];
    for (const empData of employersData) {
      let employer = await User.findOne({ email: empData.email });
      if (!employer) {
        employer = new User(empData);
        await employer.save();
        console.log(`Employer created: ${empData.name}`);
      }
      employers.push(employer);
    }

    // 2. Create Demo Job Seekers
    const seekersData = [
      { name: 'John Smith', email: 'seeker@demo.com', password: seekerPassword, role: 'seeker' },
      { name: 'Sarah Johnson', email: 'sarah@demo.com', password: seekerPassword, role: 'seeker' },
      { name: 'Michael Chen', email: 'michael@demo.com', password: seekerPassword, role: 'seeker' },
      { name: 'Emily Davis', email: 'emily@demo.com', password: seekerPassword, role: 'seeker' },
      { name: 'David Wilson', email: 'david@demo.com', password: seekerPassword, role: 'seeker' },
    ];

    const seekers = [];
    for (const seekerData of seekersData) {
      let seeker = await User.findOne({ email: seekerData.email });
      if (!seeker) {
        seeker = new User(seekerData);
        await seeker.save();
        console.log(`Seeker created: ${seekerData.name}`);
      }
      seekers.push(seeker);
    }

    // 3. Create Demo Jobs
    const jobsData = [
      {
        title: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        location: 'Remote',
        description: 'We are looking for an experienced Frontend Developer to join our team. You will be responsible for building scalable user interfaces and working with our design team to implement pixel-perfect designs.',
        requirements: '5+ years React experience, TypeScript, Redux, CSS-in-JS, Experience with testing frameworks',
        salary: '$120,000 - $150,000',
        type: 'Full-time',
        category: 'Engineering',
        employer: employers[0]._id,
      },
      {
        title: 'Backend Engineer',
        company: 'TechCorp Inc.',
        location: 'New York, NY',
        description: 'Join our backend team to build robust APIs and microservices. You will work on high-traffic systems serving millions of users.',
        requirements: 'Node.js, Express, MongoDB, PostgreSQL, Docker, Kubernetes, 3+ years experience',
        salary: '$110,000 - $140,000',
        type: 'Full-time',
        category: 'Engineering',
        employer: employers[0]._id,
      },
      {
        title: 'Full Stack Developer',
        company: 'StartupX Labs',
        location: 'San Francisco, CA',
        description: 'Early-stage startup looking for a versatile Full Stack Developer. You will work on both frontend and backend features in a fast-paced environment.',
        requirements: 'MERN stack, TypeScript, Git, AWS, Startup experience preferred',
        salary: '$100,000 - $130,000',
        type: 'Full-time',
        category: 'Engineering',
        employer: employers[1]._id,
      },
      {
        title: 'Product Designer',
        company: 'StartupX Labs',
        location: 'Remote',
        description: 'Looking for a creative Product Designer to help shape our product vision. You will work closely with engineers and product managers.',
        requirements: 'Figma, Adobe Creative Suite, User Research, Prototyping, 3+ years experience',
        salary: '$90,000 - $120,000',
        type: 'Full-time',
        category: 'Design',
        employer: employers[1]._id,
      },
      {
        title: 'Data Scientist',
        company: 'DataFlow Systems',
        location: 'Austin, TX',
        description: 'Help us build machine learning models to analyze large datasets. You will work on predictive analytics and data visualization projects.',
        requirements: 'Python, TensorFlow/PyTorch, SQL, Statistics, 2+ years ML experience',
        salary: '$115,000 - $145,000',
        type: 'Full-time',
        category: 'Data Science',
        employer: employers[2]._id,
      },
      {
        title: 'DevOps Engineer',
        company: 'DataFlow Systems',
        location: 'Seattle, WA',
        description: 'We need a DevOps Engineer to manage our cloud infrastructure and CI/CD pipelines. Experience with AWS and Azure preferred.',
        requirements: 'AWS, Azure, Terraform, Jenkins, Docker, Kubernetes, 4+ years experience',
        salary: '$125,000 - $155,000',
        type: 'Full-time',
        category: 'Engineering',
        employer: employers[2]._id,
      },
      {
        title: 'Mobile App Developer (iOS)',
        company: 'CloudNine Solutions',
        location: 'Los Angeles, CA',
        description: 'Join our mobile team to build iOS applications. You will work on consumer-facing apps with millions of downloads.',
        requirements: 'Swift, UIKit, SwiftUI, Core Data, 3+ years iOS development',
        salary: '$110,000 - $140,000',
        type: 'Full-time',
        category: 'Engineering',
        employer: employers[3]._id,
      },
      {
        title: 'Mobile App Developer (Android)',
        company: 'CloudNine Solutions',
        location: 'Los Angeles, CA',
        description: 'Looking for an Android Developer to join our growing team. You will build and maintain high-quality Android applications.',
        requirements: 'Kotlin, Java, Android SDK, Jetpack Compose, Firebase',
        salary: '$105,000 - $135,000',
        type: 'Full-time',
        category: 'Engineering',
        employer: employers[3]._id,
      },
      {
        title: 'UX Researcher',
        company: 'TechCorp Inc.',
        location: 'Chicago, IL',
        description: 'Conduct user research to inform product decisions. You will run usability tests, surveys, and interviews.',
        requirements: 'User Research, Usability Testing, Data Analysis, 2+ years experience',
        salary: '$85,000 - $110,000',
        type: 'Full-time',
        category: 'Design',
        employer: employers[0]._id,
      },
      {
        title: 'Technical Writer',
        company: 'StartupX Labs',
        location: 'Remote',
        description: 'Create clear and concise technical documentation for our developer platform. You will work with engineers to document APIs and SDKs.',
        requirements: 'Technical Writing, API Documentation, Markdown, Developer Experience',
        salary: '$75,000 - $95,000',
        type: 'Contract',
        category: 'Content',
        employer: employers[1]._id,
      },
      {
        title: 'QA Engineer',
        company: 'DataFlow Systems',
        location: 'Denver, CO',
        description: 'Ensure the quality of our products through automated and manual testing. You will build test frameworks and write test cases.',
        requirements: 'Selenium, Cypress, Jest, Test Automation, 2+ years QA experience',
        salary: '$85,000 - $110,000',
        type: 'Full-time',
        category: 'Engineering',
        employer: employers[2]._id,
      },
      {
        title: 'Project Manager',
        company: 'CloudNine Solutions',
        location: 'Miami, FL',
        description: 'Lead cross-functional teams to deliver projects on time. You will work with engineering, design, and business teams.',
        requirements: 'Agile/Scrum, Jira, Stakeholder Management, PMP certification preferred',
        salary: '$95,000 - $125,000',
        type: 'Full-time',
        category: 'Management',
        employer: employers[3]._id,
      },
    ];

    const createdJobs = [];
    for (const jobData of jobsData) {
      let job = await Job.findOne({ title: jobData.title, company: jobData.company });
      if (!job) {
        job = new Job(jobData);
        await job.save();
        console.log(`Job created: ${jobData.title} at ${jobData.company}`);
      }
      createdJobs.push(job);
    }

    // 4. Create Demo Applications with various statuses
    const applicationsData = [
      // John Smith's applications
      { job: createdJobs[0], seeker: seekers[0], status: 'pending', coverLetter: 'I am excited about this opportunity. My 6 years of React experience makes me a strong fit for this role.' },
      { job: createdJobs[2], seeker: seekers[0], status: 'reviewing', coverLetter: 'I have extensive experience with the MERN stack and would love to contribute to your startup.' },
      { job: createdJobs[4], seeker: seekers[0], status: 'rejected', coverLetter: 'I am transitioning into data science and believe my engineering background would be valuable.' },
      
      // Sarah Johnson's applications
      { job: createdJobs[1], seeker: seekers[1], status: 'accepted', coverLetter: 'I have 4 years of backend experience with Node.js and am excited about your company mission.' },
      { job: createdJobs[3], seeker: seekers[1], status: 'pending', coverLetter: 'As a product designer with 5 years of experience, I would love to help shape your product vision.' },
      
      // Michael Chen's applications
      { job: createdJobs[5], seeker: seekers[2], status: 'reviewing', coverLetter: 'My DevOps experience at scale makes me confident I can help optimize your infrastructure.' },
      { job: createdJobs[6], seeker: seekers[2], status: 'pending', coverLetter: 'I have built several iOS apps with over 1M downloads. Would love to bring that experience to your team.' },
      { job: createdJobs[8], seeker: seekers[2], status: 'rejected', coverLetter: 'I am passionate about user research and have conducted over 50 usability studies.' },
      
      // Emily Davis's applications
      { job: createdJobs[7], seeker: seekers[3], status: 'pending', coverLetter: 'Android development is my passion. I have 4 years of experience building consumer apps.' },
      { job: createdJobs[9], seeker: seekers[3], status: 'accepted', coverLetter: 'My technical writing background and developer empathy make me ideal for this role.' },
      { job: createdJobs[10], seeker: seekers[3], status: 'reviewing', coverLetter: 'I have built comprehensive test suites that reduced bugs by 40% in my previous role.' },
      
      // David Wilson's applications
      { job: createdJobs[11], seeker: seekers[4], status: 'pending', coverLetter: 'PMP certified with 5 years of project management experience in tech.' },
      { job: createdJobs[0], seeker: seekers[4], status: 'rejected', coverLetter: 'Frontend development is my specialty. I would love to bring my skills to TechCorp.' },
    ];

    for (const appData of applicationsData) {
      const existingApp = await Application.findOne({ 
        job: appData.job._id, 
        seeker: appData.seeker._id 
      });
      
      if (!existingApp) {
        const application = new Application({
          job: appData.job._id,
          seeker: appData.seeker._id,
          resume: 'uploads/sample-resume.pdf',
          coverLetter: appData.coverLetter,
          status: appData.status,
          appliedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
        });
        await application.save();
        console.log(`Application created: ${appData.seeker.name} -> ${appData.job.title} (${appData.status})`);
      }
    }

    console.log('\n✅ Seeding completed successfully!');
    console.log('\n📋 Demo Accounts:');
    console.log('  Employers:');
    console.log('    - employer@demo.com / employer123 (TechCorp Inc.)');
    console.log('    - startupx@demo.com / employer123 (StartupX Labs)');
    console.log('    - dataflow@demo.com / employer123 (DataFlow Systems)');
    console.log('    - cloudnine@demo.com / employer123 (CloudNine Solutions)');
    console.log('  Job Seekers:');
    console.log('    - seeker@demo.com / seeker123 (John Smith)');
    console.log('    - sarah@demo.com / seeker123 (Sarah Johnson)');
    console.log('    - michael@demo.com / seeker123 (Michael Chen)');
    console.log('    - emily@demo.com / seeker123 (Emily Davis)');
    console.log('    - david@demo.com / seeker123 (David Wilson)');
    
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedDatabase();
