import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import Loader from '../components/Loader';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [applying, setApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, isSeeker } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      api.get(`/jobs/${id}`).then(res => setJob(res.data)),
      isAuthenticated && isSeeker
        ? api.get('/applications/seeker').then(res => {
            const applied = res.data.some(app => app.job._id === id);
            setHasApplied(applied);
          })
        : Promise.resolve()
    ]).finally(() => setLoading(false));
  }, [id, isAuthenticated, isSeeker]);

  const handleApply = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('resume', resume);
    if (coverLetter) formData.append('coverLetter', coverLetter);

    try {
      await api.post(`/applications/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setHasApplied(true);
      setApplying(false);
    } catch (err) {
      alert(err.response?.data?.msg || 'Application failed');
    }
  };

  if (loading) return <Loader />;
  if (!job) return <div className="container">Job not found</div>;

  return (
    <div className="container">
      <div className="job-detail">
        <h1>{job.title}</h1>
        <div className="job-meta">
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Location:</strong> {job.location}</p>
          {job.salary && <p><strong>Salary:</strong> {job.salary}</p>}
        </div>
        <div>
          <h3>Description</h3>
          <p>{job.description}</p>
        </div>
        {job.requirements && (
          <div>
            <h3>Requirements</h3>
            <p>{job.requirements}</p>
          </div>
        )}

        <div className="apply-section">
          {isAuthenticated && isSeeker && !hasApplied && !applying && (
            <button onClick={() => setApplying(true)}>Apply for this job</button>
          )}
          {isAuthenticated && isSeeker && hasApplied && (
            <p>You have already applied to this job.</p>
          )}
          {!isAuthenticated && (
            <button onClick={() => navigate('/login')}>Login to apply</button>
          )}
        </div>

        {applying && (
          <form onSubmit={handleApply} encType="multipart/form-data" style={{ marginTop: '1rem' }}>
            <div className="form-group">
              <label>Resume (PDF/DOC/DOCX, max 5MB)</label>
              <input 
                type="file" 
                accept=".pdf,.doc,.docx" 
                onChange={e => setResume(e.target.files[0])} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Cover Letter (optional)</label>
              <textarea 
                value={coverLetter} 
                onChange={e => setCoverLetter(e.target.value)} 
                rows="4"
              />
            </div>
            <button type="submit">Submit Application</button>
            <button type="button" className="btn-secondary" onClick={() => setApplying(false)} style={{ marginLeft: '0.5rem' }}>Cancel</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default JobDetail;