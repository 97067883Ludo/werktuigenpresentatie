<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
const router = useRouter();

function Adminpage() {
  if (router.currentRoute.value.fullPath === "/"){ return false;}

  return true;
}
</script>

<template>
  <div :class="Adminpage() ? 'w-full h-full' : 'w-screen h-screen'">
  <RouterView/>
  </div>
</template>
