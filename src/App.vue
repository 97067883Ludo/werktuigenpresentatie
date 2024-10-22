<script setup>
import { RouterView, useRouter } from 'vue-router'
const router = useRouter();

function Adminpage() {

  let test =  router.currentRoute.value.fullPath.includes("/screen/");
  return test
}

</script>

<template>
  <div :class="Adminpage() ? 'w-full h-full' : 'w-screen h-screen'">
  <RouterView/>
  </div>
</template>
