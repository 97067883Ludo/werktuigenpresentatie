<script setup>
import { reactive } from "vue";

const props = defineProps(['name', 'url', 'image', 'admin', 'id'])

const State = reactive({
  Pressed: false,
  urlFidelity: true,
  imagePresent: false,
  imageString: ""
})

if (props.image.length === 0) {
  State.imagePresent = true
  State.imageString = "logo-de-laarman.png"
} else {
  State.imageString = props.image;
}

if (props.url.length === 0) {
  State.urlFidelity = false
}

function setPressedState() {
  //if on the admin page, don't open the presentation.
  if (props.admin) {
    return;
  }

  State.Pressed = !State.Pressed;
}
</script>

<template>

  <div @click="setPressedState" v-if="State.urlFidelity" class="rounded bg-slate-600 m-4 p-1 max-h-64 max-w-96" :class="props.admin ? '' : 'cursor-pointer'">
    <div class="bg-contain">
      <img :src="State.imageString" style="object-fit: contain; width: 328px; height: 192px; " alt="logo">
    </div> 
    <div class="p-2 flex" :class="props.admin ? 'justify-between' : '' ">
      <h1 class="text-white">{{props.name ?? "Naamloos"}}</h1>
      <div v-if="props.admin" class=" flex">
        <div class="mr-2 cursor-pointer" >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" color="white" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
        </div>
        <div class="cursor-pointer" @click="() => {$emit('delete', props.id)}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" color="white" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </div>
      </div>
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
