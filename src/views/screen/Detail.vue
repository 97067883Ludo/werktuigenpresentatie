<script setup>
import {useRoute} from "vue-router";
import {useScreenStore} from "@/stores/Screensocket.js";
import {reactive} from "vue";
import Post from "@/Components/Post.vue";
import Footer from "@/Components/Footer.vue";
const route = useRoute();
let ScreenId = route.params.id;
const screensocket = useScreenStore();
const State = reactive({
  data: {},
  screenNotFound: false,
  gettingScreens: false,
  FirstRender: true
});

if (isNaN(parseInt(ScreenId))) {
  ScreenId = 0;
}

screensocket.screenId = parseInt(ScreenId);
screensocket.setupConnection();
screensocket.receivePostsCallback = receivePosts
screensocket.receiveCheckInCallback = ReceiveCheckinLoop

async function getPosts() {
    State.gettingScreens = true;
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
  State.gettingScreens = false;
  State.data = JSON.parse(data);
}

getPosts();

function checkinLoop() {
  if (State.FirstRender) {
    screensocket.Checkin();
    State.FirstRender = false;
  }

  setTimeout(() => {
    screensocket.Checkin();
  }, 1000)
}

checkinLoop();

</script>

<template>
  <div v-if="State.gettingScreens">
    Loading
  </div>

  <div v-if="!State.gettingScreens" class="flex flex-col	h-full justify-between">
    <Post v-for="item in State.data" :name="item.Name" :url="item.Url" :image="item.Image?.url ?? ''"/>
    <Footer class=""/>
  </div>

  <div v-if="State.screenNotFound" class="absolute top-0 left-0 w-screen h-screen bg-black z-20">
    <div class="w-full h-full flex justify-center items-center">
      <div class="text-white text-9xl">
        scherm niet gevonden
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
