import { reactive } from 'vue'

class NotificationService {
  constructor() {
    this.state = reactive({
      notifications: [],
    })
    // Pour suivre les messages récemment affichés afin d'éviter les doublons
    this.recentMessages = new Set()
  }

  // Ajouter une nouvelle notification
  notify(message, type = 'info', duration = 5000) {
    // Vérifier si ce message existe déjà récemment (pour éviter les doublons)
    const messageKey = `${message}-${type}`
    if (this.recentMessages.has(messageKey)) {
      return -1 // Ne pas ajouter si déjà présent
    }

    const id = Date.now()

    // Ajouter la notification à la liste
    this.state.notifications.push({
      id,
      message,
      type, // 'success', 'error', 'info', 'warning'
      duration,
    })

    // Ajouter au set des messages récents
    this.recentMessages.add(messageKey)

    // Supprimer la notification après la durée spécifiée
    if (duration > 0) {
      setTimeout(() => {
        this.remove(id)
        // Supprimer du set après un délai supplémentaire pour éviter les notifications en rafale
        setTimeout(() => {
          this.recentMessages.delete(messageKey)
        }, 500)
      }, duration)
    }

    return id
  }

  // Raccourcis pour les différents types de notifications
  success(message, duration = 5000) {
    return this.notify(message, 'success', duration)
  }

  error(message, duration = 5000) {
    return this.notify(message, 'error', duration)
  }

  info(message, duration = 5000) {
    return this.notify(message, 'info', duration)
  }

  warning(message, duration = 5000) {
    return this.notify(message, 'warning', duration)
  }

  // Supprimer une notification par son ID
  remove(id) {
    const index = this.state.notifications.findIndex((n) => n.id === id)
    if (index !== -1) {
      this.state.notifications.splice(index, 1)
    }
  }

  // Supprimer toutes les notifications
  clear() {
    this.state.notifications = []
    this.recentMessages.clear()
  }
}

export default new NotificationService()
