<template>
    <main class="flex-grow container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
        <div class="animate-fade-in">
            <h1 class="text-3xl font-bold text-green-800 mb-6">Mes réservations</h1>

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
                    Chargement de vos réservations...
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

            <!-- No reservations -->
            <div v-else-if="orders.length === 0" class="bg-gray-50 p-8 rounded-xl text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 class="text-lg font-medium text-gray-900">Aucune réservation</h3>
                <p class="mt-2 text-sm text-gray-500">
                    Vous n'avez pas encore effectué de réservation.
                </p>
                <div class="mt-6">
                    <router-link to="/plants"
                        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                clip-rule="evenodd" />
                        </svg>
                        Découvrir les plantes
                    </router-link>
                </div>
            </div>

            <!-- Reservation list -->
            <div v-else>
                <!-- Filter options -->
                <div class="mb-6 flex flex-wrap gap-4">
                    <button @click="activeFilter = 'all'" :class="['px-4 py-2 rounded-full text-sm font-medium',
                        activeFilter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']">
                        Toutes
                    </button>
                    <button @click="activeFilter = 'pending'"
                        :class="['px-4 py-2 rounded-full text-sm font-medium',
                            activeFilter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']">
                        En attente
                    </button>
                    <button @click="activeFilter = 'confirmed'"
                        :class="['px-4 py-2 rounded-full text-sm font-medium',
                            activeFilter === 'confirmed' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']">
                        Confirmées
                    </button>
                    <button @click="activeFilter = 'completed'"
                        :class="['px-4 py-2 rounded-full text-sm font-medium',
                            activeFilter === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']">
                        Terminées
                    </button>
                    <button @click="activeFilter = 'cancelled'" :class="['px-4 py-2 rounded-full text-sm font-medium',
                        activeFilter === 'cancelled' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']">
                        Annulées
                    </button>
                </div>

                <!-- Orders list -->
                <div class="space-y-6">
                    <div v-for="order in filteredOrders" :key="order.id"
                        class="bg-white shadow overflow-hidden rounded-lg">
                        <div class="px-4 py-4 sm:px-6 flex justify-between items-center border-b border-gray-200">
                            <div>
                                <h3 class="text-lg font-medium text-gray-900">
                                    Réservation #{{ order.reference_no || order.id }}
                                </h3>
                                <p class="text-sm text-gray-500">
                                    Passée le {{ formatDate(order.created_at) }}
                                </p>
                            </div>
                            <div>
                                <span :class="getStatusBadgeClass(order.status)">
                                    {{ getStatusLabel(order.status) }}
                                </span>
                            </div>
                        </div>

                        <!-- Order details -->
                        <div class="px-4 py-4 sm:px-6">
                            <!-- Items -->
                            <div class="mb-4">
                                <h4 class="text-sm font-medium text-gray-700">Articles</h4>
                                <ul class="mt-2 divide-y divide-gray-200">
                                    <li v-for="(item, index) in order.items" :key="index"
                                        class="py-2 flex justify-between">
                                        <div class="flex items-center">
                                            <img v-if="item.image" :src="item.image" :alt="item.name"
                                                class="h-10 w-10 rounded-full object-cover mr-3" />
                                            <div>
                                                <p class="text-sm font-medium text-gray-900">{{ item.name }}</p>
                                                <p class="text-sm text-gray-500">{{ item.quantity }} × {{ item.price }}€
                                                </p>
                                            </div>
                                        </div>
                                        <p class="text-sm font-medium text-gray-900">{{ (item.quantity *
                                            parseFloat(item.price.replace(',', '.'))).toFixed(2) }}€</p>
                                    </li>
                                </ul>
                            </div>

                            <!-- Total and actions -->
                            <div class="flex justify-between items-center pt-4 border-t border-gray-200">
                                <div>
                                    <p class="text-sm text-gray-700">Total</p>
                                    <p class="text-xl font-bold text-gray-900">{{ order.total }}€</p>
                                </div>
                                <div class="space-x-2">
                                    <router-link :to="`/reservations/${order.slug || order.id}`"
                                        class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                                        Détails
                                    </router-link>

                                    <button v-if="order.status === 'pending'" @click="cancelOrder(order)"
                                        class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150">
                                        Annuler
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import OrderService from '@/services/order.service'
import AuthService from '@/services/auth.service'
import notificationService from '@/services/notification/notification.service'

export default {
    name: 'Reservations',
    data() {
        return {
            orders: [],
            isLoading: true,
            error: null,
            activeFilter: 'all'
        }
    },
    computed: {
        filteredOrders() {
            if (this.activeFilter === 'all') {
                return this.orders;
            }
            return this.orders.filter(order => order.status === this.activeFilter);
        }
    },
    async mounted() {
        await this.loadOrders();
    },
    methods: {
        async loadOrders() {
            const currentUser = AuthService.getCurrentUser();

            if (!currentUser || !currentUser.id) {
                this.error = 'Vous devez être connecté pour voir vos réservations.';
                this.isLoading = false;
                return;
            }

            try {
                const response = await OrderService.getUserOrders(currentUser.id);
                this.orders = response.data;
            } catch (err) {
                this.error = err.response?.data?.message || 'Une erreur est survenue lors du chargement des réservations.';
            } finally {
                this.isLoading = false;
            }
        },

        async cancelOrder(order) {
            try {
                await OrderService.updateOrderStatus(order.slug || order.id, 'cancelled');

                // Mettre à jour l'ordre localement
                const index = this.orders.findIndex(o => o.id === order.id);
                if (index !== -1) {
                    this.orders[index].status = 'cancelled';
                }

                notificationService.success('Votre réservation a été annulée avec succès.');
            } catch (err) {
                notificationService.error(err.response?.data?.message || 'Impossible d\'annuler cette réservation.');
            }
        },

        formatDate(dateString) {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).format(date);
        },

        getStatusLabel(status) {
            switch (status) {
                case 'pending': return 'En attente';
                case 'confirmed': return 'Confirmée';
                case 'processing': return 'En préparation';
                case 'shipped': return 'Expédiée';
                case 'completed': return 'Terminée';
                case 'cancelled': return 'Annulée';
                default: return status;
            }
        },

        getStatusBadgeClass(status) {
            const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';

            switch (status) {
                case 'pending':
                    return `${baseClasses} bg-yellow-100 text-yellow-800`;
                case 'confirmed':
                    return `${baseClasses} bg-blue-100 text-blue-800`;
                case 'processing':
                    return `${baseClasses} bg-indigo-100 text-indigo-800`;
                case 'shipped':
                    return `${baseClasses} bg-purple-100 text-purple-800`;
                case 'completed':
                    return `${baseClasses} bg-green-100 text-green-800`;
                case 'cancelled':
                    return `${baseClasses} bg-red-100 text-red-800`;
                default:
                    return `${baseClasses} bg-gray-100 text-gray-800`;
            }
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