<script setup>
import {useRoute} from "vue-router";
import {useScreenStore} from "@/stores/Screensocket.js";
const route = useRoute();
console.log(route.params);
const screensocket = useScreenStore();
screensocket.setupConnection();


async function test() {
  setTimeout(async () => {
    await screensocket.getPostsFromScreen();
  }, 2000)
}

test();


</script>

<template>

</template>

<style scoped>

</style>
