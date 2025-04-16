<template>
    <div class="min-h-screen flex items-center justify-center">
      <div
        class="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md transform transition-all duration-500 hover:rotate-[1deg] hover:shadow-3xl"
      >
        <div class="text-center mb-8">
            <img src="@/assets/plant-logo.png" alt="Logo" class="mx-auto w-28 h-28 rounded-3xl mb-3" />
          <h2 class="text-3xl font-extrabold text-green-700">Créer un compte</h2>
          <p class="text-gray-500 text-sm">Rejoignez notre communauté verte 🌱</p>
        </div>
  
        <form @submit.prevent="handleRegister" class="space-y-5 animate-fade-in">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nom complet</label>
            <input
              type="text"
              v-model="fullName"
              required
              placeholder="Ex: Mohammed Ben Cheikh"
              class="w-full px-4 py-2 border rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
  
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              v-model="email"
              required
              placeholder="Ex: hello@planty.com"
              class="w-full px-4 py-2 border rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
  
          <div>
            <label class="block text-sm font-medium text-gray-700">Mot de passe</label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                required
                placeholder="••••••••"
                class="w-full px-4 py-2 border rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <span
                class="absolute top-2.5 right-3 text-green-500 cursor-pointer text-sm"
                @click="togglePassword"
              >
                {{ showPassword ? '🙈' : '👁️' }}
              </span>
            </div>
          </div>
  
          <div>
            <label class="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
            <input
              type="password"
              v-model="confirmPassword"
              required
              placeholder="••••••••"
              class="w-full px-4 py-2 border rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
  
          <button
            type="submit"
            class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold shadow-md transition duration-300"
          >
            S'inscrire
          </button>
        </form>
  
        <p class="text-center text-sm text-gray-500 mt-6">
          Vous avez déjà un compte ?
          <router-link to="/login" class="text-green-600 hover:underline font-medium">Se connecter</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Register',
    data() {
      return {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false
      }
    },
    methods: {
      togglePassword() {
        this.showPassword = !this.showPassword
      },
      handleRegister() {
        if (this.password !== this.confirmPassword) {
          alert("Les mots de passe ne correspondent pas.")
          return
        }
  
        // Exemple d'envoi (remplace-le par un appel réel à ton back-end)
        console.log("Inscription:", {
          fullName: this.fullName,
          email: this.email,
          password: this.password
        })
  
        alert("Compte créé avec succès ! (simulation)")
        this.$router.push('/login')
      }
    }
  }
  </script>
  
  <style scoped>
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
  
  .hover\\:shadow-3xl:hover {
    box-shadow: 0 20px 40px rgba(0, 128, 0, 0.2);
  }
  </style>
  