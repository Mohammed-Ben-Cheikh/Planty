<template>
  <main class="flex-grow container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
    <div class="plant-store">
      <!-- Hero Banner -->
      <div class="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white mb-8 shadow-lg">
        <div class="flex justify-between items-center">
          <div class="max-w-2xl">
            <h1 class="text-3xl md:text-4xl font-bold">Découvrez notre collection de plantes 🌿</h1>
            <p class="mt-2 text-green-100">Des plantes d'intérieur magnifiques, livrées directement à votre porte avec
              des
              conseils d'entretien personnalisés.</p>
            <div class="mt-6 flex flex-wrap gap-3">
              <button
                class="bg-white text-green-700 font-medium px-6 py-3 rounded-lg hover:bg-green-50 transition-colors duration-300">
                Voir la collection
              </button>
              <button
                class="bg-green-700 text-white border border-green-100 font-medium px-6 py-3 rounded-lg hover:bg-green-800 transition-colors duration-300">
                Conseils d'entretien
              </button>
            </div>
          </div>
          <img src="" alt="Plantes d'intérieur" class="h-48 w-48 hidden lg:block" />
        </div>
      </div>

      <!-- Categories -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Catégories</h2>
        <div class="flex space-x-4 overflow-x-auto pb-2">
          <button v-for="(category, index) in categories" :key="index"
            class="bg-white shadow-md px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition-all whitespace-nowrap"
            :class="{ 'text-green-700 border-b-2 border-green-600': category.active }">
            {{ category.name }}
          </button>
        </div>
      </div>

      <!-- Featured Plants -->
      <div class="mb-10">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-gray-800">Plantes populaires</h2>
          <button class="text-green-600 hover:text-green-700 text-sm font-medium flex items-center">
            Voir tout
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(plant, index) in featuredPlants" :key="index"
            class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
            <div class="relative">
              <img :src="plant.image" :alt="plant.name" class="w-full h-48 object-cover rounded-t-xl" />
              <span class="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg text-sm font-medium text-green-800">
                {{ plant.price }}€
              </span>
            </div>
            <div class="p-4">
              <h3 class="font-medium text-lg text-gray-800">{{ plant.name }}</h3>
              <p class="text-sm text-gray-500">{{ plant.species }}</p>
              <div class="flex items-center mt-2">
                <div class="flex-grow">
                  <div class="flex items-center">
                    <span v-for="i in 5" :key="i" class="text-amber-400">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div class="flex items-center space-x-1 text-xs text-gray-500">
                  <span class="w-2 h-2 rounded-full"
                    :class="{ 'bg-green-500': plant.inStock, 'bg-red-500': !plant.inStock }"></span>
                  <span>{{ plant.inStock ? 'En stock' : 'Épuisé' }}</span>
                </div>
              </div>
              <div class="mt-4 flex justify-between items-center">
                <span class="text-sm">
                  <span class="font-medium">Difficulté:</span>
                  <span>{{ plant.difficulty }}</span>
                </span>
                <button class="bg-green-100 text-green-700 p-2 rounded-lg hover:bg-green-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add PlantCart here -->
      <PlantCart :plants="featuredPlants" @add-to-cart="handleAddToCart" />

      <!-- Product Listing with Filters -->
      <div>
        <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 class="text-xl font-semibold text-gray-800">Toutes nos plantes</h2>

          <div class="flex flex-col sm:flex-row gap-3">
            <input type="text" placeholder="Rechercher..."
              class="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            <select
              class="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>Trier par: Popularité</option>
              <option>Prix: Croissant</option>
              <option>Prix: Décroissant</option>
              <option>Nouveautés</option>
            </select>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
          <div v-for="(plant, index) in allPlants" :key="index"
            class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
            <div class="relative">
              <img :src="plant.image" :alt="plant.name" class="w-full h-48 object-cover rounded-t-xl" />
              <span class="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg text-sm font-medium text-green-800">
                {{ plant.price }}€
              </span>
              <span v-if="plant.sale"
                class="absolute top-3 left-3 bg-red-500 px-2 py-1 rounded-lg text-sm font-medium text-white">
                -{{ plant.salePercent }}%
              </span>
            </div>
            <div class="p-4">
              <h3 class="font-medium text-lg text-gray-800">{{ plant.name }}</h3>
              <p class="text-sm text-gray-500">{{ plant.species }}</p>
              <div class="flex items-center mt-2">
                <div class="flex-grow">
                  <div class="flex items-center">
                    <span v-for="i in 5" :key="i" class="text-amber-400">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div class="flex items-center space-x-1 text-xs text-gray-500">
                  <span class="w-2 h-2 rounded-full"
                    :class="{ 'bg-green-500': plant.inStock, 'bg-red-500': !plant.inStock }"></span>
                  <span>{{ plant.inStock ? 'En stock' : 'Épuisé' }}</span>
                </div>
              </div>
              <div class="mt-4 flex justify-between items-center">
                <span class="text-sm">
                  <span class="font-medium">Taille:</span> {{ plant.size }}
                </span>
                <button class="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors">
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center my-8">
          <button
            class="bg-white border border-gray-300 rounded-lg px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Charger plus de plantes
          </button>
        </div>
      </div>

      <!-- Newsletter -->
      <div class="bg-gradient-to-r from-green-100 to-green-50 rounded-2xl p-8 mb-12">
        <div class="text-center max-w-2xl mx-auto">
          <h2 class="text-2xl font-bold text-green-800 mb-3">Restez informé</h2>
          <p class="text-green-700 mb-6">Inscrivez-vous à notre newsletter pour recevoir des conseils d'entretien et des
            offres exclusives.</p>
          <div class="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input type="email" placeholder="Votre email"
              class="flex-grow px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500" />
            <button
              class="bg-green-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>

