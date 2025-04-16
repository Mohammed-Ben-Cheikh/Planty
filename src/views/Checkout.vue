<template>
    <main class="flex-grow container mx-auto px-4 sm:px-6 py-8 max-w-6xl">
        <h1 class="text-3xl font-bold text-green-800 mb-4">Finaliser votre commande</h1>
        <p class="text-gray-600 mb-8">Veuillez entrer vos informations pour compléter votre achat.</p>

        <!-- Empty cart warning -->
        <div v-if="!cart.items || cart.items.length === 0" class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div class="flex">
                <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="ml-3">
                    <p class="text-sm text-yellow-700">
                        Votre panier est vide. Veuillez ajouter des articles avant de procéder au paiement.
                        <router-link to="/plants" class="font-medium underline text-yellow-700 hover:text-yellow-600">
                            Parcourir nos plantes
                        </router-link>
                    </p>
                </div>
            </div>
        </div>

        <!-- Main checkout form -->
        <form v-else @submit.prevent="submitOrder" class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <!-- Left column: customer info and shipping -->
            <div class="lg:col-span-7 space-y-6">
                <!-- Sign in reminder -->
                <div v-if="!isLoggedIn" class="bg-blue-50 p-4 rounded-md">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm text-blue-700">
                                Vous avez déjà un compte ?
                                <router-link to="/login"
                                    class="font-medium underline text-blue-700 hover:text-blue-600">
                                    Connectez-vous
                                </router-link>
                                pour un paiement plus rapide.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Contact information -->
                <div class="bg-white shadow-sm rounded-md p-6">
                    <h2 class="text-lg font-medium text-gray-900 mb-4">Informations de contact</h2>

                    <div class="space-y-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label for="firstName" class="block text-sm font-medium text-gray-700">Prénom</label>
                                <input v-model="customer.firstName" type="text" id="firstName" required
                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500">
                            </div>

                            <div>
                                <label for="lastName" class="block text-sm font-medium text-gray-700">Nom</label>
                                <input v-model="customer.lastName" type="text" id="lastName" required
                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500">
                            </div>
                        </div>

                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                            <input v-model="customer.email" type="email" id="email" required
                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500">
                        </div>

                        <div>
                            <label for="phone" class="block text-sm font-medium text-gray-700">Téléphone</label>
                            <input v-model="customer.phone" type="tel" id="phone"
                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500">
                        </div>
                    </div>
                </div>

                <!-- Shipping information -->
                <div class="bg-white shadow-sm rounded-md p-6">
                    <h2 class="text-lg font-medium text-gray-900 mb-4">Adresse de livraison</h2>

                    <div class="space-y-4">
                        <div>
                            <label for="address" class="block text-sm font-medium text-gray-700">Adresse</label>
                            <input v-model="shipping.address" type="text" id="address" required
                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500">
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label for="postalCode" class="block text-sm font-medium text-gray-700">Code
                                    postal</label>
                                <input v-model="shipping.postalCode" type="text" id="postalCode" required
                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500">
                            </div>

                            <div>
                                <label for="city" class="block text-sm font-medium text-gray-700">Ville</label>
                                <input v-model="shipping.city" type="text" id="city" required
                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500">
                            </div>
                        </div>

                        <div>
                            <label for="country" class="block text-sm font-medium text-gray-700">Pays</label>
                            <select v-model="shipping.country" id="country" required
                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500">
                                <option value="FR">France</option>
                                <option value="BE">Belgique</option>
                                <option value="CH">Suisse</option>
                                <option value="LU">Luxembourg</option>
                                <option value="MC">Monaco</option>
                            </select>
                        </div>

                        <div v-if="shipping.country === 'FR'" class="pt-2">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input v-model="shipping.pickupInStore" id="pickup" type="checkbox"
                                        class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded">
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="pickup" class="font-medium text-gray-700">Retrait en magasin</label>
                                    <p class="text-gray-500">Récupérez votre commande dans notre boutique à Paris. Délai
                                        de préparation: 24h.</p>
                                </div>
                            </div>
                        </div>

                        <!-- Delivery options -->
                        <div class="pt-4">
                            <p class="text-sm font-medium text-gray-700 mb-3">Mode de livraison</p>

                            <div class="space-y-3">
                                <div class="flex items-center p-3 border rounded-md"
                                    :class="shipping.method === 'standard' ? 'border-green-500 bg-green-50' : 'border-gray-300'">
                                    <input v-model="shipping.method" type="radio" id="standard" value="standard"
                                        class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300">
                                    <label for="standard" class="ml-3 flex flex-col cursor-pointer">
                                        <span class="block text-sm font-medium text-gray-700">Livraison standard (3-5
                                            jours ouvrés)</span>
                                        <span class="block text-sm text-gray-500">
                                            {{ subtotal > 50 ? 'Gratuite' : '5,99€' }}
                                        </span>
                                    </label>
                                </div>

                                <div class="flex items-center p-3 border rounded-md"
                                    :class="shipping.method === 'express' ? 'border-green-500 bg-green-50' : 'border-gray-300'">
                                    <input v-model="shipping.method" type="radio" id="express" value="express"
                                        class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300">
                                    <label for="express" class="ml-3 flex flex-col cursor-pointer">
                                        <span class="block text-sm font-medium text-gray-700">Livraison express (1-2
                                            jours ouvrés)</span>
                                        <span class="block text-sm text-gray-500">9,99€</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Payment details -->
                <div class="bg-white shadow-sm rounded-md p-6">
                    <h2 class="text-lg font-medium text-gray-900 mb-4">Méthode de paiement</h2>

                    <div class="space-y-4">
                        <!-- Payment method selection -->
                        <div class="space-y-3">
                            <div class="flex items-center p-3 border rounded-md"
                                :class="payment.method === 'card' ? 'border-green-500 bg-green-50' : 'border-gray-300'">
                                <input v-model="payment.method" type="radio" id="card" value="card"
                                    class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300">
                                <label for="card" class="ml-3 flex flex-col cursor-pointer">
                                    <span class="block text-sm font-medium text-gray-700">Carte bancaire</span>
                                    <span class="block text-sm text-gray-500">Visa, MasterCard, American Express</span>
                                </label>
                                <div class="ml-auto flex items-center">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                                        alt="Visa" class="h-6 w-10 object-contain mx-1">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                                        alt="Mastercard" class="h-6 w-10 object-contain mx-1">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg"
                                        alt="Amex" class="h-6 w-10 object-contain mx-1">
                                </div>
                            </div>

                            <div class="flex items-center p-3 border rounded-md"
                                :class="payment.method === 'paypal' ? 'border-green-500 bg-green-50' : 'border-gray-300'">
                                <input v-model="payment.method" type="radio" id="paypal" value="paypal"
                                    class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300">
                                <label for="paypal" class="ml-3 flex flex-col cursor-pointer">
                                    <span class="block text-sm font-medium text-gray-700">PayPal</span>
                                    <span class="block text-sm text-gray-500">Paiement sécurisé via PayPal</span>
                                </label>
                                <div class="ml-auto">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                                        alt="PayPal" class="h-6 w-16 object-contain">
                                </div>
                            </div>
                        </div>

                        <!-- Credit card form (shown only when card is selected) -->
                        <div v-if="payment.method === 'card'" class="pt-4 space-y-4">
                            <div>
                                <label for="cardNumber" class="block text-sm font-medium text-gray-700">Numéro de
                                    carte</label>
                                <input v-model="payment.cardNumber" type="text" id="cardNumber"
                                    placeholder="1234 5678 9012 3456"
                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500">
                            </div>

                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label for="expiryDate" class="block text-sm font-medium text-gray-700">Date
                                        d'expiration</label>
                                    <input v-model="payment.expiryDate" type="text" id="expiryDate" placeholder="MM/AA"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500">
                                </div>

                                <div>
                                    <label for="cvc" class="block text-sm font-medium text-gray-700">CVC</label>
                                    <input v-model="payment.cvc" type="text" id="cvc" placeholder="123"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500">
                                </div>
                            </div>

                            <div>
                                <label for="nameOnCard" class="block text-sm font-medium text-gray-700">Nom sur la
                                    carte</label>
                                <input v-model="payment.nameOnCard" type="text" id="nameOnCard"
                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right column: order summary -->
            <div class="lg:col-span-5">
                <div class="bg-white shadow-sm rounded-md sticky top-6">
                    <div class="px-4 py-5 sm:p-6">
                        <h2 class="text-lg font-medium text-gray-900 mb-4">Récapitulatif de commande</h2>

                        <!-- Order items -->
                        <div class="border-t border-gray-200 pt-4 mb-4">
                            <ul class="divide-y divide-gray-200">
                                <li v-for="(item, index) in cart.items" :key="index" class="py-4 flex">
                                    <div class="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                                        <img :src="item.image" :alt="item.name" class="w-full h-full object-cover">
                                    </div>
                                    <div class="ml-4 flex-1">
                                        <div class="flex justify-between">
                                            <h3 class="text-sm font-medium text-gray-900">{{ item.name }}</h3>
                                            <p class="ml-4 text-sm font-medium text-gray-900">{{
                                                formatPrice(item.quantity * parseFloat(item.price.replace(',', '.')))
                                                }}€</p>
                                        </div>
                                        <p class="mt-1 text-sm text-gray-500">
                                            Qté: {{ item.quantity }} × {{ item.price }}€
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <!-- Cost breakdown -->
                        <div class="border-t border-gray-200 pt-4">
                            <div class="space-y-3">
                                <div class="flex justify-between text-sm">
                                    <p class="text-gray-700">Sous-total</p>
                                    <p class="text-gray-900 font-medium">{{ formatPrice(subtotal) }}€</p>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <p class="text-gray-700">Livraison</p>
                                    <p v-if="shippingCost > 0" class="text-gray-900">{{ formatPrice(shippingCost) }}€
                                    </p>
                                    <p v-else class="text-green-600">Gratuite</p>
                                </div>
                                <div v-if="discount > 0" class="flex justify-between text-sm">
                                    <p class="text-gray-700">Réduction</p>
                                    <p class="text-green-600">-{{ formatPrice(discount) }}€</p>
                                </div>
                                <div v-if="tax > 0" class="flex justify-between text-sm">
                                    <p class="text-gray-700">TVA (20%)</p>
                                    <p class="text-gray-900">{{ formatPrice(tax) }}€</p>
                                </div>
                            </div>

                            <div
                                class="flex justify-between text-base font-medium text-gray-900 mt-6 pt-4 border-t border-gray-200">
                                <p>Total</p>
                                <p>{{ formatPrice(total) }}€</p>
                            </div>
                        </div>

                        <!-- Terms checkbox -->
                        <div class="mt-6">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input v-model="termsAccepted" id="terms" type="checkbox" required
                                        class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded">
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="terms" class="font-medium text-gray-700">J'accepte les conditions
                                        générales de vente</label>
                                    <p class="text-gray-500">En validant votre commande, vous acceptez nos <a
                                            href="/terms" class="text-green-600 hover:underline">conditions générales de
                                            vente</a>.</p>
                                </div>
                            </div>
                        </div>

                        <!-- Submit button -->
                        <div class="mt-6">
                            <button type="submit" :disabled="isSubmitting"
                                class="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50">
                                <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                {{ isSubmitting ? 'Traitement en cours...' : 'Confirmer ma commande' }}
                            </button>
                        </div>

                        <!-- Security notice -->
                        <div class="mt-4 flex items-center justify-center text-sm text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-1.5"
                                viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd" />
                            </svg>
                            Paiement 100% sécurisé
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </main>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AuthService from '@/services/auth.service'
import OrderService from '@/services/order.service'
import notificationService from '@/services/notification/notification.service'

