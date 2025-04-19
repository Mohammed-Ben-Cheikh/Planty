import http from './http.config'

class CategoryService {
  // Récupérer toutes les catégories
  async getAllCategories() {
    return http.get('categories')
  }

  // Récupérer une catégorie par son slug
  async getCategoryBySlug(slug) {
    return http.get(`categories/${slug}`)
  }

  // Créer une nouvelle catégorie (pour administrateurs)
  async createCategory(categoryData) {
    return http.post('categories', categoryData)
  }

  // Mettre à jour une catégorie (pour administrateurs)
  async updateCategory(slug, categoryData) {
    return http.put(`categories/${slug}`, categoryData)
  }

  // Supprimer une catégorie (pour administrateurs)
  async deleteCategory(slug) {
    return http.delete(`categories/${slug}`)
  }
}

export default new CategoryService()
