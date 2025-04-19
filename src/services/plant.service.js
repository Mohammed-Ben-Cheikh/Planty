import http from './http.config'

class PlantService {
  // Récupérer toutes les plantes
  async getAllPlants() {
    return http.get('plants')
  }

  // Récupérer une plante par son slug
  async getPlantBySlug(slug) {
    return http.get(`plants/${slug}`)
  }

  // Créer une nouvelle plante (pour administrateurs)
  async createPlant(plantData) {
    // Si les données contiennent un fichier image, on utilise FormData
    if (plantData.image instanceof File) {
      const formData = new FormData()
      Object.keys(plantData).forEach((key) => {
        formData.append(key, plantData[key])
      })
      return http.post('plants', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    }
    return http.post('plants', plantData)
  }

  // Mettre à jour une plante (pour administrateurs)
  async updatePlant(slug, plantData) {
    // Si les données contiennent un fichier image, on utilise FormData
    if (plantData.image instanceof File) {
      const formData = new FormData()
      Object.keys(plantData).forEach((key) => {
        formData.append(key, plantData[key])
      })
      return http.put(`plants/${slug}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    }
    return http.put(`plants/${slug}`, plantData)
  }

  // Supprimer une plante (pour administrateurs)
  async deletePlant(slug) {
    return http.delete(`plants/${slug}`)
  }
}

export default new PlantService()
