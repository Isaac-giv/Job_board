import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api'
});

// Add token to every request if available
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['x-auth-token'] = token
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default instance