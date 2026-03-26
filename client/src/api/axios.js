import axios from 'axios'

const instance = axios.create({
  baseURL: '/api' // because of proxy
})

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