</template>

<script>
import PlantCart from '@/components/PlantCart.vue';
export default {
  name: 'PlantStore',
  components: {
    PlantCart
  },
  data() {
    return {
      categories: [
        { name: 'Toutes les plantes', active: true },
        { name: 'Plantes d\'intérieur', active: true },
        { name: 'Plantes faciles', active: false },
        { name: 'Cactus & Succulentes', active: false },
        { name: 'Plantes purifiantes', active: false },
        { name: 'Feuillage coloré', active: false },
        { name: 'Grandes plantes', active: false }
      ],
      featuredPlants: [
        {
          name: 'Monstera Deliciosa',
          species: 'Monstera',
          image: 'https://images.unsplash.com/photo-1614594075952-b01e3e733000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          price: '29,99',
          difficulty: 'Facile',
          inStock: true
        },
        {
          name: 'Ficus Lyrata',
          species: 'Ficus',
          image: 'https://images.unsplash.com/photo-1597055181449-b9efc7a9afed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          price: '49,99',
          difficulty: 'Modérée',
          inStock: true
        },
        {
          name: 'Calathea Orbifolia',
          species: 'Calathea',
          image: 'https://images.unsplash.com/photo-1602923668104-8d8f1b1df1c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          price: '34,99',
          difficulty: 'Exigeante',
          inStock: false
        },
        {
          name: 'Aloe Vera',
          species: 'Aloe',
          image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          price: '14,99',
          difficulty: 'Facile',
          inStock: true
        }
      ],
      allPlants: [
        {
          name: 'Monstera Deliciosa',
          species: 'Monstera',
          image: 'https://images.unsplash.com/photo-1614594075952-b01e3e733000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          price: '29,99',
          size: 'M',
          inStock: true,
          sale: false
        },
        {
          name: 'Ficus Lyrata',
          species: 'Ficus',
          image: 'https://images.unsplash.com/photo-1597055181449-b9efc7a9afed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          price: '49,99',
          size: 'L',
          inStock: true,
          sale: false
        },
        {
          name: 'Calathea Orbifolia',
          species: 'Calathea',
          image: 'https://images.unsplash.com/photo-1602923668104-8d8f1b1df1c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          price: '34,99',
          size: 'M',
          inStock: false,
          sale: false
        },
        {
          name: 'Aloe Vera',
          species: 'Aloe',
          image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          price: '14,99',
          size: 'S',
          inStock: true,
          sale: true,
          salePercent: 15
        },
        {
          name: 'Pothos Doré',
          species: 'Epipremnum aureum',
          image: 'https://images.unsplash.com/photo-1613737693016-7a41c3f79cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          price: '19,99',
          size: 'M',
          inStock: true,
          sale: false
        },
        {
          name: 'Cactus Boule',
          species: 'Echinocactus',
          image: 'https://images.unsplash.com/photo-1551888419-7b7a520fe0ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          price: '12,99',
          size: 'S',
          inStock: true,
          sale: false
        },
        {
          name: 'Sanseveria',
          species: 'Dracaena trifasciata',
          image: 'https://images.unsplash.com/photo-1593482892290-f54c7f8b7048?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          price: '24,99',
          size: 'M',
          inStock: true,
          sale: false
        },
        {
          name: 'Pilea Peperomioides',
          species: 'Pilea',
          image: 'https://images.unsplash.com/photo-1614594976461-f29a2d4d7344?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          price: '16,99',
          size: 'S',
          inStock: true,
          sale: true,
          salePercent: 38
        }
      ]
    }
  },
  mounted() {
    document.title = 'Boutique de plantes | Planty';
  },
  methods: {
    handleAddToCart(plant) {
      // Ici vous pouvez ajouter la logique pour gérer l'ajout au panier
      console.log('Ajout au panier:', plant);
    }
  }
}
</script>

<style scoped>
.plant-store {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>