<script setup>
import Header from "@/Components/Header.vue";
import {reactive} from "vue";
import {usePostStore} from "@/stores/Post.js";

const postsStore = usePostStore();

const State = reactive({
  data: []
})

async function GetPosts() {
  State.data = await postsStore.GetPosts();
}

GetPosts();
</script>

<template>
  <Header admin="true"/>

  <div class="w-full mt-5 mx-20 w-full">
    <div class="flex w-full">
      <h1 class="text-2xl">Items:</h1>
      <div>sdf</div>
    </div>
    <div v-for="item in State.data">
      <Post admin="true" />
    </div>
  </div>
</template>

<style scoped>

</style>
