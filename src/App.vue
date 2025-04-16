<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 text-gray-800 flex flex-col">
    <!-- HEADER -->
    <HeaderComponent v-if="showHeader" />

    <!-- MAIN -->
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>

    <!-- FOOTER -->
    <FooterComponent v-if="showFooter" />
  </div>
</template>



<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'App',
  components: {
    HeaderComponent: defineAsyncComponent(() => import('./components/HeaderComponent.vue')),
    FooterComponent: defineAsyncComponent(() => import('./components/FooterComponent.vue')),
  },
  data() {
    return {
      showHeader: true,
      showFooter: true,
    };
  },
  watch: {
    $route(to) {
      // Mise à jour de l'affichage du header et footer
      this.showHeader = to.meta.showHeader !== undefined ? to.meta.showHeader : true;
      this.showFooter = to.meta.showFooter !== undefined ? to.meta.showFooter : true;
    },
  },
  created() {
    // Initialiser les valeurs en fonction de la route actuelle
    this.showHeader = this.$route.meta.showHeader !== undefined ? this.$route.meta.showHeader : true;
    this.showFooter = this.$route.meta.showFooter !== undefined ? this.$route.meta.showFooter : true;
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
