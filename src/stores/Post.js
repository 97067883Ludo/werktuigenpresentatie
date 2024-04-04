import {defineStore} from "pinia";
import axios from "axios";

export const usePostStore = defineStore("cards",  {
    state: () => ({
        Posts: [],
    }),

    actions: {
        async GetPosts() {
            await axios.get("http://localhost:5172/Post").then((response) => {
                this.Posts = response.data
            })
            return this.Posts;
        },
    }
})
