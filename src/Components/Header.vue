<script setup>
  const props = defineProps(['admin', 'pages'])

  const pageMenu = props.pages;
</script>

<template>
  <div class="w-full p-4 text-white bg-gray-600 max-h-24 flex items-center">
    <a href="/admin" class="flex flex-row items-center">
      <img src="/logo-de-laarman.png" class="h-full p-1 bg-white rounded w-20" alt="logo">
      <h1 v-if="props.admin" class="text-4xl text-red-600 ml-2">ADMIN</h1>
    </a>
    <div v-if="props.admin" class="h-full flex flex-row items-center ml-9 items-center">
      <div v-for="page in pageMenu" :key="page" class="w-fit flex flex-col items-center" @click="$emit('change-page', page)">
        <div class="mx-1 px-2 py-1.5 cursor-pointer " :class="page.active ? 'bg-gray-500 rounded ' : ''">
          {{page.name}}
        </div>
        <div v-if="page.active" class="p-0.5 bg-gray-400 rounded mx-0.5 w-3/4 mt-0.5">

        </div>
      </div>
    </div>
  </div>
</template>
