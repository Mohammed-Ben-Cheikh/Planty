<template>
  <main class="flex-grow container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
    <div class="animate-fade-in">
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
          Chargement de la réservation...
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

      <!-- Order Content -->
      <div v-else class="bg-white shadow overflow-hidden rounded-lg">
        <!-- Order header with status -->
        <div class="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <div class="flex flex-wrap justify-between items-center">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">
                Réservation #{{ order.reference_no || order.id }}
              </h1>
              <p class="mt-1 text-sm text-gray-500">Passée le {{ formatDate(order.created_at) }}</p>
            </div>
            <div class="mt-4 sm:mt-0">
              <span :class="getStatusBadgeClass(order.status)" class="text-sm">
                {{ getStatusLabel(order.status) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Order details -->
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
            <div>
              <h3 class="text-sm font-medium text-gray-500">Informations de contact</h3>
              <div class="mt-2">
                <p class="text-sm text-gray-900 font-medium">{{ order.user?.name }}</p>
                <p class="text-sm text-gray-900">{{ order.user?.email }}</p>
                <p v-if="order.user?.phone" class="text-sm text-gray-900">
                  {{ order.user?.phone }}
                </p>
              </div>
            </div>

            <div>
              <h3 class="text-sm font-medium text-gray-500">Informations de livraison</h3>
              <div class="mt-2">
                <p v-if="order.address" class="text-sm text-gray-900">{{ order.address }}</p>
                <p v-if="order.city" class="text-sm text-gray-900">
                  {{ order.postal_code }} {{ order.city }}
                </p>
                <p v-if="order.country" class="text-sm text-gray-900">{{ order.country }}</p>
                <p v-if="order.shipping_method" class="text-sm text-gray-900 font-medium mt-2">
                  Méthode de livraison: {{ order.shipping_method }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Order items -->
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg font-medium text-gray-900">Articles</h3>

          <div class="mt-4">
            <div class="flow-root">
              <ul class="-my-6 divide-y divide-gray-200">
                <li v-for="(item, index) in order.items" :key="index" class="py-6 flex">
                  <div class="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                    <img
                      v-if="item.image"
                      :src="item.image"
                      :alt="item.name"
                      class="w-full h-full object-cover"
                    />
                    <div
                      v-else
                      class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>

                  <div class="ml-4 flex-1 flex flex-col">
                    <div>
                      <div class="flex justify-between text-base font-medium text-gray-900">
                        <h4>{{ item.name }}</h4>
                        <p class="ml-4">
                          {{
                            (item.quantity * parseFloat(item.price.replace(',', '.'))).toFixed(2)
                          }}€
                        </p>
                      </div>
                      <p v-if="item.species" class="mt-1 text-sm text-gray-500">
                        {{ item.species }}
                      </p>
                    </div>
                    <div class="flex-1 flex items-end justify-between text-sm">
                      <p class="text-gray-500">Qté {{ item.quantity }}</p>
                      <p class="text-gray-500">{{ item.price }}€ l'unité</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Order summary -->
        <div class="px-4 py-5 sm:px-6 bg-gray-50 border-t border-gray-200">
          <div class="flex justify-between text-base font-medium text-gray-900 mb-3">
            <p>Sous-total</p>
            <p>{{ order.subtotal || order.total }}€</p>
          </div>
          <div v-if="order.shipping_cost" class="flex justify-between text-sm text-gray-600 mb-3">
            <p>Livraison</p>
            <p>{{ order.shipping_cost }}€</p>
          </div>
          <div v-if="order.tax" class="flex justify-between text-sm text-gray-600 mb-3">
            <p>Taxes</p>
            <p>{{ order.tax }}€</p>
          </div>
          <div v-if="order.discount" class="flex justify-between text-sm text-green-600 mb-3">
            <p>Réduction</p>
            <p>-{{ order.discount }}€</p>
          </div>
          <div
            class="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200"
          >
            <p>Total</p>
            <p>{{ order.total }}€</p>
          </div>
        </div>

        <!-- Order actions -->
        <div
          class="px-4 py-4 sm:px-6 flex flex-wrap gap-3 justify-between items-center border-t border-gray-200"
        >
          <div>
            <router-link
              to="/reservations"
              class="inline-flex items-center text-sm text-green-600 hover:text-green-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              Retour aux réservations
            </router-link>
          </div>

          <div class="space-x-3">
            <!-- Cancel button -->
            <button
              v-if="order.status === 'pending'"
              @click="cancelOrder"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Annuler la réservation
            </button>

            <!-- Print invoice -->
            <button
              @click="printInvoice"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="-ml-1 mr-2 h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Imprimer la facture
            </button>
          </div>
        </div>
      </div>

      <!-- Order status timeline -->
      <div
        v-if="order && order.history && order.history.length > 0"
        class="mt-8 bg-white shadow overflow-hidden rounded-lg"
      >
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900">Suivi de commande</h2>
        </div>
        <div class="px-4 py-5 sm:px-6">
          <ol class="relative border-l border-gray-200 ml-4">
            <li v-for="(event, index) in order.history" :key="index" class="mb-10 ml-6">
              <span
                class="absolute flex items-center justify-center w-6 h-6 bg-green-100 rounded-full -left-3 ring-8 ring-white"
              >
                <svg
                  class="w-3 h-3 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
              <h3 class="font-medium text-gray-900">{{ getStatusLabel(event.status) }}</h3>
              <time class="block mb-2 text-sm font-normal leading-none text-gray-500">{{
                formatDatetime(event.timestamp)
              }}</time>
              <p v-if="event.note" class="text-sm text-gray-700">{{ event.note }}</p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import OrderService from '@/services/order.service'
import notificationService from '@/services/notification/notification.service'

export default {
  name: 'ReservationDetail',
  data() {
    return {
      order: {},
      isLoading: true,
      error: null,
    }
  },
  async mounted() {
    await this.loadOrder()
  },
  methods: {
    async loadOrder() {
      const slug = this.$route.params.slug

      try {
        const response = await OrderService.getOrderBySlug(slug)
        this.order = response.data
      } catch (err) {
        this.error =
          err.response?.data?.message ||
          'Une erreur est survenue lors du chargement de la réservation.'
      } finally {
        this.isLoading = false
      }
    },

    async cancelOrder() {
      if (confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
        try {
          await OrderService.updateOrderStatus(this.order.slug || this.order.id, 'cancelled')

          // Mettre à jour l'ordre localement
          this.order.status = 'cancelled'

          // Ajouter à l'historique si disponible
          if (this.order.history) {
            this.order.history.push({
              status: 'cancelled',
              timestamp: new Date().toISOString(),
              note: 'Annulée par le client',
            })
          }

          notificationService.success('Votre réservation a été annulée avec succès.')
        } catch (err) {
          notificationService.error(
            err.response?.data?.message || "Impossible d'annuler cette réservation.",
          )
        }
      }
    },

    printInvoice() {
      window.print()
    },

    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(date)
    },

    formatDatetime(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date)
    },

    getStatusLabel(status) {
      switch (status) {
        case 'pending':
          return 'En attente'
        case 'confirmed':
          return 'Confirmée'
        case 'processing':
          return 'En préparation'
        case 'shipped':
          return 'Expédiée'
        case 'completed':
          return 'Terminée'
        case 'cancelled':
          return 'Annulée'
        default:
          return status || ''
      }
    },

    getStatusBadgeClass(status) {
      const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium'

      switch (status) {
        case 'pending':
          return `${baseClasses} bg-yellow-100 text-yellow-800`
        case 'confirmed':
          return `${baseClasses} bg-blue-100 text-blue-800`
        case 'processing':
          return `${baseClasses} bg-indigo-100 text-indigo-800`
        case 'shipped':
          return `${baseClasses} bg-purple-100 text-purple-800`
        case 'completed':
          return `${baseClasses} bg-green-100 text-green-800`
        case 'cancelled':
          return `${baseClasses} bg-red-100 text-red-800`
        default:
          return `${baseClasses} bg-gray-100 text-gray-800`
      }
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

@media print {
  body * {
    visibility: hidden;
  }

  main,
  main * {
    visibility: visible;
  }

  main {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }

  /* Hide elements not needed in print */
  button,
  .order-actions {
    display: none !important;
  }
}
</style>
