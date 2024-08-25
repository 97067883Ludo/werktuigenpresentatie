import {defineStore} from "pinia";
import apiConnection from "../Axios.js";

export const useCategoryStore = defineStore("Categories",  {
    state: () => ({
        Categories: [],
    }),

    actions: {
        async GetCategories() {
            await apiConnection.get("/Category").then((response) => {
                this.Categories = response.data
            })
            return this.Categories;
        },

        async GetCategory(id) {
            let Category;
            await apiConnection.get("/Category/id?id=" + id)
                .then((response) => {
                    Category = response
                })
                .catch( (response) => {
                    Category = response
                })

            return Category;
        },

        async DeletePost(Id) {
            let result = false;
            await apiConnection.delete("Category?id=" + Id)
                .then((response) => {
                    result = response;
                }).catch((response) => {
                    result = response;
                })

            return result;
        },

        async newCategory(postData) {
            let result;
            await apiConnection.post("Category",
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
