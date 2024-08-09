<script setup>
  import {reactive} from "vue";
  import Router from "@/router/index.js";

  const props = defineProps(['admin', 'activePage'])

  const pageMenu = reactive([
    {id: 1, name: 'Post', active: false, url: "/admin/post" },
    {id: 2, name: 'Categorieën', active: false, url: "/admin/categories" },
  ]);


  function setActivePage(pageRoute) {
    let activePage = pageMenu.filter(x => x.url === pageRoute);
    activePage.forEach((page) => {
      page.active = true;
    })

    let idlePages = pageMenu.filter(x => x.url !== pageRoute);
    idlePages.forEach((page) => {
      page.active = false;
    })
  }

  setActivePage(Router.currentRoute.value.fullPath)

</script>

<template>
  <div class="w-full p-4 text-white bg-gray-600 max-h-24 flex items-center">
    <a href="/admin" class="flex flex-row items-center">
      <img src="/logo-de-laarman.png" class="h-full p-1 bg-white rounded w-20" alt="logo">
      <h1 v-if="props.admin" class="text-4xl text-red-600 ml-2">ADMIN</h1>
    </a>
    <div v-if="props.admin" class="h-full flex flex-row items-center ml-9 items-center">
      <div v-for="page in pageMenu" :key="page" class="w-fit flex flex-col items-center">
        <RouterLink :to="page.url" class="mx-1 px-2 py-1.5 cursor-pointer " :class="page.active ? 'bg-gray-500 rounded ' : ''">
          {{page.name}}
        </RouterLink>
        <div v-if="page.active" class="p-0.5 bg-gray-400 rounded mx-0.5 w-3/4 mt-0.5">
        </div>
      </div>
    </div>
  </div>
</template>
