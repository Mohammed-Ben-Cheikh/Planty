<template>
  <main class="flex-grow container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
    <div class="animate-fade-in">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 class="text-3xl font-bold text-green-800">Nos plantes</h1>

        <div class="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            v-model="searchTerm"
            placeholder="Rechercher..."
            class="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <select
            v-model="filterCategory"
            class="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Toutes les catégories</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
          <select
            v-model="sortOption"
            class="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="popularity">Trier par: Popularité</option>
            <option value="priceAsc">Prix: Croissant</option>
            <option value="priceDesc">Prix: Décroissant</option>
            <option value="newest">Nouveautés</option>
          </select>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <div
          class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm text-green-800 bg-green-100 rounded-md"
        >
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-green-800"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Chargement des plantes...
        </div>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">
              {{ error }}
            </p>
          </div>
        </div>
      </div>

      <!-- Plant stats -->
      <div v-else class="mb-6">
        <p class="text-gray-600 text-sm">{{ filteredPlants.length }} plantes trouvées</p>
      </div>

      <!-- Plants Grid -->
      <div
        v-if="!isLoading && !error && filteredPlants.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10"
      >
        <div
          v-for="plant in paginatedPlants"
          :key="plant.id"
          class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <div class="relative">
            <img
              :src="plant.image"
              :alt="plant.name"
              class="w-full h-48 object-cover rounded-t-xl"
            />
            <span
              class="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg text-sm font-medium text-green-800"
            >
              {{ plant.price }}€
            </span>
            <span
              v-if="plant.sale"
              class="absolute top-3 left-3 bg-red-500 px-2 py-1 rounded-lg text-sm font-medium text-white"
            >
              -{{ plant.sale_percent }}%
            </span>
          </div>
          <div class="p-4">
            <h3 class="font-medium text-lg text-gray-800">{{ plant.name }}</h3>
            <p class="text-sm text-gray-500">{{ plant.species }}</p>
            <div class="flex items-center mt-2">
              <div class="flex-grow">
                <div class="flex items-center space-x-1 text-xs text-gray-500">
                  <span
                    class="w-2 h-2 rounded-full"
                    :class="{ 'bg-green-500': plant.in_stock, 'bg-red-500': !plant.in_stock }"
                  ></span>
                  <span>{{ plant.in_stock ? 'En stock' : 'Épuisé' }}</span>
                </div>
              </div>
              <div class="flex space-x-2">
                <router-link
                  :to="`/plants/${plant.slug}`"
                  class="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </router-link>
                <button
                  @click="addToCart(plant)"
                  class="bg-green-100 text-green-700 p-2 rounded-lg hover:bg-green-200 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No plants message -->
      <div
        v-else-if="!isLoading && !error && filteredPlants.length === 0"
        class="bg-gray-50 p-6 text-center rounded-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 mx-auto text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <p class="mt-4 text-gray-600">Aucune plante trouvée correspondant à votre recherche.</p>
      </div>

      <!-- Pagination controls -->
      <div v-if="totalPages > 1" class="mt-6 flex justify-center">
        <div class="flex space-x-1">
          <button
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1 text-sm rounded-md"
            :class="
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            "
          >
            Précédent
          </button>

          <template v-for="pageNum in totalPages" :key="pageNum">
            <button
              @click="currentPage = pageNum"
              class="px-3 py-1 text-sm rounded-md"
              :class="
                pageNum === currentPage
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              "
            >
              {{ pageNum }}
            </button>
          </template>

          <button
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 text-sm rounded-md"
            :class="
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            "
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import PlantService from '@/services/plant.service'
import CategoryService from '@/services/category.service'
import notificationService from '@/services/notification/notification.service'

export default {
  name: 'Plants',
  data() {
    return {
      plants: [],
      categories: [],
      isLoading: true,
      error: null,
      searchTerm: '',
      filterCategory: '',
      sortOption: 'popularity',
      currentPage: 1,
      itemsPerPage: 12,
    }
  },
  computed: {
    filteredPlants() {
      let result = [...this.plants]

      // Filtre par recherche
      if (this.searchTerm) {
        const searchLower = this.searchTerm.toLowerCase()
        result = result.filter(
          (plant) =>
            plant.name?.toLowerCase().includes(searchLower) ||
            plant.species?.toLowerCase().includes(searchLower) ||
            plant.description?.toLowerCase().includes(searchLower),
        )
      }

      // Filtre par catégorie
      if (this.filterCategory) {
        result = result.filter(
          (plant) =>
            plant.category_id === this.filterCategory || plant.category?.id === this.filterCategory,
        )
      }

      // Tri
      switch (this.sortOption) {
        case 'priceAsc':
          result.sort(
            (a, b) => parseFloat(a.price.replace(',', '.')) - parseFloat(b.price.replace(',', '.')),
          )
          break
        case 'priceDesc':
          result.sort(
            (a, b) => parseFloat(b.price.replace(',', '.')) - parseFloat(a.price.replace(',', '.')),
          )
          break
        case 'newest':
          result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          break
        case 'popularity':
        default:
          result.sort((a, b) => b.sold - a.sold)
          break
      }

      return result
    },
    paginatedPlants() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      return this.filteredPlants.slice(startIndex, startIndex + this.itemsPerPage)
    },
    totalPages() {
      return Math.ceil(this.filteredPlants.length / this.itemsPerPage)
    },
  },
  watch: {
    searchTerm() {
      this.currentPage = 1
    },
    filterCategory() {
      this.currentPage = 1
    },
    sortOption() {
      this.currentPage = 1
    },
  },
  async mounted() {
    try {
      // Chargement parallèle des plantes et catégories
      const [plantsResponse, categoriesResponse] = await Promise.all([
        PlantService.getAllPlants(),
        CategoryService.getAllCategories(),
      ])

      this.plants = plantsResponse.data
      this.categories = categoriesResponse.data
    } catch (err) {
      this.error =
        err.response?.data?.message || 'Une erreur est survenue lors du chargement des données.'
    } finally {
      this.isLoading = false
    }
  },
  methods: {
    addToCart(plant) {
      // Logique d'ajout au panier (à implémenter)
      notificationService.success(`${plant.name} a été ajouté à votre panier`)
    },
  },
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
</style>
