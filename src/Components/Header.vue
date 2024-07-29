<script setup>
  const props = defineProps(['admin'])
</script>

<template>
  <div class="w-full p-4 text-white bg-gray-600 max-h-24 flex items-center">
    <a href="/admin" class="flex flex-row">
      <img src="/logo-de-laarman.png" class="h-full p-1 bg-white rounded w-20" alt="logo">
      <h1 v-if="props.admin" class="text-4xl text-red-600 ml-2">ADMIN</h1>
    </a>
  </div>
</template>
