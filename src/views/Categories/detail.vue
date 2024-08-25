<script setup>
import {useRoute} from "vue-router";
import Header from "@/Components/Header.vue";
import {useCategoryStore} from "@/stores/Category.js";
import {reactive} from "vue";
import router from "@/router/index.js";

const CategoryStore = useCategoryStore();
const route = useRoute();
let id = route.params.id;

const State = reactive({ Data: {
    name: ""
  },
  NewItem: false,
  LoadingItem: false,
  DoneUpdatingNewItem: false
});

async function GetCategory() {
  if (id === "new") {
    State.NewItem = true;
    return;
  }

  let response = await CategoryStore.GetCategory(id);
  State.NewItem = false;
  if (response.status === 200) {
    State.Data = response.data;

    console.log(State.Data);
  }

}
GetCategory();

async function saveCategory() {
  State.LoadingItem = true;
  const formData = new FormData();
  State.PostingNewItem = true;

  if (id === "new") {
    formData.append("Name", State.Data.name);
    let result = await CategoryStore.newCategory(formData);
    console.log(result)
    if (result.status === 200) {
      id = result.data.id;
      State.PostingNewItem = false;
      await router.push({path: `/admin/categories/${result.data.id}`});
      await GetCategory();
      return;
    }
  }

  //updating item
  formData.append("Name", State.Data.name);
  formData.append("Id", State.Data.Id);
  let result = await CategoryStore.newCategory(formData);

  DoneUpdatingNewItemDelay();
}

async function deleteItem() {

  if (!confirm("Weet je zeker dat je dit item wilt verwijderen?")) {
    return;
  }

  let result = await CategoryStore.DeletePost(id);
  if (result.status === 200) {
    await router.push({path: `/admin/categories`});
  }
}

function DoneUpdatingNewItemDelay() {
  setTimeout(() => {
    State.PostingNewItem = false;
    State.DoneUpdatingNewItem = false;
  }, 2500)
}


</script>

<template>
  <Header admin="true"></Header>
  <router-link :to="{path: '/admin/categories'}" class="flex mt-4 mx-14">
    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#5f6368"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
    <p class="text-3xl text-[#5f6368]">Terug</p>
  </router-link>
  <div class="flex mt-4 mx-14 justify-center">
      <div class="p-4 border-4 border-gray-300 bg-gray-50 rounded-xl w-1/3">
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

            <button
                v-if="id !== 'new'"
                @click="deleteItem"
                class="rounded-md mr-3 mt-3 bg-red-600 px-3 py-2 text-sm w-20 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
            <span>
              Delete
            </span>
            </button>

            <button
                type="submit"
                :disabled="State.PostingNewItem"
                class="mt-3 flex justify-center rounded-md bg-green-600 px-3 py-2 text-sm w-20 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                @click="saveCategory"
            >
            <span v-if="!State.PostingNewItem">
              Save
            </span>
              <div v-else>
                <svg v-if="State.PostingNewItem && !State.DoneUpdatingNewItem" xmlns="http://www.w3.org/2000/svg"
                     height="20px" viewBox="0 -960 960 960" width="20px" class="animate-spin" fill="#FFFFFF">
                  <path
                      d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z"/>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                     fill="#FFFFFF">
                  <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                </svg>
              </div>

            </button>
          </div>
        </form>
      </div>
  </div>

</template>
