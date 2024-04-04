<script setup>
import Header from "@/Components/Header.vue";
import Footer from "@/Components/Footer.vue";
import Post from "@/Components/Post.vue";
import {usePostStore} from "@/stores/Post.js";
import {reactive} from "vue";

const poststore =  usePostStore();

const State = reactive({
  RequestCompleted: false,
  data: []
});

getData();

async function getData() {
  State.data = await poststore.GetPosts();
  State.RequestCompleted = true;
}

</script>

<template>
  <div class="flex flex-col	h-full justify-between">
    <Header/>

    <div v-if="State.RequestCompleted" class="flex flex-wrap justify-center overflow-auto">

      <div class="flex flex-wrap justify-center">
        <Post v-for="item in State.data" :name="item.name" :url="item.url"/>
      </div>

    </div>
    <div v-else class="flex">

    </div>
    <Footer class=""/>
  </div>
</template>

