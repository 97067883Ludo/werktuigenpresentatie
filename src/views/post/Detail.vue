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
    DoneUpdatingNewItem: false,
  })

  async function getPost() {
    if (id === "new") {
      State.newItem = true;
      State.itemLoaded = true;
      return;
    }

    let data = await postsStore.GetPost(id);

    if (data.status != 200) {
      await router.push({path: `/admin` });
    }

    postItem.data = data.data;

    State.itemLoaded = true;
  }

  getPost();

  function selectFile(e) {
    let file = e.target.files[0];
    postItem.data.RawImage = e.target.files[0];
    postItem.data.image.url = URL.createObjectURL(file);
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

  async function AddPost() {
    const formData = new FormData();
    State.PostingNewItem = true;

    if (id === "new") {
      console.log(postItem.data.name);
      formData.append("Name", postItem.data.name);
      formData.append("Url", postItem.data.url);
      formData.append("FormFile", postItem.data.RawImage);

      let result = await postsStore.newPost(formData);

      if (result.status === 200) {
        State.DoneUpdatingNewItem = true;
        id = result.data.id;
        await router.push({path: `/admin/post/${result.data.id}`});
        State.PostingNewItem = false;
        await getPost();
      }

      return;
    }

    formData.append("id", id);
    formData.append("Name", postItem.data.name);
    formData.append("Url", postItem.data.url);
    formData.append("FormFile", postItem.data.RawImage);

    let result = await postsStore.updatePost(formData);
    console.log(result)
    State.DoneUpdatingNewItem = true;
    DoneUpdatingNewItemDelay();
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
                  :disabled="State.PostingNewItem"
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
                  :disabled="State.PostingNewItem"
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
                  class="overflow-hidden"
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
              :disabled="State.PostingNewItem"
              class="mt-3 flex justify-center rounded-md bg-green-600 px-3 py-2 text-sm w-20 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              @click="AddPost"
            >
            <span v-if="!State.PostingNewItem">
              Save
            </span>
              <div v-else>
                <svg v-if="State.PostingNewItem && !State.DoneUpdatingNewItem" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" class="animate-spin" fill="#FFFFFF"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z"/></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
              </div>

        </button>
        </div>
      </div>
    </div>

    <div class="w-1/3">
      <h2 class="text-4xl mb-2">Voorbeeld:</h2>
      <div class="p-3 rounded-xl bg-gray-50 flex justify-center border-2 border-gray-300">
        <Post v-if="State.itemLoaded" :name="postItem.data.name" :url="postItem.data.url" :admin="true" :image="postItem.data.image?.url ?? '' " :raw-image="postItem.data.image?.url ?? '' " />
      </div>
    </div>

  </div>
</template>
