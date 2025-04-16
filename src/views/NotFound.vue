<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1>404</h1>
      <h2>Page non trouvée</h2>
      <p>La page que vous recherchez n'existe pas ou a été déplacée.</p>
      <router-link to="/" class="home-button">Retour à l'accueil</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  text-align: center;
}

.not-found-content {
  max-width: 600px;
  padding: 2rem;
}

h1 {
  font-size: 6rem;
  color: #4caf50;
  margin-bottom: 1rem;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  margin-bottom: 2rem;
  color: #666;
}

.home-button {
  display: inline-block;
  background-color: #4caf50;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.home-button:hover {
  background-color: #388e3c;
}
</style>