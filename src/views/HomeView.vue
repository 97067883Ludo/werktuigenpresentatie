<script setup>
</script>

<template>
  <div class="flex flex-wrap">
    <div  class="flex flex-wrap h-full w-full">
    <div class="w-1/2 h-1/2 flex justify-center items-center">
      <router-link class=" bg-blue-500 text-white rounded" to="/melken">
        <div>
          <img src="https://delaarman.nl/wp-content/uploads/2024/02/melken-1.jpg" alt="Afbeelding Melken" class="rounded h-30 w-30">
          <h2 class="flex justify-center font-bold text-xl">Melken</h2>
        </div>
      </router-link>
    </div>
    <div class="w-1/2 h-1/2 flex justify-center items-center">
      <router-link class="bg-blue-500 text-white rounded flex" to="/Aardappel-stokkenrooier"><div>
          <img src="https://delaarman.nl/wp-content/uploads/2024/02/Aardappel-stokkenrooier-300x272.jpg" alt="Afbeelding Aardappel-stokkenrooier" class="rounded h-30 w-30">
          <h2 class="flex justify-center font-bold text-xl"> Aardappel-stokkenrooier</h2>
        </div>
      </router-link>
    </div>
    <div class="w-1/2 h-1/2 flex justify-center items-center">
      <router-link class="p-4 bg-blue-500 text-white rounded-2xl" to="/about">Melken</router-link>
    </div>
    <div class="w-1/2 h-1/2 flex justify-center items-center">
      <router-link class="p-4 bg-blue-500 text-white rounded-2xl" to="/about">Melken</router-link>
    </div>
  </div>
  </div>
</template>
