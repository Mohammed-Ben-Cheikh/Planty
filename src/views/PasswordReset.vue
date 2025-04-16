<template>
    <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
            <div>
                <img src="@/assets/plant-logo.png" alt="Planty Logo" class="mx-auto h-16 w-auto">
                <h2 class="mt-6 text-center text-3xl font-extrabold text-green-800">Réinitialisation du mot de passe
                </h2>
                <p class="mt-2 text-center text-sm text-gray-600">
                    Entrez votre adresse e-mail pour recevoir un lien de réinitialisation.
                </p>
            </div>

            <!-- Email sent confirmation -->
            <div v-if="emailSent" class="bg-green-50 p-4 rounded-md">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-green-800">
                            Un e-mail contenant les instructions de réinitialisation de votre mot de passe a été envoyé
                            à {{ email }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Error message -->
            <div v-if="errorMessage && !emailSent" class="bg-red-50 p-4 rounded-md">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-red-800">
                            {{ errorMessage }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Reset Form -->
            <form v-if="!emailSent" class="mt-8 space-y-6" @submit.prevent="handleResetPassword">
                <div>
                    <label for="email-address" class="sr-only">Adresse e-mail</label>
                    <input id="email-address" name="email" type="email" autocomplete="email" required v-model="email"
                        class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="Adresse e-mail">
                </div>

                <div v-if="isConfirmReset">
                    <div>
                        <label for="password" class="sr-only">Nouveau mot de passe</label>
                        <input id="password" name="password" type="password" autocomplete="new-password" required
                            v-model="password"
                            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            placeholder="Nouveau mot de passe">
                    </div>
                    <div class="mt-3">
                        <label for="password-confirm" class="sr-only">Confirmation du mot de passe</label>
                        <input id="password-confirm" name="password-confirm" type="password" autocomplete="new-password"
                            required v-model="passwordConfirmation"
                            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            placeholder="Confirmer le mot de passe">
                    </div>
                </div>

                <div>
                    <button type="submit" :disabled="isLoading"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg v-if="!isLoading" class="h-5 w-5 text-green-500 group-hover:text-green-400"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                    clip-rule="evenodd" />
                            </svg>
                            <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                        </span>
                        {{ isConfirmReset ? 'Réinitialiser le mot de passe' : 'Envoyer le lien de réinitialisation' }}
                    </button>
                </div>
            </form>

            <div class="text-center mt-6">
                <router-link to="/login" class="text-green-600 hover:text-green-800 text-sm">
                    Retour à la page de connexion
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import AuthService from '@/services/auth.service';

export default {
    name: 'PasswordReset',
    data() {
        return {
            email: '',
            password: '',
            passwordConfirmation: '',
            emailSent: false,
            isLoading: false,
            errorMessage: '',
            isConfirmReset: false,
            token: ''
        };
    },
    mounted() {
        // Vérifier si c'est une demande de réinitialisation avec token
        this.token = this.$route.query.token;
        if (this.token) {
            this.isConfirmReset = true;
            this.email = this.$route.query.email || '';
        }
    },
    methods: {
        async handleResetPassword() {
            this.isLoading = true;
            this.errorMessage = '';

            try {
                if (this.isConfirmReset) {
                    // Étape 2: Confirmation de la réinitialisation avec le nouveau mot de passe
                    if (this.password !== this.passwordConfirmation) {
                        this.errorMessage = 'Les mots de passe ne correspondent pas.';
                        this.isLoading = false;
                        return;
                    }

                    await AuthService.confirmResetPassword(
                        this.token,
                        this.password,
                        this.passwordConfirmation
                    );

                    // Rediriger vers la page de connexion avec un message de succès
                    this.$router.push('/login');
                } else {
                    // Étape 1: Demande d'envoi du lien de réinitialisation
                    await AuthService.sendResetLink(this.email);
                    this.emailSent = true;
                }
            } catch (error) {
                this.errorMessage = error.response?.data?.message || 'Une erreur est survenue lors de la réinitialisation du mot de passe.';
            } finally {
                this.isLoading = false;
            }
        }
    }
};
</script>
