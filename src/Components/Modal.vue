<script setup>
const props = defineProps(['title']);

</script>

<template>
  <div class="absolute top-0 left-0 w-full h-full bg-gray-50 opacity-30">

  </div>
  <div class="absolute top-0 left-0 w-full h-full" @click="$emit('close')">
      <div class="w-full h-full flex justify-center items-center ">
        <div class="bg-gray-50 w-fit h-fit rounded-2xl z-20 border-2 border-solid border-b-gray-900" @click.stop="">
          <div class="w-full h-full flex flex-col">
            <div class="w-full flex justify-between p-2">
              <h1 class="ml-2 text-2xl">
                {{ props.title }}
              </h1>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 cursor-pointer" @click="$emit('close')">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
              </div>
              <div class="h-full">
                <slot></slot>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>
