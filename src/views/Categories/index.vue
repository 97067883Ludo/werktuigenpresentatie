<script setup>

import Header from "@/Components/Header.vue";
import {useCategoryStore} from "@/stores/Category.js"
import {reactive} from "vue";
import Category from "@/Components/Category.vue";

const CategoryStore = useCategoryStore();
const State = reactive({ data: [] , gettingCategories: false});

async function GetCategories() {
  State.gettingCategories = true;
  State.data = await CategoryStore.GetCategories();
  State.gettingCategories = false;
}

GetCategories();

</script>

<template>
  <Header admin="true"></Header>
  <div class="flex justify-between items-center mx-14 mt-4">
    <h1 class="text-2xl">Items:</h1>
    <router-link class="bg-green-500 p-3 text-white rounded-lg cursor-pointer" :to="{ path: '/admin/categories/new' }">Item toevoegen +</router-link>
  </div>
  <div class="flex flex-wrap mx-14" :class="State.gettingPosts ? 'justify-center' : ''">
    <router-link v-if="!State.gettingPosts" v-for="item in State.data" :to="{path: '/admin/categories/' + item.id }" class="mr-2">
      <Category
          :name="item.name"
          :id="item.id"
      />
    </router-link>
    <div v-else class="flex flex-col justify-center h-full">
      <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" class="animate-spin" fill="#5f6368"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z"/></svg>
      data ophalen
    </div>

    <div v-if="State.data.length === 0 && !State.gettingCategories" class="flex flex-col justify-center h-full w-full">
      <div class="flex flex-col items-center mt-40">
        <svg xmlns="http://www.w3.org/2000/svg" height="80px" viewBox="0 -960 960 960" width="80px" fill="#5f6368"><path d="m260-520 220-360 220 360H260ZM700-80q-75 0-127.5-52.5T520-260q0-75 52.5-127.5T700-440q75 0 127.5 52.5T880-260q0 75-52.5 127.5T700-80Zm-580-20v-320h320v320H120Zm580-60q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-500-20h160v-160H200v160Zm202-420h156l-78-126-78 126Zm78 0ZM360-340Zm340 80Z"/></svg>
        <p class="text-4xl">
          Geen items...
        </p>
      </div>
    </div>
  </div>

</template>
