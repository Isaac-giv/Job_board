import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

const PostJob = () => {
  const [form, setForm] = useState({
    title: '', company: '', location: '', description: '', requirements: '', salary: ''
  })
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/jobs', form)
      navigate('/dashboard')
    } catch (err) {
      alert(err.response?.data?.msg || 'Failed to post job')
    }
  }

  return (
    <div className="container">
      <div className="form-container">
        <h2>Post a Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Company</label>
            <input name="company" value={form.company} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input name="location" value={form.location} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="4" required />
          </div>
          <div className="form-group">
            <label>Requirements (optional)</label>
            <textarea name="requirements" value={form.requirements} onChange={handleChange} rows="3" />
          </div>
          <div className="form-group">
            <label>Salary (optional)</label>
            <input name="salary" value={form.salary} onChange={handleChange} />
          </div>
          <button type="submit">Post Job</button>
        </form>
      </div>
    </div>
  )
}

export default PostJob