<script setup>
import {useRoute} from "vue-router";
import Header from "@/Components/Header.vue";
import {useCategoryStore} from "@/stores/Category.js";
import {reactive} from "vue";

const CategoryStore = useCategoryStore();
const route = useRoute();
const id = route.params.id;

const State = reactive({ Data: {
    name: ""
  },
  NewItem: false
});

async function GetCategory() {
  if (id === "new") {
    State.NewItem = true;
    return;
  }

  let response = await CategoryStore.GetCategory(id);
  if (response.status === 200) {
    State.Data = response.data;

    console.log(State.Data);
  }

}
GetCategory();



</script>

<template>
  <Header admin="true"></Header>
  <router-link :to="{path: '/admin/categories'}" class="flex mt-4 mx-14">
    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#5f6368"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
    <p class="text-3xl text-[#5f6368]">Terug</p>
  </router-link>
  <div class="flex mt-4 mx-14 justify-center">
      <div class="p-4 border-4 border-gray-300 rounded-xl w-1/3">
        <form @submit.prevent="submit">
          <div class="sm:col-span-3">
            <label for="Categorie-naam" class="block text-sm font-medium leading-6 text-gray-900">Categorie naam</label>
            <div class="mt-2">
              <input type="text" v-model="State.Data.name" name="Categorie-naam" id="Categorie-naam" autocomplete="family-name" class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <div class="mt-4" v-if="!State.NewItem">
            <div class="flex flex-col">
              <div class="">
              <span class="font-bold">
                Gemaakt op:
              </span>
                <span> {{ State.Data.creationDate }}</span>
              </div>
              <div class="">
              <span class="font-bold">
                Laatst bewerkt:
              </span>
                <span> {{ State.Data.updateDate }}</span>
              </div>
            </div>
          </div>

          <div class="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" class="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Verwijderen</button>
            <button type="submit" class="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Save</button>
          </div>
        </form>
      </div>
  </div>

</template>
