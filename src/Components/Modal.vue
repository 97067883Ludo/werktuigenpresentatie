<script setup>
const props = defineProps(['title']);

</script>

<template>
  <div class="absolute top-0 left-0 w-full h-full bg-gray-50 opacity-30">

  </div>
    <div class="absolute top-0 left-0 w-full h-full" @click="$emit('close')">
        <div class="w-full h-full flex justify-center items-center ">
          <div class="bg-gray-50 w-1/2 h-1/2 rounded-2xl z-20 border-2 border-solid border-b-gray-900" @click.stop="">

          </div>
        </div>
    </div>
</template>
