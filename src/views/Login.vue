<template>
  <div class="min-h-screen flex items-center justify-center">
    <div
      class="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md transform transition-all duration-500 hover:rotate-[1deg] hover:shadow-3xl"
      style="perspective: 1200px;">
      <div class="text-center mb-8">
        <img src="@/assets/plant-logo.png" alt="Logo" class="mx-auto w-28 h-28 rounded-3xl mb-3" />
        <h2 class="text-3xl font-extrabold text-green-700">Connexion sécurisée</h2>
        <p class="text-gray-500 text-sm">Bienvenue dans votre espace professionnel 🌱</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6 animate-fade-in">
        <div>
          <label class="block text-sm font-medium text-gray-700">Adresse e-mail</label>
          <div class="mt-1 relative">
            <input type="email" v-model="email" required
              class="pl-10 pr-4 py-2 w-full border rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="ex: hello@planty.com" />
            <span class="absolute left-3 top-2.5 text-gray-400">
              📧
            </span>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Mot de passe</label>
          <div class="mt-1 relative">
            <input :type="showPassword ? 'text' : 'password'" v-model="password" required
              class="pl-10 pr-10 py-2 w-full border rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="••••••••" />
            <span class="absolute left-3 top-2.5 text-gray-400">🔒</span>
            <span class="absolute right-3 top-2.5 text-sm cursor-pointer text-green-500" @click="togglePassword">
              {{ showPassword ? '🙈' : '👁️' }}
            </span>
          </div>
        </div>

        <button type="submit"
          class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold shadow-md transition duration-300">
          Se connecter
        </button>
        <!-- Add this password reset section -->
        <div class="text-center mt-4">
          <router-link to="/password-reset" class="text-sm text-green-600 hover:underline cursor-pointer">
            Mot de passe oublié ?
          </router-link>
        </div>
      </form>

      <p class="text-center text-sm text-gray-500 mt-6">
        Vous n'avez pas encore de compte ?
        <router-link to="/register" class="text-green-600 hover:underline font-medium">Inscrivez-vous</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      isLoading: false,
      error: null
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    async handleLogin() {
      this.isLoading = true
      this.error = null

      try {
        // Remplacez l'URL par celle de votre backend
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: this.email,
          password: this.password
        })

        // Stockage du token dans le localStorage
        if (response.data.token) {
          localStorage.setItem('token', response.data.token)
        }

        // Redirection vers le tableau de bord
        this.$router.push('/dashboard')
      } catch (err) {
        this.error = err.response?.data?.message || "Une erreur est survenue lors de la connexion."
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
/* Animation d’apparition douce */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

/* Effet d’ombre plus profonde au hover */
.hover\\:shadow-3xl:hover {
  box-shadow: 0 20px 40px rgba(0, 128, 0, 0.2);
}
</style>