<script setup>

</script>

<template>
    <div class="flex justify-between items-center mx-14">
      <h1 class="text-2xl">Items:</h1>
      <router-link class="bg-green-500 p-3 text-white rounded-lg cursor-pointer" :to="{ path: '/admin/category/new' }">Item toevoegen +</router-link>
    </div>

</template>

