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
                    Chargement de la plante...
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

            <!-- Plant Content -->
            <div v-else class="bg-white shadow-lg rounded-2xl overflow-hidden">
                <div class="flex flex-col lg:flex-row">
                    <!-- Plant images gallery -->
                    <div class="lg:w-1/2">
                        <div class="relative bg-gray-100 h-96">
                            <img :src="plant.image || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80'"
                                :alt="plant.name" class="w-full h-full object-cover" />

                            <div v-if="plant.sale"
                                class="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold rounded-full py-2 px-4">
                                -{{ plant.sale_percent }}%
                            </div>
                        </div>

                        <!-- Thumbnail images -->
                        <div v-if="plant.gallery && plant.gallery.length > 0"
                            class="flex overflow-x-auto p-2 space-x-2 bg-gray-50">
                            <div v-for="(image, index) in plant.gallery" :key="index"
                                class="w-20 h-20 flex-shrink-0 cursor-pointer border-2 hover:border-green-600 rounded-md overflow-hidden"
                                @click="selectedImage = image">
                                <img :src="image" class="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    <!-- Plant details -->
                    <div class="lg:w-1/2 p-6 lg:p-8">
                        <div class="flex flex-col h-full">
                            <!-- Category breadcrumbs -->
                            <div class="text-sm text-green-600 mb-2">
                                <router-link to="/categories" class="hover:underline">Catégories</router-link>
                                <span class="mx-2">/</span>
                                <router-link :to="`/categories/${plant.category?.slug}`" class="hover:underline">{{
                                    plant.category?.name || 'Toutes les plantes' }}</router-link>
                            </div>

                            <!-- Plant name and price -->
                            <h1 class="text-3xl font-bold text-gray-800 mb-1">{{ plant.name }}</h1>
                            <p class="text-xl text-gray-500 mb-4">{{ plant.species }}</p>

                            <div class="flex items-center mb-6">
                                <span v-if="plant.sale" class="text-xl text-red-500 font-bold mr-2">{{
                                    calculateDiscountPrice(plant.price, plant.sale_percent) }}€</span>
                                <span
                                    :class="{ 'line-through text-gray-500': plant.sale, 'text-xl font-bold text-gray-800': !plant.sale }">{{
                                    plant.price }}€</span>
                            </div>

                            <!-- Stock status -->
                            <div class="flex items-center mb-6">
                                <span class="w-3 h-3 rounded-full mr-2"
                                    :class="plant.in_stock ? 'bg-green-500' : 'bg-red-500'"></span>
                                <span>{{ plant.in_stock ? 'En stock' : 'Épuisé' }}</span>
                            </div>

                            <!-- Description -->
                            <div class="mb-6">
                                <h2 class="font-semibold mb-2 text-lg">Description</h2>
                                <p class="text-gray-600">{{ plant.description }}</p>
                            </div>

                            <!-- Plant details -->
                            <div class="grid grid-cols-2 gap-4 mb-6">
                                <div v-if="plant.size">
                                    <span class="text-sm text-gray-500">Taille</span>
                                    <p>{{ plant.size }}</p>
                                </div>
                                <div v-if="plant.light_requirement">
                                    <span class="text-sm text-gray-500">Luminosité requise</span>
                                    <p>{{ plant.light_requirement }}</p>
                                </div>
                                <div v-if="plant.water_requirement">
                                    <span class="text-sm text-gray-500">Arrosage</span>
                                    <p>{{ plant.water_requirement }}</p>
                                </div>
                                <div v-if="plant.difficulty">
                                    <span class="text-sm text-gray-500">Difficulté d'entretien</span>
                                    <p>{{ plant.difficulty }}</p>
                                </div>
                            </div>

                            <!-- Add to cart section -->
                            <div class="mt-auto">
                                <div class="flex items-center mb-4">
                                    <button @click="decrementQuantity"
                                        class="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-l">
                                        -
                                    </button>
                                    <input type="number" v-model="quantity" min="1" max="99"
                                        class="w-16 text-center border-t border-b border-gray-200 py-2" />
                                    <button @click="incrementQuantity"
                                        class="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-r">
                                        +
                                    </button>
                                </div>

                                <div class="flex flex-col sm:flex-row gap-3">
                                    <button @click="addToCart"
                                        class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl flex-grow transition-colors flex items-center justify-center"
                                        :disabled="!plant.in_stock">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        {{ plant.in_stock ? 'Ajouter au panier' : 'Rupture de stock' }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Related plants section -->
            <div v-if="relatedPlants.length > 0" class="mt-12">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Plantes similaires</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div v-for="relatedPlant in relatedPlants" :key="relatedPlant.id"
                        class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                        <div class="relative">
                            <img :src="relatedPlant.image" :alt="relatedPlant.name"
                                class="w-full h-48 object-cover rounded-t-xl" />
                            <span
                                class="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg text-sm font-medium text-green-800">
                                {{ relatedPlant.price }}€
                            </span>
                        </div>
                        <div class="p-4">
                            <h3 class="font-medium text-lg text-gray-800">{{ relatedPlant.name }}</h3>
                            <p class="text-sm text-gray-500">{{ relatedPlant.species }}</p>
                            <div class="flex justify-end mt-4">
                                <router-link :to="`/plants/${relatedPlant.slug}`"
                                    class="text-green-600 hover:text-green-800">
                                    Voir plus
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Back button -->
            <div class="mt-8">
                <router-link to="/plants" class="inline-flex items-center text-sm text-green-600 hover:text-green-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd" />
                    </svg>
                    Retour aux plantes
                </router-link>
            </div>
        </div>
    </main>
</template>

<script>
import PlantService from '@/services/plant.service'
import notificationService from '@/services/notification/notification.service'

export default {
    name: 'PlantDetail',
    data() {
        return {
            plant: {},
            relatedPlants: [],
            isLoading: true,
            error: null,
            quantity: 1,
            selectedImage: null
        }
    },
    computed: {
        plantImage() {
            return this.selectedImage || this.plant.image;
        }
    },
    watch: {
        quantity(newVal) {
            // Garantir que la quantité est toujours un entier positif
            if (newVal < 1) this.quantity = 1;
            if (newVal > 99) this.quantity = 99;
        }
    },
    async mounted() {
        const slug = this.$route.params.slug;

        try {
            // Chargement des détails de la plante
            const response = await PlantService.getPlantBySlug(slug);
            this.plant = response.data;
            this.selectedImage = this.plant.image;

            // Chargement des plantes similaires
            if (this.plant.category_id) {
                const allPlantsResponse = await PlantService.getAllPlants();
                this.relatedPlants = allPlantsResponse.data
                    .filter(p => p.category_id === this.plant.category_id && p.id !== this.plant.id)
                    .slice(0, 4); // Limiter à 4 plantes similaires
            }

        } catch (err) {
            this.error = err.response?.data?.message || 'Une erreur est survenue lors du chargement des données.';
        } finally {
            this.isLoading = false;
        }
    },
    methods: {
        incrementQuantity() {
            if (this.quantity < 99) this.quantity++;
        },
        decrementQuantity() {
            if (this.quantity > 1) this.quantity--;
        },
        calculateDiscountPrice(originalPrice, discountPercent) {
            const price = parseFloat(originalPrice.replace(',', '.'));
            const discount = price * (discountPercent / 100);
            return (price - discount).toFixed(2);
        },
        addToCart() {
            if (!this.plant.in_stock) return;

            // Logique d'ajout au panier (à implémenter)
            notificationService.success(`${this.quantity} ${this.plant.name} ${this.quantity > 1 ? 'ont été ajoutés' : 'a été ajouté'} à votre panier`);
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

/* Style pour empêcher les flèches de l'input number */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
}
</style>