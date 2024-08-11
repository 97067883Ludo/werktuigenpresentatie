<script setup>
import {useRoute} from "vue-router";
import Header from "@/Components/Header.vue";

const route = useRoute()
let id = route.params.id

</script>

<template>
  <Header admin="true"></Header>
  <router-link :to="{path: '/admin/categories'}" class="flex mt-4 mx-14">
    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#5f6368"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
    <p class="text-3xl text-[#5f6368]">Terug</p>
  </router-link>
  <div class="flex mt-4 mx-14 justify-center">
      <div class="p-4 border-4 border-gray-300 rounded-xl">

      </div>
  </div>

</template>
