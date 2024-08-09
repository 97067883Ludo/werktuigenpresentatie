<script setup>
import Router from "@/router/index.js";

async function redirect() {
  await Router.push("/admin/post");
}

redirect();

</script>

<template>
<!--  Voor later misschien een dashboard voor alle schermen -->
</template>
