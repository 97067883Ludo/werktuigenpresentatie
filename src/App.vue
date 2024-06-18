<script setup>
import { RouterView, useRouter } from 'vue-router'
const router = useRouter();

function Adminpage() {
  return router.currentRoute.value.fullPath !== "/";
}

</script>

<template>
  <div :class="Adminpage() ? 'w-full h-full' : 'w-screen h-screen'">
  <RouterView/>
  </div>
</template>