export default {
    name: 'Checkout',
    setup() {
        const router = useRouter();

        // Cart data
        const cart = reactive({
            items: [],
            discount_applied: false,
            discount_code: ''
        });

        // Customer information
        const customer = reactive({
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        });

        // Shipping information
        const shipping = reactive({
            address: '',
            postalCode: '',
            city: '',
            country: 'FR',
            method: 'standard',
            pickupInStore: false
        });

        // Payment information
        const payment = reactive({
            method: 'card',
            cardNumber: '',
            expiryDate: '',
            cvc: '',
            nameOnCard: ''
        });

        // Other reactive variables
        const isSubmitting = ref(false);
        const termsAccepted = ref(false);
        const isLoggedIn = ref(false);

        // Price calculations
        const subtotal = computed(() => {
            return cart.items.reduce((sum, item) => {
                return sum + (parseFloat(item.price.replace(',', '.')) * item.quantity);
            }, 0);
        });

        const shippingCost = computed(() => {
            if (shipping.pickupInStore) return 0;
            if (shipping.method === 'express') return 9.99;
            return subtotal.value > 50 ? 0 : 5.99;
        });

        const discount = computed(() => {
            return cart.discount_applied ? subtotal.value * 0.10 : 0;
        });

        const tax = computed(() => {
            return Math.round((subtotal.value * 0.20) * 100) / 100;
        });

        const total = computed(() => {
            return subtotal.value + shippingCost.value + tax.value - discount.value;
        });

        // Load cart from localStorage
        const loadCartFromLocalStorage = () => {
            const savedCart = localStorage.getItem('planty_cart');
            if (savedCart) {
                try {
                    const parsedCart = JSON.parse(savedCart);
                    cart.items = parsedCart.items || [];
                    cart.discount_applied = parsedCart.discount_applied || false;
                    cart.discount_code = parsedCart.discount_code || '';
                } catch (e) {
                    console.error('Error parsing cart from localStorage', e);
                }
            }

            // Load demo data if cart is empty (for development purposes only)
            if (!cart.items || cart.items.length === 0) {
                loadDemoData();
            }
        };

        const loadDemoData = () => {
            cart.items = [
                {
                    id: 1,
                    name: 'Monstera Deliciosa',
                    species: 'Monstera',
                    price: '29.99',
                    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                    quantity: 1
                },
                {
                    id: 2,
                    name: 'Ficus Lyrata',
                    species: 'Ficus',
                    price: '39.99',
                    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                    quantity: 2
                }
            ];
        };

        // Load user data if logged in
        const loadUserData = () => {
            const currentUser = AuthService.getCurrentUser();
            if (currentUser) {
                isLoggedIn.value = true;
                customer.firstName = currentUser.firstName || '';
                customer.lastName = currentUser.lastName || '';
                customer.email = currentUser.email || '';
                customer.phone = currentUser.phone || '';

                // Load address if available
                if (currentUser.address) {
                    shipping.address = currentUser.address || '';
                    shipping.postalCode = currentUser.postalCode || '';
                    shipping.city = currentUser.city || '';
                    shipping.country = currentUser.country || 'FR';
                }
            }
        };

        // Submit order
        const submitOrder = async () => {
            if (!termsAccepted.value) {
                notificationService.error('Vous devez accepter les conditions générales de vente.');
                return;
            }

            isSubmitting.value = true;

            // Build order data
            const orderData = {
                customer: {
                    firstName: customer.firstName,
                    lastName: customer.lastName,
                    email: customer.email,
                    phone: customer.phone
                },
                shipping: {
                    address: shipping.pickupInStore ? 'Retrait en magasin' : shipping.address,
                    postalCode: shipping.postalCode,
                    city: shipping.city,
                    country: shipping.country,
                    method: shipping.method,
                    pickupInStore: shipping.pickupInStore
                },
                payment: {
                    method: payment.method,
                    // Don't send sensitive card details to the backend
                    cardLastFour: payment.method === 'card' ? payment.cardNumber.slice(-4) : null
                },
                items: cart.items,
                subtotal: subtotal.value,
                tax: tax.value,
                shippingCost: shippingCost.value,
                discount: discount.value,
                discountCode: cart.discount_code,
                total: total.value
            };

            try {
                // Simulate API call with a delay
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Call order API (commented out for demo)
                // const response = await OrderService.createOrder(orderData);
                // const orderId = response.data.id;

                // Temp for demo
                const orderId = 'ORD-' + Math.floor(Math.random() * 1000000);

                // Clear cart
                localStorage.removeItem('planty_cart');

                // Show success and redirect
                notificationService.success('Votre commande a été passée avec succès !');
                router.push(`/order-confirmation/${orderId}`);
            } catch (err) {
                notificationService.error(err.response?.data?.message || 'Une erreur est survenue lors du traitement de votre commande.');
            } finally {
                isSubmitting.value = false;
            }
        };

        // Format price
        const formatPrice = (price) => {
            return price.toFixed(2).replace('.', ',');
        };

        // Lifecycle hooks
        onMounted(() => {
            loadCartFromLocalStorage();
            loadUserData();
        });

        return {
            cart,
            customer,
            shipping,
            payment,
            isSubmitting,
            termsAccepted,
            isLoggedIn,
            subtotal,
            shippingCost,
            discount,
            tax,
            total,
            submitOrder,
            formatPrice
        };
    }
}
</script>