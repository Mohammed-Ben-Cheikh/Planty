import http from './http.config'

class OrderService {
  // Récupérer toutes les réservations (pour les employés)
  async getAllOrders() {
    return http.get('reservations')
  }

  // Récupérer les réservations d'un utilisateur spécifique
  async getUserOrders(userId) {
    return http.get(`reservations/users/${userId}`)
  }

  // Récupérer les réservations par statut (pour les employés)
  async getOrdersByStatus(status) {
    return http.get(`reservations/status/${status}`)
  }

  // Récupérer une réservation par son slug
  async getOrderBySlug(slug) {
    return http.get(`reservations/${slug}`)
  }

  // Créer une nouvelle réservation (pour les clients)
  async createOrder(orderData) {
    return http.post('reservations', orderData)
  }

  // Mettre à jour une réservation
  async updateOrder(slug, orderData) {
    return http.put(`reservations/${slug}`, orderData)
  }

  // Mettre à jour le statut d'une commande (pour les employés)
  async updateOrderStatus(slug, status) {
    return http.put(`reservations/${slug}`, { status })
  }

  // Supprimer une réservation
  async deleteOrder(slug) {
    return http.delete(`reservations/${slug}`)
  }
}

export default new OrderService()
