import axios from 'axios'

const API_URL = 'http://localhost:3000/api/auth/'

class AuthService {
  async login(email, password) {
    const response = await axios.post(API_URL + 'login', { email, password })
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
    }
    return response.data
  }

  async register(fullName, email, password) {
    const response = await axios.post(API_URL + 'register', {
      fullName,
      email,
      password
    })
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
    }
    return response.data
  }

  async resetPassword(email) {
    return axios.post(API_URL + 'reset-password', { email })
  }

  logout() {
    localStorage.removeItem('token')
  }

  getCurrentUser() {
    return localStorage.getItem('token')
  }
}

export default new AuthService()