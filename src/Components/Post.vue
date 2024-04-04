<script setup>
import {reactive} from "vue";

const props = defineProps(['name', 'url', 'img', 'admin'])

const State = reactive({
  Pressed: false,
  urlFidelity: true
})

if (props.url.length == 0) {
  State.urlFidelity = false
}

function setPressedState() {
  State.Pressed = !State.Pressed;

}
</script>

<template>

  <div @click="setPressedState" v-if="State.urlFidelity" class="rounded bg-gray-600 m-4 p-1 cursor-pointer">
    <div class="bg-contain">
      <img src="../assets/logo-de-laarman.png" style="object-fit: contain;" alt="logo">
    </div>
    <div class="p-2">
      <h1 class="text-white">{{props.name ?? "Naamloos"}}</h1>
    </div>
  </div>

  <div v-if="State.Pressed">
    <iframe
        class="absolute top-0 w-screen h-screen left-0 z-20"
        :src="props.url"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        max-width="100%"
        sandbox="allow-forms allow-modals allow-orientation-lock allow-popups allow-same-origin allow-scripts"
        scrolling="no"
        allowfullscreen
        mozallowfullscreen
        msallowfullscreen
        webkitallowfullscreen />
    <div @click="setPressedState" class="absolute top-0 right-0 z-30 bg-blue-500 mr-4 w-60 h-10">
      <span class="w-full h-full flex justify-center items-center text-white cursor-pointer">
        Terug
      </span>
    </div>
  </div>

</template>
