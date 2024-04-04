<script setup>
const props = defineProps(['title']);

</script>

<template>
    <div class="absolute top-0 left-0 w-full h-full">
        <div class="w-full h-full">
            <div class="">
                
            </div>
            <div>
                <button @click="$emit('close')" class="text-9xl">close</button>
            </div>
        </div>
    </div>
</template>