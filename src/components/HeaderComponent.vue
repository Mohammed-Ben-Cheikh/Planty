<template>
  <!-- HEADER ROUNDED -->
  <header
    class="bg-green-100/95 backdrop-blur-md shadow-lg rounded-xl mx-auto max-w-7xl w-[95%] mt-4 px-6 py-4 flex justify-between items-center sticky top-4 z-50 transition-all duration-300"
    :class="{ 'shadow-xl bg-green-100/98': scrolled }">
    <div class="flex items-center space-x-3">
      <img src="@/assets/plant-logo.png" alt="Logo"
        class="w-14 h-14 rounded-xl shadow-sm hover:shadow-md transition-all duration-300" />
      <h1 class="text-2xl font-bold text-green-700">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800">Planty</span>
        <span class="animate-pulse">🌱</span>
      </h1>
    </div>

    <!-- Desktop Navigation -->
    <nav class="space-x-6 text-sm font-medium hidden md:block">
      <!-- Main Navigation Items -->
      <router-link v-for="item in mainNavItems" :key="item.path" :to="item.path"
        class="px-3 py-2 rounded-lg transition-all duration-300"
        :class="[$route.path === item.path ? 'text-green-700 font-semibold bg-green-100' : 'text-gray-600 hover:text-green-600 hover:bg-green-50']">
        {{ item.name }}
      </router-link>

      <!-- Separator -->
      <span class="inline-block mx-2 h-4 w-px bg-gray-300"></span>

      <!-- Auth Navigation Items -->
      <router-link v-for="item in authNavItems" :key="item.path" :to="item.path"
        class="px-3 py-2 rounded-lg transition-all duration-300 border border-green-600"
        :class="[$route.path === item.path ? 'text-white bg-green-600' : 'text-green-600 hover:bg-green-50']">
        {{ item.name }}
      </router-link>
    </nav>

    <!-- Mobile Menu Button -->
    <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden text-gray-600 focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16" />
        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </header>

  <!-- Mobile Navigation -->
  <div v-if="mobileMenuOpen" class="fixed inset-0 z-40 bg-black bg-opacity-50" @click="mobileMenuOpen = false"></div>
  <div v-show="mobileMenuOpen"
    class="fixed right-0 top-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
    <div class="p-5">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold text-green-700">Menu</h2>
        <button @click="mobileMenuOpen = false" class="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="flex flex-col space-y-3">
        <router-link v-for="item in mainNavItems" :key="item.path" :to="item.path"
          class="px-3 py-2 rounded-lg transition-all duration-300"
          :class="[$route.path === item.path ? 'text-green-700 font-semibold bg-green-100' : 'text-gray-600 hover:text-green-600']"
          @click="mobileMenuOpen = false">
          {{ item.name }}
        </router-link>
        <router-link v-for="item in authNavItems" :key="item.path" :to="item.path"
          class="px-3 py-2 rounded-lg transition-all duration-300"
          :class="[$route.path === item.path ? 'text-green-700 font-semibold bg-green-100' : 'text-gray-600 hover:text-green-600']"
          @click="mobileMenuOpen = false">
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      scrolled: false,
      mobileMenuOpen: false,
      mainNavItems: [
        { name: 'Accueil', path: '/' },
        { name: 'À propos', path: '/about' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Contact', path: '/contact' }
      ],
      authNavItems: [
        { name: 'Connexion', path: '/login' },
        { name: 'Inscription', path: '/register' }
      ]
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 10;
    }
  },
};

</script>
