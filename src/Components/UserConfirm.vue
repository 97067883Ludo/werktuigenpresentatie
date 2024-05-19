<script setup>
  import Modal from "@/Components/Modal.vue";

  const props = defineProps(["itemId", "deleting"]);
  const emits = defineEmits(['close', 'delete'])
  console.log(props.itemId)
  
</script>

<template>
  <modal title="Verwijderen" @close="$emit('close')">
    <div class="p-3">
    <p>Weet je zeker dat je dit item wilt verwijderen?</p>
    <div class="mt-6 w-full flex items-center justify-end gap-x-6">
      <button
          type="button"
          class="text-sm font-semibold leading-6 text-gray-900"
          @click="() => {$emit('close')}"
      >Cancel</button>
      <button
          type="submit"
          class="flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm w-20 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          @click="$emit('delete', props.itemId)"
      >
        <span>
          Delete
        </span>
        
      </button>
    </div>
    </div>
  </modal>
</template>