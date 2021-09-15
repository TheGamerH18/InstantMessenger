import { clearChatMessages } from "./chatFetcher.module.js";
import { ChatClickListener } from "./ChatClickListener.module.js";
import { openChatScrollListener } from "./renderer.module.js";

// Keep the names in Json the same
// The Chat as a Object, for more Accessibility
export class Chat{

    // The Constructor, the Syntax of the Json must be the Same
    constructor({
        UserName: name,
        UserID: id,
        Messages: messages = new Array,
    } = {}) {

        this.name = name;
        this.id = id;
        this.messages = messages;
        this.isActive = !1;
        
        /*
          Create the DOM Elements
        */
        this.div = document.createElement("div");
        this.div.setAttribute("class", "userChat");

        this.userImg = document.createElement("img");
        this.userImg.setAttribute("class", "userImg");
        this.userImg.setAttribute("src", "img/fallbackImg.jpg");

        this.content = document.createElement("div");
        this.content.setAttribute("class", "content");

        this.userName = document.createElement("p");
        this.userName.setAttribute("class", "userName");
        this.userName.innerHTML = this.name;

        this.latestMes = document.createElement("p");
        this.latestMes.setAttribute("class", "newestMessage");
        this.latestMes.innerHTML = this.messages[this.messages.length-1][1];

        // Append the Elements
        document.querySelector(".chats").appendChild(this.div);

        this.div.appendChild(this.userImg);
        this.div.appendChild(this.content);
        
        this.content.appendChild(this.userName);
        this.content.appendChild(this.latestMes);

        // Attach it to the Listener
        ChatClickListener.append(this);

        // Set the Offset and width/height, for the Listener
        this.offsetTop = this.div.offsetTop;
        this.offsetLeft = this.div.offsetLeft;
        this.width = this.div.scrollWidth;
        this.height = this.div.scrollHeight;
    }

    // Add a Message
    addMessage(messages, bool) {
        this.messages[this.messages.length] = [bool ?? false, messages];
        setTimeout(() => {
            openChatScrollListener.scrollToEndY();
        }, 100)
    }
    
    // Set the Chat to active or inactive
    setActive(bool) {
        this.isActive = bool;
        if(this.isActive) {
            this.div.style.background = "red";
            this.finished = false;
        }
        else {
            this.div.style.background = "";
        }
    }

    // Render this chat
    render() {
        clearChatMessages();
        this.showChat();
    }

    // Render the Messages
    showChat() {
        for(let mes in this.messages){
            if(this.messages[mes][0])
                this.createFrom(this.messages[mes][1]);
            else
                this.createTo(this.messages[mes][1]);
        }
        if(!this.finished) {
            openChatScrollListener.scrollToEndY();
            this.finished = true;
        }
    }

    // Create a Message that came from the other Person
    createFrom (mes) {
        let div = this.createMes(mes);
        div.setAttribute("class", "message from");
    }

    // Create a Message that came from you
    createTo (mes) {
        let div = this.createMes(mes);
        div.setAttribute("class", "message you");
    }

    // Create a general Message
    createMes (mes) {
        let div = document.createElement("div");
        let content = document.createElement("p");
        content.setAttribute("class", "content");
        content.innerHTML = mes;
        let parent = document.querySelector(".openChat");
        parent.appendChild(div);
        div.appendChild(content);

        return div;
    }
}