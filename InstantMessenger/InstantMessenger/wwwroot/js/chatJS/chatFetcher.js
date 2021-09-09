let ExistingChats = new Array();

// Clear the Chat Window, to display the new Chat
let clearChatMessages = () => {
    var el = document.querySelector('.openChat');

    while (el.firstChild) el.removeChild(el.firstChild);
};

// The Main Renderer
const mainRender = () => {
    for (i = 0; i < ExistingChats.length; i++) {
        if (ExistingChats[i].isActive) {
            ExistingChats[i].render();
            updater();
        }
    }
    setTimeout(mainRender, 1000 / 30)
}

// Clear the Whole System
function ClearAll() {
    ExistingChats = new Array();
    clearChatMessages();
    var el = document.querySelector('.chats');

    while (el.firstChild) el.removeChild(el.firstChild);
}


// Update if the Document gets an Update
document.onreadystatechange = () => {
    updater();
}

const updater = () => {

    // Loop through every Chat and Check if it needs to be created or not
    for (i = 0; i < Chats.length; i++) {
        if (!exists(Chats[i]))
            ExistingChats[ExistingChats.length] = new Chat(Chats[i]);
    }
}

// check if the chat is already existing
let exists = (newChat) => {
    for (chat in ExistingChats) {
        // check also if the Type is the Same 
        if (newChat.UserID === ExistingChats[chat].id)
            return !0;
    }
    return !1;
}

// Set the Chat with the ID to Active, to get it visible
let times = 0;

// To set the clicked chat to active
// Needed in the Renderer to know what needs to be Rendered
let setActiveID = (thisID) => {

    for (i = 0; i < ExistingChats.length; ++i) {
        if (ExistingChats[i].id == thisID) {
            ExistingChats[i].setActive(!0);
        } else {
            ExistingChats[i].setActive(!1);
        }
    }
}



// Add a Message to a Chat with ID
let addMessage = (id, message, bool) => {
    for (let i = 0; i < ExistingChats.length; i++) {
        if (ExistingChats[i].id == id) {
            ExistingChats[i].addMessage(message, bool);
        }
    }
}

// Keep the names in Json the same
// The Chat as a Object, for more Accessibility
class Chat {

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
        this.latestMes.innerHTML = this.messages[this.messages.length - 1][1];

        // Append the Elements
        document.querySelector(".chats").appendChild(this.div);

        this.div.appendChild(this.userImg);
        this.div.appendChild(this.content);

        this.content.appendChild(this.userName);
        this.content.appendChild(this.latestMes);

        // Add a Click Listener
        this.div.setAttribute("onClick", "setActiveID(\"" + this.id + "\")");
    }

    // Add a Message
    addMessage(messages, bool) {
        this.messages[this.messages.length] = [bool, messages];
    }

    setActive(bool) {
        this.isActive = bool;
        if (this.isActive) {
            this.div.style.background = "red";
        } else {
            this.div.style.background = "";
        }
    }

    render() {
        clearChatMessages();
        this.showChat();
    }

    showChat() {
        for (let mes in this.messages) {
            if (this.messages[mes][0])
                this.createFrom(this.messages[mes][1]);
            else
                this.createTo(this.messages[mes][1]);
        }
    }

    createFrom(mes) {
        let div = this.createMes(mes);
        div.setAttribute("class", "message from");
    }

    createTo(mes) {
        let div = this.createMes(mes);
        div.setAttribute("class", "message you");
    }

    createMes(mes) {
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

mainRender();