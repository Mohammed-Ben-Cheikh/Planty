<template>
    <main class="flex-grow container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
        <div class="animate-fade-in">
            <!-- Loading state -->
            <div v-if="isLoading" class="flex justify-center items-center py-20">
                <div
                    class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm text-green-800 bg-green-100 rounded-md">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-green-800" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    Chargement de la catégorie...
                </div>
            </div>

            <!-- Error state -->
            <div v-else-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm text-red-700">
                            {{ error }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Category Content -->
            <div v-else>
                <!-- Category header with banner image -->
                <div class="relative mb-6">
                    <img :src="category.image || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80'"
                        :alt="category.name" class="w-full h-64 object-cover rounded-xl" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>
                    <div class="absolute bottom-0 left-0 p-6">
                        <h1 class="text-3xl font-bold text-white mb-2">{{ category.name }}</h1>
                        <p class="text-green-100">{{ category.description }}</p>
                    </div>
                </div>

                <!-- Plants filters and sort -->
                <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
                    <h2 class="text-xl font-semibold text-gray-800">{{ plantsCount }} plantes dans cette catégorie</h2>

                    <div class="flex flex-col sm:flex-row gap-3">
                        <input type="text" v-model="searchTerm" placeholder="Rechercher..."
                            class="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                        <select v-model="sortOption"
                            class="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                            <option value="popularity">Trier par: Popularité</option>
                            <option value="priceAsc">Prix: Croissant</option>
                            <option value="priceDesc">Prix: Décroissant</option>
                            <option value="newest">Nouveautés</option>
                        </select>
                    </div>
                </div>

                <!-- Plants Grid -->
                <div v-if="filteredPlants.length > 0"
                    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                    <div v-for="plant in filteredPlants" :key="plant.id"
                        class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                        <div class="relative">
                            <img :src="plant.image" :alt="plant.name" class="w-full h-48 object-cover rounded-t-xl" />
                            <span
                                class="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg text-sm font-medium text-green-800">
                                {{ plant.price }}€
                            </span>
                            <span v-if="plant.sale"
                                class="absolute top-3 left-3 bg-red-500 px-2 py-1 rounded-lg text-sm font-medium text-white">
                                -{{ plant.sale_percent }}%
                            </span>
                        </div>
                        <div class="p-4">
                            <h3 class="font-medium text-lg text-gray-800">{{ plant.name }}</h3>
                            <p class="text-sm text-gray-500">{{ plant.species }}</p>
                            <div class="flex items-center mt-2">
                                <div class="flex-grow">
                                    <div class="flex items-center space-x-1 text-xs text-gray-500">
                                        <span class="w-2 h-2 rounded-full"
                                            :class="{ 'bg-green-500': plant.in_stock, 'bg-red-500': !plant.in_stock }"></span>
                                        <span>{{ plant.in_stock ? 'En stock' : 'Épuisé' }}</span>
                                    </div>
                                </div>
                                <router-link :to="`/plants/${plant.slug}`"
                                    class="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- No plants message -->
                <div v-else class="bg-gray-50 p-6 text-center rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <p class="mt-4 text-gray-600">Aucune plante trouvée dans cette catégorie.</p>
                </div>

                <!-- Pagination controls -->
                <div v-if="plantsCount > 12" class="mt-6 flex justify-center">
                    <div class="flex space-x-1">
                        <button @click="currentPage = Math.max(1, currentPage - 1)" :disabled="currentPage === 1"
                            class="px-3 py-1 text-sm rounded-md"
                            :class="currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'">
                            Précédent
                        </button>

                        <template v-for="pageNum in totalPages" :key="pageNum">
                            <button @click="currentPage = pageNum" class="px-3 py-1 text-sm rounded-md"
                                :class="pageNum === currentPage ? 'bg-green-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'">
                                {{ pageNum }}
                            </button>
                        </template>

                        <button @click="currentPage = Math.min(totalPages, currentPage + 1)"
                            :disabled="currentPage === totalPages" class="px-3 py-1 text-sm rounded-md"
                            :class="currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'">
                            Suivant
                        </button>
                    </div>
                </div>

                <!-- Back button -->
                <div class="mt-8">
                    <router-link to="/categories"
                        class="inline-flex items-center text-sm text-green-600 hover:text-green-800">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                        Retour aux catégories
                    </router-link>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import CategoryService from '@/services/category.service'
import PlantService from '@/services/plant.service'

export default {
    name: 'CategoryDetail',
    data() {
        return {
            category: {},
            plants: [],
            isLoading: true,
            error: null,
            searchTerm: '',
            sortOption: 'popularity',
            currentPage: 1,
            itemsPerPage: 12
        }
    },
    computed: {
        plantsCount() {
            return this.plants.length;
        },
        filteredPlants() {
            let filtered = [...this.plants];

            // Recherche
            if (this.searchTerm) {
                const searchLower = this.searchTerm.toLowerCase();
                filtered = filtered.filter(plant =>
                    plant.name.toLowerCase().includes(searchLower) ||
                    plant.species.toLowerCase().includes(searchLower) ||
                    plant.description?.toLowerCase().includes(searchLower)
                );
            }

            // Tri
            switch (this.sortOption) {
                case 'priceAsc':
                    filtered.sort((a, b) => parseFloat(a.price.replace(',', '.')) - parseFloat(b.price.replace(',', '.')));
                    break;
                case 'priceDesc':
                    filtered.sort((a, b) => parseFloat(b.price.replace(',', '.')) - parseFloat(a.price.replace(',', '.')));
                    break;
                case 'newest':
                    filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    break;
                case 'popularity':
                default:
                    filtered.sort((a, b) => b.sold - a.sold);
                    break;
            }

            // Pagination
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            return filtered.slice(startIndex, startIndex + this.itemsPerPage);
        },
        totalPages() {
            return Math.ceil(this.plants.length / this.itemsPerPage);
        }
    },
    watch: {
        searchTerm() {
            this.currentPage = 1;
        },
        sortOption() {
            this.currentPage = 1;
        }
    },
    async mounted() {
        const slug = this.$route.params.slug;

        try {
            const [categoryResponse, plantsResponse] = await Promise.all([
                CategoryService.getCategoryBySlug(slug),
                PlantService.getAllPlants() // Idéalement, nous aurions une API pour obtenir les plantes par catégorie
            ]);

            this.category = categoryResponse.data;

            // Filtre les plantes par catégorie (à adapter selon votre API)
            // Normalement, l'API devrait retourner directement les plantes de la catégorie
            this.plants = plantsResponse.data.filter(plant =>
                plant.category_id === this.category.id ||
                plant.category === this.category.name
            );

        } catch (err) {
            this.error = err.response?.data?.message || 'Une erreur est survenue lors du chargement des données.';
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