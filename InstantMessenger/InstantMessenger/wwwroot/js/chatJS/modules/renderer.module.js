import { ExistingChats, exists } from "./chatFetcher.module.js";
import { Chats } from "./chat.js";
import { Chat } from "./chat.module.js";
import { ChatClickListener } from "./ChatClickListener.module.js";

// The Main Renderer
// Check for all existing Chag if any Chat is setted to Active
// if there is one than call the render on this
export const mainRender = () => {
    for (let i = 0; i < ExistingChats.length; i++) {
        if (ExistingChats[i].isActive) {
            ExistingChats[i].render();
        }
    }
    updater();
    ChatClickListener.render();
    setTimeout(mainRender, 1000 / 30)
}

export const updater = () => {

    // Loop through every Chat and Check if it needs to be created or not
    for (let i = 0; i < Chats.length; i++) {
        if (!exists(Chats[i]))
            ExistingChats[ExistingChats.length] = new Chat(Chats[i]);
    }
}