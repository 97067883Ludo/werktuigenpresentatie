<script setup>
import Header from "@/Components/Header.vue";
import {reactive} from "vue";
import {usePostStore} from "@/stores/Post.js";
import Post from "@/Components/Post.vue";
import Modal from "@/Components/Modal.vue";

const postsStore = usePostStore();

const State = reactive({
  AddModal: false,
  data: []
})

async function GetPosts() {
  State.data = await postsStore.GetPosts();
  console.log(State.data);
}

GetPosts();

function closeAddModal() {
  State.AddModal = false
  console.log(State.AddModal);
}

</script>

<template>

  <Header admin="true"></Header>

  <div class="mt-5 overflow-hidden">
    <div class="flex justify-between items-center mx-14">
      <h1 class="text-2xl">Items:</h1>
      <div class="bg-green-500 p-3 text-white rounded-lg cursor-pointer" @click="() => {State.AddModal = true}" >Item toevoegen +</div>
    </div>
    <div class="flex flex-wrap justify-center">
      <Post v-for="item in State.data" :name="item.name" :url="item.url" admin="true"/>
    </div>
  </div>

  <!--Add item modal-->
  <Modal v-if="State.AddModal" @close="closeAddModal"/>
</template>

<style scoped>

</style>
