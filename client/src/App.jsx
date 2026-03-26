import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import JobDetail from './pages/JobDetail'
import PostJob from './pages/PostJob'
import Dashboard from './pages/Dashboard'
import MyApplications from './pages/MyApplications'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/post-job" element={
            <PrivateRoute roles={['employer']}>
              <PostJob />
            </PrivateRoute>
          } />
          <Route path="/dashboard" element={
            <PrivateRoute roles={['employer']}>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/my-applications" element={
            <PrivateRoute roles={['seeker']}>
              <MyApplications />
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App