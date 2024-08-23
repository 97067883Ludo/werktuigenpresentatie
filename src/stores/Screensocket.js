import {defineStore} from "pinia";
import * as signalR from '@aspnet/signalr';


export const useScreenStore = defineStore("screensocket",  {
    state: () => ({
        Connection: null
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
            this.Connection.on("RecieveMessage", (data) => {
                console.log(data)
            })
        },

        async getPostsFromScreen() {
            let result = await this.Connection.invoke("GetPostsFromScreenId", 1);
        }


    }
})