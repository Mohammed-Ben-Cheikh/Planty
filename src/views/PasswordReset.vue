<template>
    <div class="min-h-screen flex items-center justify-center">
        <div class="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md transform transition-all duration-500 hover:rotate-[1deg] hover:shadow-3xl"
            style="perspective: 1200px;">
            <div class="text-center mb-8">
                <img src="@/assets/plant-logo.png" alt="Logo" class="mx-auto w-28 h-28 rounded-3xl mb-3" />
                <h2 class="text-3xl font-extrabold text-green-700">Réinitialisation du mot de passe</h2>
                <p class="text-gray-500 text-sm">Entrez votre email pour recevoir un lien de réinitialisation 🌱</p>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-6 animate-fade-in">
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

                <div v-if="message" :class="[
                    'p-4 rounded-xl',
                    isError ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                ]">
                    {{ message }}
                </div>

                <button type="submit" :disabled="isLoading"
                    class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold shadow-md transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed">
                    {{ isLoading ? 'Envoi en cours...' : 'Réinitialiser le mot de passe' }}
                </button>
            </form>

            <p class="text-center text-sm text-gray-500 mt-6">
                Retourner à la
                <router-link to="/login" class="text-green-600 hover:underline font-medium">page de
                    connexion</router-link>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PasswordReset',
    data() {
        return {
            email: '',
            message: '',
            isLoading: false,
            isError: false
        }
    },
    methods: {
        async handleSubmit() {
            this.isLoading = true
            this.message = ''

            try {
                // Ici, ajoutez votre logique pour envoyer la demande de réinitialisation
                // Par exemple, un appel API :
                // await axios.post('/api/reset-password', { email: this.email })

                this.isError = false
                this.message = 'Un email de réinitialisation a été envoyé à votre adresse.'
            } catch (error) {
                this.isError = true
                this.message = 'Une erreur est survenue. Veuillez réessayer.'
            } finally {
                this.isLoading = false
            }
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
</style>
