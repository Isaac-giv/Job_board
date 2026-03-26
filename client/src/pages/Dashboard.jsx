import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import Loader from '../components/Loader';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/jobs/employer/me'),
      api.get('/applications/employer')
    ])
      .then(([jobsRes, appsRes]) => {
        setJobs(jobsRes.data);
        setApplications(appsRes.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const applicationsForJob = (jobId) => {
    return applications.filter(app => app.job._id === jobId);
  };

  const updateStatus = async (appId, newStatus) => {
    try {
      await api.put(`/applications/${appId}/status`, { status: newStatus });
      setApplications(applications.map(app => 
        app._id === appId ? { ...app, status: newStatus } : app
      ));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container">
      <h2>Employer Dashboard</h2>
      <Link to="/post-job"><button>Post New Job</button></Link>
      <div className="dashboard">
        <div className="job-list">
          <h3>Your Jobs</h3>
          {jobs.length === 0 ? (
            <p>You haven't posted any jobs yet. <Link to="/post-job">Post your first job</Link>.</p>
          ) : (
            jobs.map(job => (
              <div 
                key={job._id} 
                className={`job-list-item ${selectedJob === job._id ? 'selected' : ''}`}
                onClick={() => setSelectedJob(job._id)}
              >
                <h4>{job.title}</h4>
                <p>Applications: {applicationsForJob(job._id).length}</p>
              </div>
            ))
          )}
        </div>
        {selectedJob && (
          <div className="applications-panel">
            <h3>Applications for {jobs.find(j => j._id === selectedJob)?.title}</h3>
            {applicationsForJob(selectedJob).length === 0 ? (
              <p>No applications yet.</p>
            ) : (
              applicationsForJob(selectedJob).map(app => (
                <div key={app._id} className="application-card">
                  <p><strong>{app.seeker.name}</strong> ({app.seeker.email})</p>
                  <p>Cover: {app.coverLetter || 'None'}</p>
                  <p>Resume: <a href={`http://localhost:5000/${app.resume}`} target="_blank" rel="noreferrer">Download</a></p>
                  <p>Status: 
                    <select value={app.status} onChange={e => updateStatus(app._id, e.target.value)}>
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;