<script setup>
import {useRoute} from "vue-router";
import {useScreenStore} from "@/stores/Screensocket.js";
import {reactive} from "vue";
import Post from "@/Components/Post.vue";
const route = useRoute();
let ScreenId = route.params.id;
const screensocket = useScreenStore();
const State = reactive({
  data: {},
  screenNotFound: false,
});

if (isNaN(parseInt(ScreenId))) {
  ScreenId = 0;
}

screensocket.screenId = parseInt(ScreenId);
screensocket.setupConnection();
screensocket.receivePostsCallback = receivePosts
screensocket.receiveCheckInCallback = ReceiveCheckinLoop

async function getPosts() {
    await screensocket.getPostsFromScreen();
}

function ReceiveCheckinLoop(data) {
  data = JSON.parse(data);

  if (data.status === "NotFound") {
    State.screenNotFound = true;
  }

  checkinLoop();
}

function receivePosts(data) {
  State.data = JSON.parse(data);
}

getPosts();

function checkinLoop() {
  setTimeout(() => {
    screensocket.Checkin();
  }, 1000)
}

checkinLoop();

</script>

<template>
  <div>
    <Post v-for="item in State.data" :name="item.Name" :url="item.Url" :image="item.Image?.url ?? ''"/>
  </div>

  <div v-if="State.screenNotFound" class="absolute top-0 left-0 w-screen h-screen bg-black">
    <div class="w-full h-full flex justify-center items-center">
      <div class="text-white text-9xl">
        scherm niet gevonden
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
