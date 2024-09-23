import {defineStore} from "pinia";
import apiConnection from "../Axios.js";

export const useScreenStore = defineStore("Screens",  {
    state: () => ({
        screens: [],
    }),

    actions: {
        async GetScreens() {
            await apiConnection.get("/Screen").then((response) => {
                this.Categories = response.data
            })
            return this.Categories;
        },

        async GetCategory(id) {
            let Category;
            await apiConnection.get("/Screen/id?id=" + id)
                .then((response) => {
                    Category = response
                })
                .catch( (response) => {
                    Category = response
                })

            return Category;
        },

        async DeletePost(id) {
            let result = false;
            await apiConnection.delete("/Screen?id=" + id)
                .then((response) => {
                    result = response;
                }).catch((response) => {
                    result = response;
                })

            return result;
        },

        async newCategory(postData) {
            let result;
            await apiConnection.post("/Screen",
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
            await apiConnection.put("/Screen",
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
