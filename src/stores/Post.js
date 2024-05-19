import {defineStore} from "pinia";
import axios from "axios";

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
            await axios.get("http://localhost:5172/Post").then((response) => {
                this.Posts = response.data
                console.log(response.data)
            })
            return this.Posts;
        },
        
        async DeletePost(Id) {
            let result = false;
            await axios.delete("http://localhost:5172/Post?id=" + Id).then((response) => {
                result = true;
            })
            
            return result;
        },
        
        async newPost(postData) {
            let result;
            await axios.post("http://localhost:5172/Post",
                postData
            ).then((response) => {
                result = true;
            }).catch((res) => {
                result = res.response.data
            });

            return result;
        }
    }
})
