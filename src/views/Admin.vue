<script setup>
import Header from "@/Components/Header.vue";
import {reactive} from "vue";
import PostAdmin from "@/Components/PostAdmin.vue";
import CategoryAdmin from "@/Components/CategoryAdmin.vue";

const pages = reactive([
  {id: 1, name: 'Post', active: true},
  {id: 2, name: 'Categorieën', active: false},
]);

function checkIfPageIsActive(page) {
  let test = getPageById(page);
  return test[0].active;
}

function setPageActive(page) {
  let PageToBeSetActive = getPageById(page.id);
  PageToBeSetActive[0].active = true;
}

function getPageById(page) {
  return pages.filter(x => x.id === page);
}

function onPageChange(page) {
  DeactivateCurrentPage();
  setPageActive(page);
}

function DeactivateCurrentPage() {
  let test = pages.filter(page => page.active);
  test[0].active = false;
}

</script>

<template>
  <Header admin="true" :pages="pages"  @change-page="(page) => onPageChange(page)" ></Header>
  <div class="mt-5 overflow-hidden">
    <post-admin v-if="checkIfPageIsActive(1)"></post-admin>
    <category-admin v-if="checkIfPageIsActive(2)"></category-admin>
  </div>
</template>
