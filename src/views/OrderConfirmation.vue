<template>
    <main class="flex-grow container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
        <div class="bg-white shadow-sm rounded-lg p-6 md:p-8">
            <!-- Success header -->
            <div class="text-center mb-8">
                <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                    <svg class="h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 class="text-3xl font-bold text-gray-900">Commande confirmée !</h1>
                <p class="text-lg text-gray-600 mt-2">Merci pour votre achat</p>
            </div>

            <!-- Order details -->
            <div class="border-t border-gray-200 pt-6">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-lg font-medium text-gray-900">Récapitulatif de la commande</h2>
                    <p class="text-sm text-gray-600">
                        Commande #{{ orderId }}
                    </p>
                </div>

                <p class="text-sm text-gray-600 mb-6">
                    Un email de confirmation a été envoyé à <span class="font-medium">{{ order.customer.email }}</span>
                </p>

                <!-- Order items -->
                <div class="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 class="text-sm font-medium text-gray-900 mb-3">Articles commandés</h3>
                    <ul class="divide-y divide-gray-200">
                        <li v-for="(item, index) in order.items" :key="index" class="py-3 flex">
                            <div class="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                                <img :src="item.image" :alt="item.name" class="w-full h-full object-cover">
                            </div>
                            <div class="ml-4 flex-1">
                                <div class="flex justify-between">
                                    <h4 class="text-sm font-medium text-gray-900">{{ item.name }}</h4>
                                    <p class="ml-4 text-sm font-medium text-gray-900">{{ formatPrice(item.quantity *
                                        parseFloat(item.price.replace(',', '.'))) }}€</p>
                                </div>
                                <p class="mt-1 text-sm text-gray-500">
                                    Qté: {{ item.quantity }} × {{ item.price }}€
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- Shipping info -->
                <div class="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 class="text-sm font-medium text-gray-900 mb-3">Informations de livraison</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Adresse de
                                livraison</h4>
                            <p class="text-sm">
                                {{ order.customer.firstName }} {{ order.customer.lastName }}<br>
                                <template v-if="order.shipping.pickupInStore">
                                    Retrait en magasin<br>
                                    Planty Boutique Paris<br>
                                    123 Avenue des Plantes<br>
                                    75011 Paris, France
                                </template>
                                <template v-else>
                                    {{ order.shipping.address }}<br>
                                    {{ order.shipping.postalCode }} {{ order.shipping.city }}<br>
                                    {{ getCountryName(order.shipping.country) }}
                                </template>
                            </p>
                        </div>
                        <div>
                            <h4 class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Méthode de
                                livraison</h4>
                            <p class="text-sm">
                                {{ order.shipping.pickupInStore ? 'Retrait en magasin (sous 24h)' :
                                    order.shipping.method === 'standard' ? 'Livraison standard (3-5 jours)' : 'Livraison express (1-2 jours)' }}
                            </p>

                            <div v-if="!order.shipping.pickupInStore" class="mt-4">
                                <h4 class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Suivi de
                                    colis</h4>
                                <div class="flex items-center text-sm text-gray-500">
                                    <span
                                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        En préparation
                                    </span>
                                    <span class="ml-2">Expédition prévue le {{ getShippingDate() }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Payment summary -->
                <div class="bg-gray-50 rounded-lg p-4 mb-8">
                    <h3 class="text-sm font-medium text-gray-900 mb-3">Récapitulatif de paiement</h3>
                    <div class="space-y-2">
                        <div class="flex justify-between text-sm">
                            <p class="text-gray-600">Sous-total</p>
                            <p class="text-gray-900">{{ formatPrice(order.subtotal) }}€</p>
                        </div>
                        <div class="flex justify-between text-sm">
                            <p class="text-gray-600">Livraison</p>
                            <p v-if="order.shippingCost > 0" class="text-gray-900">{{ formatPrice(order.shippingCost)
                                }}€</p>
                            <p v-else class="text-green-600">Gratuite</p>
                        </div>
                        <div v-if="order.discount > 0" class="flex justify-between text-sm">
                            <p class="text-gray-600">Réduction</p>
                            <p class="text-green-600">-{{ formatPrice(order.discount) }}€</p>
                        </div>
                        <div class="flex justify-between text-sm">
                            <p class="text-gray-600">TVA (20%)</p>
                            <p class="text-gray-900">{{ formatPrice(order.tax) }}€</p>
                        </div>
                        <div class="flex justify-between text-base font-medium border-t border-gray-200 pt-2 mt-2">
                            <p class="text-gray-900">Total</p>
                            <p class="text-gray-900">{{ formatPrice(order.total) }}€</p>
                        </div>
                        <div class="flex justify-between text-sm">
                            <p class="text-gray-600">Moyen de paiement</p>
                            <p class="text-gray-900">
                                {{ order.payment.method === 'card' ? 'Carte bancaire ****' + order.payment.cardLastFour
                                : 'PayPal' }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Next steps -->
                <div class="space-y-6 divide-y divide-gray-200">
                    <div class="pt-6">
                        <h3 class="text-sm font-medium text-gray-900 mb-3">Et maintenant ?</h3>
                        <ul class="mt-2 space-y-2 text-sm text-gray-600">
                            <li class="flex items-start">
                                <svg class="flex-shrink-0 h-5 w-5 text-green-500 mr-2"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clip-rule="evenodd" />
                                </svg>
                                <p>Un email de confirmation a été envoyé avec tous les détails de votre commande</p>
                            </li>
                            <li class="flex items-start">
                                <svg class="flex-shrink-0 h-5 w-5 text-green-500 mr-2"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clip-rule="evenodd" />
                                </svg>
                                <p>Vous pouvez suivre l'état de votre commande dans la section <router-link
                                        to="/account/orders" class="text-green-600 hover:text-green-500">Mes
                                        commandes</router-link></p>
                            </li>
                            <li class="flex items-start">
                                <svg class="flex-shrink-0 h-5 w-5 text-green-500 mr-2"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clip-rule="evenodd" />
                                </svg>
                                <p>Besoin d'aide ? Contactez notre <a href="/support"
                                        class="text-green-600 hover:text-green-500">service client</a></p>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Continue shopping button -->
                <div class="mt-6 flex justify-center">
                    <router-link to="/plants"
                        class="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                                clip-rule="evenodd" />
                        </svg>
                        Continuer mes achats
                    </router-link>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
    name: 'OrderConfirmation',
    setup() {
        const route = useRoute();
        const orderId = ref(route.params.id || 'ORD-000000');

        // Sample order data
        // In a real app, this would be fetched from the API using the order ID
        const order = reactive({
            customer: {
                firstName: 'Jean',
                lastName: 'Dupont',
                email: 'jean.dupont@example.com',
                phone: '06 12 34 56 78'
            },
            shipping: {
                address: '123 Rue de la Paix',
                postalCode: '75001',
                city: 'Paris',
                country: 'FR',
                method: 'standard',
                pickupInStore: false
            },
            payment: {
                method: 'card',
                cardLastFour: '4242'
            },
            items: [
                {
                    id: 1,
                    name: 'Monstera Deliciosa',
                    species: 'Monstera',
                    price: '29,99',
                    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                    quantity: 1
                },
                {
                    id: 2,
                    name: 'Ficus Lyrata',
                    species: 'Ficus',
                    price: '39,99',
                    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                    quantity: 2
                }
            ],
            subtotal: 109.97,
            tax: 22.00,
            shippingCost: 0,
            discount: 0,
            total: 131.97
        });

        // Format price
        const formatPrice = (price) => {
            return Number(price).toFixed(2).replace('.', ',');
        };

        // Get country name from code
        const getCountryName = (code) => {
            const countries = {
                'FR': 'France',
                'BE': 'Belgique',
                'CH': 'Suisse',
                'LU': 'Luxembourg',
                'MC': 'Monaco'
            };
            return countries[code] || code;
        };

        // Get shipping date (next business day)
        const getShippingDate = () => {
            const today = new Date();
            let businessDays = 1;
            let date = new Date(today);

            while (businessDays > 0) {
                date.setDate(date.getDate() + 1);
                if (date.getDay() !== 0 && date.getDay() !== 6) { // Skip weekends
                    businessDays -= 1;
                }
            }

            // Format date to French style: DD/MM/YYYY
            return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
        };

        onMounted(() => {
            // In a real app, you would fetch the order details from the API
            // OrderService.getOrderById(orderId.value).then(response => {
            //   Object.assign(order, response.data);
            // });
        });

        return {
            orderId,
            order,
            formatPrice,
            getCountryName,
            getShippingDate
        };
    }
}
</script>