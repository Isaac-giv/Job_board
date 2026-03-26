import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, isAuthenticated, logout, isEmployer } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">JobBoard</Link>
      <div>
        <Link to="/">Home</Link>
        {isAuthenticated ? (
          <>
            {isEmployer ? (
              <Link to="/dashboard">Dashboard</Link>
            ) : (
              <Link to="/my-applications">My Applications</Link>
            )}
            <span className="user-greeting">Hello, {user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
