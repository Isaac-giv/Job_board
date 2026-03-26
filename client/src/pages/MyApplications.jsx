import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import Loader from '../components/Loader';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/applications/seeker')
      .then(res => setApplications(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container">
      <h2>My Applications</h2>
      {applications.length === 0 ? (
        <p>You haven't applied to any jobs yet. <Link to="/">Browse jobs</Link>.</p>
      ) : (
        <div className="applications-grid">
          {applications.map(app => (
            <div key={app._id} className="card">
              <h3>{app.job.title}</h3>
              <p><strong>{app.job.company}</strong> – {app.job.location}</p>
              <p>Status: <span className={`status-${app.status}`}>{app.status}</span></p>
              <p>Applied: {new Date(app.createdAt).toLocaleDateString()}</p>
              {app.coverLetter && <p><strong>Cover:</strong> {app.coverLetter}</p>}
              <p><a href={`http://localhost:5000/${app.resume}`} target="_blank" rel="noreferrer">View Resume</a></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;