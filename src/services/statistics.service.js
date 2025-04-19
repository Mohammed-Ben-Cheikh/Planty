import http from './http.config'

class StatisticsService {
  // Récupérer toutes les statistiques
  async getStatistics() {
    return http.get('statistics')
  }
}

export default new StatisticsService()
