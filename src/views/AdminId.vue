<script setup>
  import {usePostStore} from "@/stores/Post.js";
  import {reactive, ref} from "vue";
  import Header from "@/Components/Header.vue";
  import Post from "@/Components/Post.vue";
  import {useRoute, useRouter} from 'vue-router'

  const route = useRoute()
  const router = useRouter()
  let id = route.params.id
  const postsStore = usePostStore();
  const postItem = reactive({data: {
      name : "",
      url: "",
      image: {
        id: 0,
        url: "",
      },
      creationDate: "",
      updateDate: "",
      RawImage: "",
    }});
  
  const State = reactive({
    itemLoaded: false,
    newItem: false,
    PostingNewItem: false,
  })
  
  async function getPost() {
    if (id === "new") {
      State.newItem = true;
      State.itemLoaded = true;
      return;
    }

    postItem.data = await postsStore.GetPost(id);

    State.itemLoaded = true;
  }

  getPost();

  function selectFile(e) {
    let file = e.target.files[0];
    postItem.data.RawImage = e.target.files[0];
    postItem.data.image.url = URL.createObjectURL(file);
  }

  async function AddPost() {
    const formData = new FormData();

    if (id === "new") {
      console.log(postItem.data.name);
      formData.append("Name", postItem.data.name);
      formData.append("Url", postItem.data.url);
      formData.append("FormFile", postItem.data.RawImage);

      let result = await postsStore.newPost(formData);

      if (result.status === 200) {
        id = result.data.id;
        await router.push({path: `/admin/${result.data.id}` });
        await getPost();
      }

      return;
    }

    formData.append("id", id);
    formData.append("Name", postItem.data.name);
    formData.append("Url", postItem.data.url);
    formData.append("FormFile", postItem.data.RawImage);

    let result = await postsStore.updatePost(formData);
  }

  async function DeletePost(id) {

    if(!confirm("Weet je zeker dat je dit item wilt verwijderen?")) {
      return;
    }

    let result = await postsStore.DeletePost(id);
    console.log(result)
    if (result.status === 200) {
      await router.push({path: `/admin` });
    }

  }

</script>

<template>
  <Header admin="true"></Header>
  
  <div class="p-10 flex w-full justify-around">
    
    <div class="w-1/3">
      <h2 class="text-4xl mb-2">Details: </h2>
      <div class="p-3 rounded-xl bg-gray-50 border-2 border-gray-300">
        <div class="mt-4">
          <div class="sm:col-span-3">
            <label for="naam" class="block text-sm font-medium leading-6 text-gray-900 font-bold text-lg">Naam: </label>
            <div class="mt-2">
              <input
                  v-model="postItem.data.name"
                  type="text"
                  name="naam"
                  id="naam"
                  class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
            </div>
          </div>
        </div>

        <div class="mt-4">
          <div class="sm:col-span-3">
            <label for="name" class="block text-sm font-medium leading-6 text-gray-900 font-bold text-lg">Url/Link: </label>
            <div class="mt-2">
              <input
                  v-model="postItem.data.url"
                  type="text"
                  name="naam"
                  id="name"
                  class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
            </div>
          </div>
        </div>

        <div class="mt-10">
          <div class="flex flex-col">
            <div class="">
              <span class="font-bold">
                Gemaakt op:
              </span>
              <span> {{postItem.data.creationDate}}</span>
            </div>
            <div class="">
              <span class="font-bold">
                Laatst bewerkt:
              </span>
              <span> {{postItem.data.updateDate}}</span>
            </div>
          </div>
        </div>

        <div class="mt-10">
          <div class="sm:col-span-3">
            <label for="bestand" class="block text-sm font-medium leading-6 text-gray-900 font-bold text-lg">Afbeelding: </label>
            <div class="mt-2">
              <input
                  v-on:change="selectFile"
                  :disabled="State.PostingNewItem"
                  type="file"
                  name="Bestand"
                  id="bestand" />
            </div>
          </div>
        </div>



        <div class="w-full flex justify-end">
          <button
              v-if="id !== 'new'"
              @click="DeletePost(id)"
              class="rounded-md mr-3 mt-3 bg-red-600 px-3 py-2 text-sm w-20 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            <span>
              Delete
            </span>
          </button>
            <button
              type="submit"
              class="mt-3 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm w-20 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
      </div>
    </div>
    
    <div class="w-1/3">
      <h2 class="text-4xl mb-2">Voorbeeld: </h2>
      <div class="p-3 rounded-xl bg-gray-50 flex justify-center border-2 border-gray-300">
        <Post v-if="State.itemLoaded" :name="postItem.data.name" :url="postItem.data.url" :admin="true" :image="postItem.data.image?.url ?? '' " :raw-image="postItem.data.image?.url ?? '' " />
      </div>
    </div>
    
  </div>
</template>