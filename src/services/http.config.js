import axios from 'axios'
import notificationService from './notification/notification.service'

// Création d'une instance Axios avec une configuration de base
const http = axios.create({
  baseURL: 'http://plant.test/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Intercepteur pour les requêtes
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    notificationService.error('Erreur de requête')
    return Promise.reject(error)
  },
)

// Intercepteur pour les réponses
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      // Gestion des erreurs selon le code HTTP
      switch (error.response.status) {
        case 401:
          // Token expiré ou invalide
          localStorage.removeItem('token')
          notificationService.error('Votre session a expiré. Veuillez vous reconnecter.')
          window.location.href = '/login'
          break
        case 403:
          notificationService.error('Accès refusé')
          break
        case 404:
          notificationService.error("La ressource demandée n'existe pas")
          break
        case 422:
          // Validation errors
          if (error.response.data && error.response.data.errors) {
            const errorMessages = Object.values(error.response.data.errors).flat().join(', ')
            notificationService.error(errorMessages)
          } else if (error.response.data && error.response.data.message) {
            notificationService.error(error.response.data.message)
          } else {
            notificationService.error('Erreur de validation des données')
          }
          break
        case 500:
          notificationService.error('Erreur serveur. Veuillez réessayer ultérieurement.')
          break
        default:
          notificationService.error('Une erreur est survenue')
      }
    } else if (error.request) {
      // La requête a été envoyée mais pas de réponse
      notificationService.error(
        'Pas de réponse du serveur. Veuillez vérifier votre connexion internet.',
      )
    } else {
      // Autres erreurs
      notificationService.error('Erreur lors de la requête')
    }

    return Promise.reject(error)
  },
)

export default http
