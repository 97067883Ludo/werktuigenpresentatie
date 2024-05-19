<script setup>
import Header from "@/Components/Header.vue";
import {reactive, ref} from "vue";
import {usePostStore} from "@/stores/Post.js";
import Post from "@/Components/Post.vue";
import Modal from "@/Components/Modal.vue";

const postsStore = usePostStore();

const State = reactive({
  AddModal: false,
  data: [],
  newItem : {
    Name: "",
    Url: ""
  },
  PostingNewItem: false,
  NewPostResult: "",
  gettingPosts: false,
})

const newItemName = ref("")
const newItemUrl = ref("")

async function GetPosts() {
  State.gettingPosts = true;
  State.data = await postsStore.GetPosts();
  State.gettingPosts = false;
}

GetPosts();

function closeAddModal() {
  State.AddModal = false
}

async function deleteItem(id) 
{
  if (await postsStore.DeletePost(id))
  {
    await GetPosts();
  }
}

async function AddPost() {
  //State.PostingNewItem = true;
  const formData = new FormData();
  console.log(State.newItem.Url);
  formData.append("Name", newItemName.value);
  formData.append("Url", newItemUrl.value);
  console.log(newItemUrl)
  
  let result = await postsStore.newPost(formData);
  
  if (typeof result == "string") {
    console.log(result)
  }
  
  if (result) {
    State.AddModal = false;
    GetPosts();
  }
 State.PostingNewItem = false;
}
</script>

<template>
  <Header admin="true"></Header>
  <div class="mt-5 overflow-hidden">
    <div class="flex justify-between items-center mx-14">
      <h1 class="text-2xl">Items:</h1>
      <div class="bg-green-500 p-3 text-white rounded-lg cursor-pointer" @click="State.AddModal = true" >Item toevoegen +</div>
    </div>
    <div class="flex flex-wrap justify-center">
      <Post
          v-if="!State.gettingPosts" 
          v-for="item in State.data" 
          :name="item.name" 
          :url="item.url" 
          admin="true" 
          :image="item.image?.url ?? '' " 
          :id="item.id" @delete="deleteItem"
      />
      <div v-else class="flex flex-col justify-center h-full place-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        data ophalen
      </div>
    </div>
  </div>

  <!--Add item modal-->
  <Modal v-if="State.AddModal" @close="closeAddModal" title="Item toevoegen">
    <div class="p-3 px-10">
      
      <form @submit.prevent>
        
        <div class="mt-4">
          <div class="sm:col-span-3">
            <label for="naam" class="block text-sm font-medium leading-6 text-gray-900">Naam</label>
            <div class="mt-2">
              <input
                  v-model="newItemName"
                  :disabled="State.PostingNewItem"
                  type="text" 
                  name="naam" 
                  id="naam" 
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              > 
            </div>
          </div>
        </div>
        
        <div class="mt-10">
          <div class="sm:col-span-3 w-full">
            <label for="link" class="block text-sm font-medium leading-6 text-gray-900">Link</label>
            <div class="mt-2">
              <input
                  v-model="newItemUrl"
                  :disabled="State.PostingNewItem"
                  type="text" 
                  name="link" 
                  id="link" 
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>
        </div>
        
        <div class="mt-10">
          <div class="sm:col-span-3">
            <label for="link" class="block text-sm font-medium leading-6 text-gray-900">Afbeelding</label>
            <div class="mt-2">
              <input 
                  :value="State.newItem.file"
                  :disabled="State.PostingNewItem"
                  type="file" 
                  name="Bestand" 
                  id="bestand">
            </div>
          </div>
        </div>
        
        <div class="mt-6 w-full flex items-center justify-end gap-x-6">
          <button 
              type="button" 
              class="text-sm font-semibold leading-6 text-gray-900" 
              @click="closeAddModal"
          >Cancel</button>
          <button 
              type="submit" 
              class="flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm w-20 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              @click="AddPost"
          >
            <span v-if="!State.PostingNewItem">
              Save
            </span>
            <svg v-else xmlns="http://www.w3.org/2000/svg" 
                 fill="none" 
                 viewBox="0 0 24 24" 
                 stroke-width="1.5" 
                 stroke="currentColor" 
                 class="w-5 h-5 animate-spin flex justify-center">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>
        </div>
        
      </form>
    </div>
  </Modal>
</template>

<style scoped>

</style>
