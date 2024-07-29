import {defineStore} from "pinia";
import apiConnection from "../Axios.js";

export const usePostStore = defineStore("cards",  {
    state: () => ({
        Posts: [],
        NewPost: {
            Name: "",
            Url: ""
        }
    }),

    actions: {
        async GetPosts() {
            await apiConnection.get("/Post").then((response) => {
                this.Posts = response.data
                console.log(response.data)
            })
            return this.Posts;
        },

        async GetPost(id) {
            let post;
            await apiConnection.get("/Post/id?id=" + id)
                .then((response) => {
                    post = response.data
                })
                .finally((response) => {
                })

            return post;
        },

        async DeletePost(Id) {
            let result = false;
            await apiConnection.delete("Post?id=" + Id)
                .then((response) => {
                    result = response;
                }).catch((response) => {
                    result = response;
                })

            return result;
        },

        async newPost(postData) {
            let result;
            await apiConnection.post("Post",
                postData
            ).then((response) => {
                result = response;
            }).catch((res) => {
                result = res.response.data
            });

            return result;
        },

        async updatePost(postData)  {
            let result;
            await apiConnection.put("http://localhost:5172/Post",
                postData
            ).then((response) => {
                result = response
            }).catch((response) => {
                result = response
            });

            return result;
        }
    }
})
