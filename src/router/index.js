import { createRouter, createWebHistory } from 'vue-router'
import AuthService from '../services/auth.service'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
      meta: {
        title: 'Accueil',
      },
    },
    // Routes d'authentification
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: {
        title: 'Connexion',
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
      meta: {
        title: 'Inscription',
      },
    },
    {
      path: '/password-reset',
      name: 'password-reset',
      component: () => import('../views/PasswordReset.vue'),
      meta: {
        title: 'Réinitialisation du mot de passe',
      },
    },
    {
      path: '/account/activate',
      name: 'activate-account',
      component: () => import('../views/ActivateAccount.vue'),
      meta: {
        title: 'Activation du compte',
      },
    },
    // Routes pour le tableau de bord admin
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/adminDashboard.vue'),
      meta: {
        title: 'Tableau de bord',
        showHeader: false,
        showFooter: false,
      },
      beforeEnter: (to, from, next) => {
        if (AuthService.isAdmin()) {
          next()
        } else {
          next('/login')
        }
      },
    },
    // Routes pour les catégories
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/Categories.vue'),
      meta: {
        title: 'Catégories',
      },
    },
    {
      path: '/categories/:slug',
      name: 'category-detail',
      component: () => import('../views/CategoryDetail.vue'),
      meta: {
        title: 'Détail de la catégorie',
      },
    },
    // Routes pour les plantes
    {
      path: '/plants',
      name: 'plants',
      component: () => import('../views/Plants.vue'),
      meta: {
        title: 'Plantes',
      },
    },
    {
      path: '/plants/:slug',
      name: 'plant-detail',
      component: () => import('../views/PlantDetail.vue'),
      meta: {
        title: 'Détail de la plante',
      },
    },
    // Routes pour les réservations
    {
      path: '/reservations',
      name: 'reservations',
      component: () => import('../views/Reservations.vue'),
      meta: {
        title: 'Mes réservations',
      },
      beforeEnter: (to, from, next) => {
        if (AuthService.isAuthenticated()) {
          next()
        } else {
          next('/login')
        }
      },
    },
    {
      path: '/reservations/:slug',
      name: 'reservation-detail',
      component: () => import('../views/ReservationDetail.vue'),
      meta: {
        title: 'Détail de la réservation',
      },
      beforeEnter: (to, from, next) => {
        if (AuthService.isAuthenticated()) {
          next()
        } else {
          next('/login')
        }
      },
    },
    // Page de statistiques pour les administrateurs
    {
      path: '/statistics',
      name: 'statistics',
      component: () => import('../views/Statistics.vue'),
      meta: {
        title: 'Statistiques',
      },
      beforeEnter: (to, from, next) => {
        if (AuthService.isAdmin()) {
          next()
        } else {
          next('/login')
        }
      },
    },
    // Page 404 pour les routes qui n'existent pas
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue'),
      meta: {
        title: 'Page non trouvée',
      },
    },
  ],
})

// Met à jour le titre de la page chaque fois que la route change
router.afterEach((to) => {
  // Mise à jour du titre
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'Planty - Boutique de plantes' // Titre par défaut
  }
})

export default router
