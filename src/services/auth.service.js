import http from './http.config'
import notificationService from './notification/notification.service'

const API_URL = '' // Base URL is already set in http.config.js

class AuthService {
  async login(email, password) {
    try {
      const response = await http.post(API_URL + 'login', { email, password })
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        notificationService.success('Connexion réussie!')
      }
      return response.data
    } catch (error) {
      // Ne pas afficher de notification ici, l'intercepteur HTTP s'en charge déjà
      throw error
    }
  }

  async register(fullName, email, password, passwordConfirmation) {
    try {
      const response = await http.post(API_URL + 'register', {
        name: fullName,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        notificationService.success(
          'Inscription réussie! Veuillez vérifier votre email pour activer votre compte.',
        )
      }
      return response.data
    } catch (error) {
      // Ne pas afficher de notification ici, l'intercepteur HTTP s'en charge déjà
      throw error
    }
  }

  async activateAccount(token) {
    try {
      const response = await http.get(`${API_URL}account/activate?token=${token}`)
      notificationService.success('Votre compte a été activé avec succès!')
      return response.data
    } catch (error) {
      throw error
    }
  }

  async sendResetLink(email) {
    try {
      const response = await http.post(API_URL + 'password-reset', { email })
      notificationService.success('Instructions de réinitialisation envoyées par email')
      return response.data
    } catch (error) {
      throw error
    }
  }

  async confirmResetPassword(token, password, passwordConfirmation) {
    try {
      const response = await http.post(API_URL + 'password-reset/confirm', {
        token,
        password,
        password_confirmation: passwordConfirmation,
      })
      notificationService.success('Votre mot de passe a été réinitialisé avec succès')
      return response.data
    } catch (error) {
      throw error
    }
  }

  async logout() {
    try {
      await http.post(API_URL + 'logout')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      notificationService.info('Vous êtes déconnecté')
    } catch (error) {
      // En cas d'échec, on déconnecte quand même localement
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      throw error
    }
  }

  getCurrentUser() {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }

  isAuthenticated() {
    return !!localStorage.getItem('token')
  }

  hasRole(role) {
    const user = this.getCurrentUser()
    return user && user.role === role
  }

  isAdmin() {
    return this.hasRole('admin')
  }

  isEmployee() {
    return this.hasRole('employee')
  }

  isClient() {
    return this.hasRole('client')
  }
}

export default new AuthService()
