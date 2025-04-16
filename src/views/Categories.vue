<template>
  <main class="flex-grow container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
    <div class="animate-fade-in">
      <h1 class="text-3xl font-bold text-green-800 mb-6">Catégories de plantes</h1>

      <!-- Loading state -->
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm text-green-800 bg-green-100 rounded-md">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-green-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Chargement des catégories...
        </div>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">
              {{ error }}
            </p>
          </div>
        </div>
      </div>

      <!-- Categories Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="category in categories" :key="category.id"
          class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
          
          <img :src="category.image || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'"
            :alt="category.name" class="w-full h-48 object-cover" />
          
          <div class="p-4">
            <h3 class="font-bold text-lg text-gray-800">{{ category.name }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ category.description }}</p>
            <p class="text-sm text-gray-700 mt-2">{{ category.plant_count || 0 }} plantes</p>
            
            <div class="mt-4">
              <router-link :to="'/categories/' + category.slug"
                class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors">
                Voir les plantes
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Admin Actions -->
      <div v-if="isAdmin" class="mt-8 flex justify-center">
        <router-link to="/dashboard"
          class="inline-flex items-center px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 text-sm font-medium rounded-md transition-colors">
          Gérer les catégories
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
import CategoryService from '@/services/category.service'
import AuthService from '@/services/auth.service'

export default {
  name: 'Categories',
  data() {
    return {
      categories: [],
      isLoading: true,
      error: null,
      isAdmin: false
    }
  },
  async mounted() {
    this.isAdmin = AuthService.isAdmin();
    
    try {
      const response = await CategoryService.getAllCategories();
      this.categories = response.data;
    } catch (err) {
      this.error = err.response?.data?.message || 'Une erreur est survenue lors du chargement des catégories.';
    } finally {
      this.isLoading = false;
    }
  }
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