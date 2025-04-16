<template>
  <main class="flex-grow container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
    <h1 class="text-3xl font-bold text-green-800 mb-6">Mon panier</h1>

    <!-- Empty cart state -->
    <div v-if="!cart.items || cart.items.length === 0" class="bg-gray-50 p-8 text-center rounded-xl">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <h2 class="text-2xl font-medium text-gray-800 mb-2">Votre panier est vide</h2>
      <p class="text-gray-600 mb-6">Découvrez notre collection de plantes et ajoutez vos favorites à votre panier.</p>
      <router-link to="/plants" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
        <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
        </svg>
        Découvrir nos plantes
      </router-link>
    </div>

    <!-- Cart with items -->
    <div v-else>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Cart items -->
        <div class="lg:col-span-8">
          <div class="bg-white shadow-md rounded-lg overflow-hidden mb-6">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Articles ({{ totalQuantity }})</h3>
            </div>
            
            <ul class="divide-y divide-gray-200">
              <li v-for="(item, index) in cart.items" :key="index" class="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center">
                <!-- Mobile remove button -->
                <button @click="removeItem(item)" class="sm:hidden self-end mb-2 text-gray-400 hover:text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <!-- Item content -->
                <div class="flex-shrink-0">
                  <img :src="item.image" :alt="item.name" class="h-20 w-20 rounded-md object-cover">
                </div>
                
                <div class="flex-grow sm:ml-6 mt-4 sm:mt-0">
                  <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div>
                      <h4 class="text-base font-medium text-gray-900">{{ item.name }}</h4>
                      <p v-if="item.species" class="text-sm text-gray-500">{{ item.species }}</p>
                      <p class="mt-1 text-sm text-gray-700">
                        {{ item.price }}€
                        <span v-if="item.sale" class="line-through text-gray-400 ml-1">{{ item.original_price }}€</span>
                      </p>
                    </div>
                    
                    <div class="flex items-center gap-4 mt-4 sm:mt-0">
                      <!-- Quantity selector -->
                      <div class="flex border border-gray-300 rounded-md overflow-hidden">
                        <button @click="decrementQuantity(item)" 
                          class="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600" 
                          :disabled="item.quantity <= 1">
                          -
                        </button>
                        <div class="w-10 px-2 py-1 text-center">
                          {{ item.quantity }}
                        </div>
                        <button @click="incrementQuantity(item)" 
                          class="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600">
                          +
                        </button>
                      </div>
                      
                      <!-- Desktop remove button -->
                      <button @click="removeItem(item)" class="hidden sm:block text-gray-400 hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            <div class="px-4 py-5 sm:px-6 border-t border-gray-200 flex justify-between">
              <button @click="clearCart" 
                class="text-sm text-red-600 hover:text-red-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Vider le panier
              </button>
              
              <router-link to="/plants" class="text-green-600 hover:text-green-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Ajouter d'autres articles
              </router-link>
            </div>
          </div>
        </div>
        
        <!-- Order summary -->
        <div class="lg:col-span-4">
          <div class="bg-white shadow-md rounded-lg overflow-hidden sticky top-6">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Récapitulatif</h3>
            </div>
            
            <div class="px-4 py-5 sm:px-6">
              <div class="space-y-3">
                <div class="flex justify-between">
                  <p class="text-gray-700">Sous-total</p>
                  <p class="text-gray-900 font-medium">{{ formatPrice(subtotal) }}€</p>
                </div>
                <div class="flex justify-between">
                  <p class="text-gray-700">Livraison</p>
                  <p v-if="shippingCost > 0" class="text-gray-900">{{ formatPrice(shippingCost) }}€</p>
                  <p v-else class="text-green-600">Gratuite</p>
                </div>
                <div v-if="discount > 0" class="flex justify-between">
                  <p class="text-gray-700">Réduction</p>
                  <p class="text-green-600">-{{ formatPrice(discount) }}€</p>
                </div>
                <div v-if="tax > 0" class="flex justify-between">
                  <p class="text-gray-700">TVA</p>
                  <p class="text-gray-900">{{ formatPrice(tax) }}€</p>
                </div>
              </div>
              
              <div class="mt-4 pt-4 border-t border-gray-200">
                <div class="flex justify-between items-center">
                  <p class="text-lg font-medium text-gray-900">Total</p>
                  <p class="text-xl font-bold text-gray-900">{{ formatPrice(total) }}€</p>
                </div>
              </div>

              <!-- Promo code input -->
              <div v-if="!cart.discount_applied" class="mt-6">
                <div class="flex space-x-2 mt-1">
                  <input v-model="promoCode" type="text" placeholder="Code promotionnel"
                    class="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500" />
                  <button @click="applyPromoCode" 
                    :disabled="!promoCode"
                    class="flex-shrink-0 px-3 py-2 border border-transparent text-sm font-medium rounded-md 
                    shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none 
                    focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50">
                    Appliquer
                  </button>
                </div>
                <p v-if="promoError" class="mt-1 text-sm text-red-600">{{ promoError }}</p>
              </div>

              <div v-if="cart.discount_applied" class="mt-4">
                <div class="bg-green-50 p-3 rounded-md">
                  <div class="flex">
                    <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <p class="ml-2 text-sm text-green-700">
                      Code "{{ cart.discount_code }}" appliqué
                    </p>
                    <button @click="removePromoCode" class="ml-auto text-green-700 hover:text-green-900">
                      <span class="sr-only">Retirer</span>
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Checkout button -->
              <div class="mt-6">
                <router-link to="/checkout"
                  class="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  Passer à la caisse
                </router-link>
              </div>
              
              <p class="mt-4 text-center text-sm text-gray-500">
                Paiement 100% sécurisé
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import notificationService from '@/services/notification/notification.service'

