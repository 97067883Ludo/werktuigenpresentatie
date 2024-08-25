<script setup>
import {useRoute} from "vue-router";
import {useScreenStore} from "@/stores/Screensocket.js";
import {reactive} from "vue";
import Post from "@/Components/Post.vue";
const route = useRoute();
console.log(route.params);
const screensocket = useScreenStore();
const State = reactive({
  data: {}
});

screensocket.screenId = 1;
screensocket.setupConnection();
screensocket.receivePostsCallback = receivePosts

async function getPosts() {
    await screensocket.getPostsFromScreen();
}

function receivePosts(data) {
  State.data =  JSON.parse(data);
  console.log(State.data)
}

getPosts();

</script>

<template>
  <div>
    <Post v-for="item in State.data" :name="item.Name" :url="item.Url" :image="item.Image?.Url ?? ''"/>
  </div>
</template>

<style scoped>

</style>
