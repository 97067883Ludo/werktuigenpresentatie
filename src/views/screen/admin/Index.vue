<script setup>
  import {useScreenStore} from "@/stores/Screen.js";
  import {reactive} from "vue";
  const Screenstore = useScreenStore();

  const State = reactive({

  });

  async function getScreens() {
    let screens = await Screenstore.GetScreens();
  }

  getScreens();
</script>

<template>

</template>