export default {
  name: 'ShoppingCart',
  data() {
    return {
      cart: {
        items: [],
        discount_applied: false,
        discount_code: ''
      },
      shippingCost: 5.99,
      discount: 0,
      tax: 0,
      promoCode: '',
      promoError: ''
    }
  },
  computed: {
    subtotal() {
      return this.cart.items.reduce((sum, item) => {
        return sum + (parseFloat(item.price.replace(',', '.')) * item.quantity);
      }, 0);
    },
    total() {
      return this.subtotal + this.shippingCost + this.tax - this.discount;
    },
    totalQuantity() {
      return this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
    }
  },
  mounted() {
    this.loadCartFromLocalStorage();
    this.calculateShipping();
    this.calculateTax();
    
    // Exemple de données pour démonstration - à remplacer par de vraies données
    if (!this.cart.items || this.cart.items.length === 0) {
      this.loadDemoData();
    }
  },
  methods: {
    loadDemoData() {
      this.cart = {
        items: [
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
        ],
        discount_applied: false,
        discount_code: ''
      }
      this.saveCartToLocalStorage();
      this.calculateShipping();
    },
    loadCartFromLocalStorage() {
      const savedCart = localStorage.getItem('planty_cart');
      if (savedCart) {
        try {
          this.cart = JSON.parse(savedCart);
        } catch (e) {
          console.error('Error parsing cart from localStorage', e);
          this.cart = { items: [], discount_applied: false, discount_code: '' };
        }
      }
    },
    saveCartToLocalStorage() {
      localStorage.setItem('planty_cart', JSON.stringify(this.cart));
    },
    calculateShipping() {
      // Logique de calcul des frais de livraison
      if (this.subtotal > 50) {
        this.shippingCost = 0; // Livraison gratuite pour les commandes > 50€
      } else {
        this.shippingCost = 5.99;
      }
    },
    calculateTax() {
      // Supposons une TVA de 20%
      this.tax = Math.round((this.subtotal * 0.20) * 100) / 100;
    },
    incrementQuantity(item) {
      item.quantity++;
      this.saveCartToLocalStorage();
      this.calculateShipping();
      this.calculateTax();
    },
    decrementQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
        this.saveCartToLocalStorage();
        this.calculateShipping();
        this.calculateTax();
      }
    },
    removeItem(item) {
      const index = this.cart.items.findIndex(i => i.id === item.id);
      if (index !== -1) {
        this.cart.items.splice(index, 1);
        this.saveCartToLocalStorage();
        this.calculateShipping();
        this.calculateTax();
        notificationService.info('Article retiré du panier');
      }
    },
    clearCart() {
      if (confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
        this.cart.items = [];
        this.cart.discount_applied = false;
        this.cart.discount_code = '';
        this.discount = 0;
        this.saveCartToLocalStorage();
        this.calculateShipping();
        this.calculateTax();
        notificationService.info('Votre panier a été vidé');
      }
    },
    applyPromoCode() {
      this.promoError = '';
      
      // Simuler la vérification du code promo (à remplacer par un appel API)
      if (this.promoCode.toLowerCase() === 'planty10') {
        this.discount = this.subtotal * 0.10; // 10% de réduction
        this.cart.discount_applied = true;
        this.cart.discount_code = this.promoCode;
        this.saveCartToLocalStorage();
        notificationService.success('Code promo appliqué avec succès !');
        this.promoCode = '';
      } else {
        this.promoError = 'Code promo invalide';
        notificationService.error('Code promo invalide');
      }
    },
    removePromoCode() {
      this.cart.discount_applied = false;
      this.cart.discount_code = '';
      this.discount = 0;
      this.saveCartToLocalStorage();
      notificationService.info('Code promo retiré');
    },
    formatPrice(price) {
      return price.toFixed(2).replace('.', ',');
    }
  }
}
</script>