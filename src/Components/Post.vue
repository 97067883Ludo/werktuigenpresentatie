<script setup>
import { reactive } from "vue";

const props = defineProps(['name', 'url', 'image', 'admin', 'id', 'rawImage'])

const State = reactive({
  Pressed: false,
  urlFidelity: true,
  imagePresent: false,
  imageString: "",
  DeleteItemModalShown: false,
})

if (props.image === null || props.image.length === 0) {
  State.imagePresent = true
  State.imageString = "/logo-de-laarman.png"
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
  <div class="m-4 w-96">
    <article @click="setPressedState" :class="props.admin ? '' : 'cursor-pointer'" class="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg cursor-pointer">
      <img
          v-if="rawImage === undefined || rawImage === ''"
          alt=""
          :src="State.imageString"
          class="absolute inset-0 h-full w-full object-cover"
      />
      <img
          v-else
          alt=""
          :src="props.rawImage"
          class="absolute inset-0 h-full w-full object-cover"
      />

      <div class="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 sm:pt-48 lg:pt-48">
        <div class="p-4 sm:p-6">
          <h3 class="mt-0.5 text-lg text-white 2-xl flex justify-between flex-row">
            <span>{{props.name ?? "Naamloos"}}</span>
            <span>
              <span  v-if="props.admin" class="cursor-pointer flex flex-row">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" color="white" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>

              </span>

            </span>

          </h3>
        </div>
      </div>
    </article>
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
