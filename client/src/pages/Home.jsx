import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import Loader from '../components/Loader';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, isEmployer, isSeeker } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/jobs')
      .then(res => setJobs(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handlePostJobClick = () => {
    if (!isAuthenticated) {
      navigate('/register');
    } else if (isEmployer) {
      navigate('/post-job');
    } else {
      alert('You need an employer account to post a job.');
    }
  };

  const handleFindJobClick = () => {
    document.getElementById('job-listings').scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) return <Loader />;

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1>Find Your Dream Job or Hire Top Talent</h1>
          <p>Join thousands of companies and job seekers on the leading job board platform. Your next career move or perfect hire is just a click away.</p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={handleFindJobClick}>
              Find a Job
            </button>
            <button className="btn btn-secondary" onClick={handlePostJobClick}>
              Post a Job
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>{jobs.length}+</h3>
              <p>Active Jobs</p>
            </div>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Companies</p>
            </div>
            <div className="stat-item">
              <h3>2000+</h3>
              <p>Job Seekers</p>
            </div>
            <div className="stat-item">
              <h3>98%</h3>
              <p>Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Our Platform?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Smart Job Matching</h3>
              <p>Find the perfect match between employers and candidates with our intelligent job matching system.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Apply</h3>
              <p>Apply to jobs in seconds with your saved resume and profile information.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Application Tracking</h3>
              <p>Track your application status in real-time from submission to hire.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>Your data is protected with enterprise-grade security and privacy controls.</p>
            </div>
          </div>
        </div>
      </section>

      {/* For Job Seekers Section */}
      <section className="for-seekers">
        <div className="container">
          <div className="two-column">
            <div className="content">
              <h2>For Job Seekers</h2>
              <p className="subtitle">Your dream career starts here</p>
              <ul className="feature-list">
                <li>Browse thousands of job listings from top companies</li>
                <li>Apply with your resume and cover letter in minutes</li>
                <li>Track application status: pending, reviewed, rejected</li>
                <li>Get notified about new opportunities matching your skills</li>
                <li>Completely free for job seekers</li>
              </ul>
              {!isAuthenticated && (
                <button className="btn btn-primary" onClick={() => navigate('/register')}>
                  Create Free Account
                </button>
              )}
              {isSeeker && (
                <button className="btn btn-primary" onClick={() => navigate('/my-applications')}>
                  View My Applications
                </button>
              )}
            </div>
            <div className="visual">
              <div className="mockup-card">
                <h4>Recent Applications</h4>
                <div className="mock-item">
                  <span className="mock-title">Senior Developer</span>
                  <span className="mock-status status-reviewed">Reviewed</span>
                </div>
                <div className="mock-item">
                  <span className="mock-title">Product Manager</span>
                  <span className="mock-status status-pending">Pending</span>
                </div>
                <div className="mock-item">
                  <span className="mock-title">UX Designer</span>
                  <span className="mock-status status-reviewed">Reviewed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Employers Section */}
      <section className="for-employers">
        <div className="container">
          <div className="two-column reverse">
            <div className="visual">
              <div className="mockup-card">
                <h4>Dashboard Overview</h4>
                <div className="mock-stat">
                  <span className="mock-label">Active Jobs</span>
                  <span className="mock-value">12</span>
                </div>
                <div className="mock-stat">
                  <span className="mock-label">Total Applications</span>
                  <span className="mock-value">48</span>
                </div>
                <div className="mock-stat">
                  <span className="mock-label">New Today</span>
                  <span className="mock-value">5</span>
                </div>
              </div>
            </div>
            <div className="content">
              <h2>For Employers</h2>
              <p className="subtitle">Find the best talent for your team</p>
              <ul className="feature-list">
                <li>Post unlimited job listings to reach qualified candidates</li>
                <li>Review applications with resume and cover letter</li>
                <li>Manage candidates with status updates</li>
                <li>Access a pool of pre-screened professionals</li>
                <li>Streamlined hiring process saves time and money</li>
              </ul>
              {!isAuthenticated && (
                <button className="btn btn-secondary" onClick={() => navigate('/register')}>
                  Start Hiring Today
                </button>
              )}
              {isEmployer && (
                <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Create Account</h3>
              <p>Sign up as a job seeker or employer in less than a minute</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Complete Profile</h3>
              <p>Add your details, upload resume, or post your job listing</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Connect</h3>
              <p>Apply to jobs or review candidates - we'll handle the rest</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Succeed</h3>
              <p>Get hired or hire the perfect candidate for your team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section id="job-listings" className="job-listings-section">
        <div className="container">
          <h2 className="section-title">Latest Job Openings</h2>
          {jobs.length === 0 ? (
            <p className="empty-state">No jobs available at the moment. Check back later!</p>
          ) : (
            <div className="jobs-list">
              {jobs.slice(0, 6).map(job => (
                <div key={job._id} className="card job-card">
                  <h3>
                    <Link to={`/job/${job._id}`}>{job.title}</Link>
                  </h3>
                  <p>{job.company} – {job.location}</p>
                  {job.salary && <p className="salary">{job.salary}</p>}
                </div>
              ))}
            </div>
          )}
          {jobs.length > 6 && (
            <div className="view-all-jobs">
              <button className="btn btn-outline" onClick={handleFindJobClick}>
                View All {jobs.length} Jobs
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <div className="container">
          <h2>Ready to get started?</h2>
          <p>Whether you're looking for a job or hiring, we're here to help.</p>
          <div className="cta-buttons">
            {!isAuthenticated ? (
              <button className="btn btn-primary" onClick={() => navigate('/register')}>
                Sign Up Now
              </button>
            ) : (
              <>
                {isSeeker && (
                  <button className="btn btn-primary" onClick={() => navigate('/my-applications')}>
                    View My Applications
                  </button>
                )}
                {isEmployer && (
                  <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
                    Go to Dashboard
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
