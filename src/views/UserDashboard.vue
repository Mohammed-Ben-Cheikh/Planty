<template>
  <div class="admin-dashboard flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="sidebar w-64 bg-white shadow-lg flex flex-col fixed h-full z-10">
      <div class="p-4 border-b flex items-center space-x-3">
        <img src="@/assets/plant-logo.png" alt="Logo" class="w-10 h-10 rounded-lg" />
        <h1 class="text-xl font-bold text-green-700">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800">Planty</span> 
          <span>Admin</span>
        </h1>
      </div>
      
      <nav class="flex-grow p-4">
        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Menu principal</p>
        <ul class="space-y-1">
          <li v-for="(item, index) in menuItems" :key="index" @click="activeSection = item.section"
              :class="{'bg-green-50 text-green-700': activeSection === item.section}"
              class="rounded-lg hover:bg-green-50 cursor-pointer transition-colors duration-200">
            <a class="px-4 py-3 flex items-center space-x-3">
              <span class="text-lg" v-html="item.icon"></span>
              <span>{{ item.title }}</span>
            </a>
          </li>
        </ul>

        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-8">Paramètres</p>
        <ul class="space-y-1">
          <li v-for="(item, index) in settingsItems" :key="index"
              class="rounded-lg hover:bg-green-50 cursor-pointer transition-colors duration-200">
            <a class="px-4 py-3 flex items-center space-x-3">
              <span class="text-lg" v-html="item.icon"></span>
              <span>{{ item.title }}</span>
            </a>
          </li>
        </ul>
      </nav>

      <div class="p-4 border-t">
        <div class="flex items-center space-x-3">
          <div class="bg-green-100 p-2 rounded-full">
            <span class="text-green-700">👤</span>
          </div>
          <div>
            <p class="font-medium text-sm">Admin Planty</p>
            <p class="text-xs text-gray-500">admin@planty.fr</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-grow ml-64 p-6">
      <!-- Header -->
      <header class="bg-white p-4 rounded-xl shadow-sm mb-6 flex justify-between items-center">
        <h1 class="text-xl font-semibold text-gray-800">
          {{ sectionTitle }}
        </h1>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <input type="text" placeholder="Rechercher..." 
                  class="bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-60" />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div class="relative">
            <span class="bg-red-500 text-white rounded-full w-5 h-5 absolute -top-1 -right-1 flex items-center justify-center text-xs">3</span>
            <button class="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <!-- Dashboard Stats -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div v-for="(stat, index) in stats" :key="index" 
            class="bg-white p-5 rounded-xl shadow-sm hover:shadow transition-shadow duration-300">
          <div class="flex justify-between">
            <div>
              <p class="text-gray-500 text-sm">{{ stat.title }}</p>
              <p class="text-2xl font-bold text-gray-800">{{ stat.value }}</p>
              <p class="text-xs mt-1" :class="stat.trend === 'up' ? 'text-green-600' : 'text-red-600'">
                <span v-if="stat.trend === 'up'">↑</span>
                <span v-else>↓</span>
                {{ stat.change }} depuis le mois dernier
              </p>
            </div>
            <div :class="`p-3 rounded-xl ${stat.bgColor}`">
              <span :class="`text-xl ${stat.iconColor}`" v-html="stat.icon"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Plants Management -->
      <div v-if="activeSection === 'plants'" class="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-800">Gestion des plantes</h2>
          <button class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Ajouter une plante
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plante</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendues</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="plant in plants" :key="plant.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-10 w-10 rounded-lg overflow-hidden">
                      <img :src="plant.image" :alt="plant.name" class="h-full w-full object-cover" />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ plant.name }}</div>
                      <div class="text-sm text-gray-500">{{ plant.species }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ plant.category }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ plant.price }} €</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                    ${plant.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`">
                    {{ plant.stock }} en stock
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ plant.sold }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button class="text-indigo-600 hover:text-indigo-900">Modifier</button>
                  <button class="text-red-600 hover:text-red-900">Supprimer</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-6 flex justify-between items-center">
          <p class="text-sm text-gray-500">Affichage de 1 à 8 sur 24 plantes</p>
          <div class="flex space-x-1">
            <button class="px-3 py-1 text-sm bg-gray-100 rounded-md">Précédent</button>
            <button class="px-3 py-1 text-sm bg-green-600 text-white rounded-md">1</button>
            <button class="px-3 py-1 text-sm bg-gray-100 rounded-md">2</button>
            <button class="px-3 py-1 text-sm bg-gray-100 rounded-md">3</button>
            <button class="px-3 py-1 text-sm bg-gray-100 rounded-md">Suivant</button>
          </div>
        </div>
      </div>

      <!-- Orders Management -->
      <div v-if="activeSection === 'orders'" class="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-800">Gestion des commandes</h2>
          <div class="flex space-x-2">
            <select class="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>Toutes les commandes</option>
              <option>En attente</option>
              <option>Expédiées</option>
              <option>Livrées</option>
              <option>Annulées</option>
            </select>
            <button class="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
              Exporter
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"># Commande</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{{ order.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ order.customer }}</div>
                  <div class="text-sm text-gray-500">{{ order.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.date }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{{ order.amount }} €</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                    ${statusColors[order.status].bg} ${statusColors[order.status].text}`">
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button class="text-indigo-600 hover:text-indigo-900">Voir</button>
                  <button class="text-green-600 hover:text-green-900">Mettre à jour</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-6 flex justify-between items-center">
          <p class="text-sm text-gray-500">Affichage de 1 à 8 sur 45 commandes</p>
          <div class="flex space-x-1">
            <button class="px-3 py-1 text-sm bg-gray-100 rounded-md">Précédent</button>
            <button class="px-3 py-1 text-sm bg-green-600 text-white rounded-md">1</button>
            <button class="px-3 py-1 text-sm bg-gray-100 rounded-md">2</button>
            <button class="px-3 py-1 text-sm bg-gray-100 rounded-md">3</button>
            <button class="px-3 py-1 text-sm bg-gray-100 rounded-md">Suivant</button>
          </div>
        </div>
      </div>

      <!-- Users Management -->
      <div v-if="activeSection === 'users'" class="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-800">Gestion des utilisateurs</h2>
          <button class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Ajouter un utilisateur
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateur</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date d'inscription</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commandes</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center text-gray-500 font-medium">
                      {{ user.initials }}
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                    ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`">
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.joinDate }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.orderCount }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button class="text-indigo-600 hover:text-indigo-900">Modifier</button>
                  <button class="text-red-600 hover:text-red-900">Désactiver</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-6 flex justify-between items-center">
          <p class="text-sm text-gray-500">Affichage de 1 à 8 sur 156 utilisateurs</p>
          <div class="flex space-x-1">
            <button class="px-3 py-1 text-sm bg-gray-100 rounded-md">Précédent</button>
            <button class="px-3 py-1 text-sm bg-green-600 text-white rounded-md">1</button>
            <button class="px-3 py-1 text-sm bg-gray-100 rounded-md">2</button>
            <button class="px-3 py-1 text-sm bg-gray-100 rounded-md">3</button>
            <button class="px-3 py-1 text-sm bg-gray-100 rounded-md">Suivant</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
      activeSection: 'overview',
      menuItems: [
        { title: 'Vue d\'ensemble', icon: '📊', section: 'overview' },
        { title: 'Plantes', icon: '🪴', section: 'plants' },
        { title: 'Commandes', icon: '📦', section: 'orders' },
        { title: 'Utilisateurs', icon: '👤', section: 'users' },
        { title: 'Statistiques', icon: '📈', section: 'stats' },
        { title: 'lolo', icon: '📈', section: 'haaa' },
      ],
      settingsItems: [
        { title: 'Paramètres', icon: '⚙️' },
        { title: 'Mon compte', icon: '👤' },
        { title: 'Déconnexion', icon: '🚪' }
      ],
      stats: [
        {
          title: 'Ventes totales',
          value: '14,854 €',
          change: '+12.5%',
          trend: 'up',
          icon: '💰',
          bgColor: 'bg-amber-100',
          iconColor: 'text-amber-800'
        },
        {
          title: 'Commandes',
          value: '324',
          change: '+8.2%',
          trend: 'up',
          icon: '📦',
          bgColor: 'bg-blue-100',
          iconColor: 'text-blue-800'
        },
        {
          title: 'Nouveaux clients',
          value: '42',
          change: '+2.5%',
          trend: 'up',
          icon: '👥',
          bgColor: 'bg-purple-100',
          iconColor: 'text-purple-800'
        },
        {
          title: 'Stock Total',
          value: '517',
          change: '-4.3%',
          trend: 'down',
          icon: '🪴',
          bgColor: 'bg-green-100',
          iconColor: 'text-green-800'
        }
      ],
      plants: [
        {
          id: 1,
          name: 'Monstera Deliciosa',
          species: 'Monstera',
          category: 'Plantes d\'intérieur',
          price: '29.99',
          stock: 24,
          sold: 87,
          image: 'https://images.unsplash.com/photo-1614594075952-b01e3e733000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 2,
          name: 'Ficus Lyrata',
          species: 'Ficus',
          category: 'Plantes d\'intérieur',
          price: '49.99',
          stock: 12,
          sold: 53,
          image: 'https://images.unsplash.com/photo-1597055181449-b9efc7a9afed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 3,
          name: 'Calathea Orbifolia',
          species: 'Calathea',
          category: 'Plantes à feuillage',
          price: '34.99',
          stock: 3,
          sold: 42,
          image: 'https://images.unsplash.com/photo-1602923668104-8d8f1b1df1c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 4,
          name: 'Aloe Vera',
          species: 'Aloe',
          category: 'Succulentes',
          price: '14.99',
          stock: 37,
          sold: 104,
          image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 5,
          name: 'Pothos Doré',
          species: 'Epipremnum aureum',
          category: 'Plantes grimpantes',
          price: '19.99',
          stock: 18,
          sold: 68,
          image: 'https://images.unsplash.com/photo-1613737693016-7a41c3f79cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
      ],
      orders: [
        {
          id: 'ORD7291',
          customer: 'Sophie Martin',
          email: 'sophie@example.com',
          date: '09 Avr, 2025',
          amount: '79.98',
          status: 'Livré',
        },
        {
          id: 'ORD7290',
          customer: 'Thomas Bernard',
          email: 'thomas@example.com',
          date: '08 Avr, 2025',
          amount: '124.50',
          status: 'Expédié',
        },
        {
          id: 'ORD7289',
          customer: 'Émilie Durand',
          email: 'emilie@example.com',
          date: '08 Avr, 2025',
          amount: '56.97',
          status: 'En attente',
        },
        {
          id: 'ORD7288',
          customer: 'Lucas Petit',
          email: 'lucas@example.com',
          date: '07 Avr, 2025',
          amount: '89.99',
          status: 'Expédié',
        },
        {
          id: 'ORD7287',
          customer: 'Léa Rousseau',
          email: 'lea@example.com',
          date: '06 Avr, 2025',
          amount: '34.99',
          status: 'Annulé',
        }
      ],
      statusColors: {
        'En attente': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
        'Expédié': { bg: 'bg-blue-100', text: 'text-blue-800' },
        'Livré': { bg: 'bg-green-100', text: 'text-green-800' },
        'Annulé': { bg: 'bg-red-100', text: 'text-red-800' }
      },
      users: [
        {
          id: 1,
          name: 'Sophie Martin',
          email: 'sophie@example.com',
          role: 'Client',
          joinDate: '15 Jan, 2025',
          orderCount: 6,
          initials: 'SM'
        },
        {
          id: 2,
          name: 'Thomas Bernard',
          email: 'thomas@example.com',
          role: 'Client',
          joinDate: '03 Fév, 2025',
          orderCount: 2,
          initials: 'TB'
        },
        {
          id: 3,
          name: 'Mohammed Ben Cheikh',
          email: 'admin@planty.fr',
          role: 'Admin',
          joinDate: '01 Jan, 2025',
          orderCount: 0,
          initials: 'MB'
        },
        {
          id: 4,
          name: 'Émilie Durand',
          email: 'emilie@example.com',
          role: 'Client',
          joinDate: '27 Fév, 2025',
          orderCount: 3,
          initials: 'ED'
        },
        {
          id: 5,
          name: 'Lucas Petit',
          email: 'lucas@example.com',
          role: 'Client',
          joinDate: '15 Mars, 2025',
          orderCount: 1,
          initials: 'LP'
        }
      ]
    }
  },
  computed: {
    sectionTitle() {
      switch (this.activeSection) {
        case 'overview':
          return "Vue d'ensemble";
        case 'plants':
          return "Gestion des plantes";
        case 'orders':
          return "Gestion des commandes";
        case 'users':
          return "Gestion des utilisateurs";
        case 'stats':
          return "Statistiques";
        default:
          return "Tableau de bord";
      }
    }
  },
  mounted() {
    document.title = 'Administration | Planty';
  }
}
</script>

<style scoped>
.admin-dashboard {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>