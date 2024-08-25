import {defineStore} from "pinia";
import * as signalR from '@aspnet/signalr';

export const useScreenStore = defineStore("screensocket",  {
    state: () => ({
        Connection: null,
        screenId: null,
        GetPostsFromScreenId: (data) => { console.log(hallo)}

    }),

    actions: {
        setupConnection () {
            this.Connection =  new signalR.HubConnectionBuilder()
                .withUrl("ws://localhost:5172/screen-hub", {
                    skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets,
                })
                .configureLogging(signalR.LogLevel.Information)
                .build();

            this.Connection.start();
            this.Connection.on("GetPostsFromScreenId", (data) => this.GetPostsFromScreenId(data))
        },

        async getPostsFromScreen() {
            if (this.Connection.connection.connectionState === 1)
                await this.Connection.invoke("GetAllPosts");
            else return { error: "No connection" };
        },

        GetPostsFromScreenId(data) {}
    }
})


