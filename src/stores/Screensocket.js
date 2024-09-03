import {defineStore} from "pinia";
import * as signalR from '@aspnet/signalr';

export const useScreenStore = defineStore("screensocket",  {
    state: () => ({
        Connection: null,
        screenId: null,
        receivePostsCallback: (data) => {},
        receiveCheckInCallback: (data) => {},
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
            this.Connection.on("GetPostsFromScreenId", (data) => { this.receivePostsCallback(data); });
            this.Connection.on("CheckIn", (data) => { this.receiveCheckInCallback(data); });
        },

        async getPostsFromScreen() {
            if (this.Connection.connection.connectionState === 1) {
                await this.Connection.invoke("GetAllPosts");
                return;
            }

            setTimeout(() => {
                this.getPostsFromScreen()
                console.log("No connection")
            }, 100);
        },

        async Checkin() {
            if (this.Connection.connection.connectionState === 1) {
                await this.Connection.invoke("CheckIn", this.screenId);
                return;
            }

            setTimeout(() => {
                this.Checkin()
                console.log("No connection")
            }, 100);
        }
    }
})


