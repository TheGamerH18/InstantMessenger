import { ExistingChats, exists } from "./chatFetcher.module.js";
import { Chats } from "./chat.js";
import { Chat } from "./chat.module.js";
import { inputListener } from "./chat.input.module.js"
import scrollListener from "./scrollListener.module.js";

new inputListener(document.querySelector("#inputMessage"))
new scrollListener(document.querySelector(".chatsOverall"));
export let openChatScrollListener = new scrollListener(document.querySelector(".openChatOverall"));
export const updater = () => {

    // Loop through every Chat and Check if it needs to be created or not
    for (let i = 0; i < Chats.length; i++) {
        if (!exists(Chats[i]))
            ExistingChats[ExistingChats.length] = new Chat(Chats[i]);
    }
}