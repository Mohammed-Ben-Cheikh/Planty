import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
      meta: {
        title: 'Accueil',
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: {
        title: 'Connexion',
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
      meta: {
        title: 'Inscription',
      }
    },
    {
      path: '/password-reset',
      name: 'password-reset',
      component: () => import('../views/PasswordReset.vue'),
      meta: {
        title: 'Réinitialisation du mot de passe',
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/UserDashboard.vue'),
      meta: {
        title: 'Tableau de bord',
        showHeader: false, // Afficher le header pour cette route
        showFooter: false  // Afficher le footer pour cette route
      }
    }
  ],
})

// Met à jour le titre de la page chaque fois que la route change
router.afterEach((to) => {
  // Mise à jour du titre
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = 'Planty - Boutique de plantes';  // Titre par défaut
  }
});

export default router;
