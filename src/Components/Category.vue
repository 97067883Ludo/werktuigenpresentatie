<script setup>
  const props = defineProps(['name'])

</script>

<template>
  <div class="rounded-2xl p-2 border-4 text-2xl w-1/6 w-full">
    {{props.name}}

  </div>
</template>
