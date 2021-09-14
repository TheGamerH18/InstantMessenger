export let ExistingChats = new Array();

// Clear the Chat Window, to display the new Chat
export let clearChatMessages = () => {
    var el = document.querySelector('.openChat');

    while (el.firstChild) el.removeChild(el.firstChild);
};

// Clear the Whole Chat List
export function ClearAll() {
    ExistingChats = new Array();
    clearChatMessages();
    var el = document.querySelector('.chats');

    while (el.firstChild) el.removeChild(el.firstChild);
}

// check if the chat is already existing
export let exists = (newChat) => {
    for (let chat in ExistingChats) {
        // check also if the Type is the Same 
        if (newChat.UserID === ExistingChats[chat].id)
            return true;
    }
    return false;
}

// To set the clicked chat to active
// Needed in the Renderer to know what needs to be Rendered
export function setActiveID(obj) {
    for (let i = 0; i < ExistingChats.length; ++i) {
        if (ExistingChats[i] == obj) {
            ExistingChats[i].setActive(!0);
        } else {
            ExistingChats[i].setActive(!1);
        }
    }
}

// Add a Message to a Chat with ID
export let addMessage = (id, message, bool) => {
    console.log(bool);
    for (let i = 0; i < ExistingChats.length; i++) {
        if (ExistingChats[i].id == id) {
            ExistingChats[i].addMessage(message, bool);
        }
    }
}

export let getUserNameOfActive = () => {
    for (let i = 0; i < ExistingChats.length; i++)
        if (ExistingChats[i].isActive)
            return ExistingChats[i].name;
}