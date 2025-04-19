<template>
  <div class="mb-10">
    <h2 class="text-xl font-semibold text-gray-800 mb-6">Nos plantes en vedette</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="plant in plants"
        :key="plant.id"
        class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:-translate-y-1"
      >
        <img :src="plant.image" :alt="plant.name" class="w-full h-48 object-cover" />
        <div class="p-4 space-y-2">
          <h3 class="text-lg font-semibold text-gray-800">{{ plant.name }}</h3>
          <p class="text-green-600 font-bold text-md">{{ plant.price }}€</p>
          <p class="text-sm text-gray-600">{{ plant.description }}</p>
          <button
            @click="addToCart(plant)"
            class="w-full mt-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlantCart',
  props: {
    plants: {
      type: Array,
      required: true,
    },
  },
  methods: {
    addToCart(plant) {
      this.$emit('add-to-cart', plant)
    },
  },
}
</script>
