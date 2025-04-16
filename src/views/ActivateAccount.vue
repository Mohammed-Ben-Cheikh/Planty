<template>
    <div class="min-h-screen flex items-center justify-center">
        <div class="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md transform transition-all duration-500 hover:shadow-3xl"
            style="perspective: 1200px;">
            <div class="text-center mb-8">
                <img src="@/assets/plant-logo.png" alt="Logo" class="mx-auto w-28 h-28 rounded-3xl mb-3" />
                <h2 class="text-3xl font-extrabold text-green-700">Activation de compte</h2>
                <p v-if="isLoading" class="text-gray-500 text-sm">Activation de votre compte en cours... 🌱</p>
                <p v-else-if="isSuccess" class="text-green-500 text-sm">{{ message }}</p>
                <p v-else class="text-red-500 text-sm">{{ message }}</p>
            </div>

            <div v-if="isSuccess" class="flex justify-center">
                <router-link to="/login"
                    class="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-xl font-semibold shadow-md transition duration-300">
                    Se connecter
                </router-link>
            </div>
            <div v-else-if="!isLoading && !isSuccess" class="flex justify-center">
                <router-link to="/"
                    class="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-6 rounded-xl font-semibold shadow-md transition duration-300">
                    Retour à l'accueil
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import AuthService from '@/services/auth.service';

export default {
    name: 'ActivateAccount',
    data() {
        return {
            isLoading: true,
            isSuccess: false,
            message: ''
        };
    },
    async mounted() {
        // Récupérer le token dans l'URL
        const token = this.$route.query.token;

        if (!token) {
            this.isLoading = false;
            this.message = 'Lien d\'activation invalide. Aucun token fourni.';
            return;
        }

        try {
            // Appeler le service d'activation
            await AuthService.activateAccount(token);

            this.isSuccess = true;
            this.message = 'Votre compte a été activé avec succès ! Vous pouvez maintenant vous connecter.';
        } catch (error) {
            this.message = error.response?.data?.message || 'Une erreur est survenue lors de l\'activation de votre compte.';
        } finally {
            this.isLoading = false;
        }
    }
};
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