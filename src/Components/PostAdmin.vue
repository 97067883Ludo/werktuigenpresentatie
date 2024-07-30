<script setup>

import Post from "@/Components/Post.vue";
import {reactive} from "vue";
import {usePostStore} from "@/stores/Post.js";

const postsStore = usePostStore();

const State = reactive({
  AddModal: false,
  data: [],
  PostingNewItem: false,
  gettingPosts: false,
})

async function GetPosts() {
  State.gettingPosts = true;
  State.data = await postsStore.GetPosts();
  State.gettingPosts = false;
}

GetPosts();

</script>

<template>
  <div class="flex justify-between items-center mx-14">
    <h1 class="text-2xl">Items:</h1>
    <router-link class="bg-green-500 p-3 text-white rounded-lg cursor-pointer" :to="{ path: '/admin/new' }">Item toevoegen +</router-link>
  </div>
  <div class="flex flex-wrap mx-14" :class="State.gettingPosts ? 'justify-center' : ''">
    <router-link v-if="!State.gettingPosts" v-for="item in State.data" :to=" {path: '/admin/' + item.id } ">
      <Post
          :name="item.name"
          :url="item.url"
          admin="true"
          :image="item.image?.url ?? '' "
          :id="item.id"
      />
    </router-link>

    <div v-else class="flex flex-col justify-center h-full">
      <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" class="animate-spin" fill="#5f6368"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z"/></svg>
      data ophalen
    </div>
  </div>
</template>
