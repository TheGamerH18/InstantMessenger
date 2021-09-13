/*
* This Class is a Mouse Listener
* to check if it clicked on a Chat, if the Chat is attached
* to be listened.
*/
class ChatListener {

    // give a DOM Element to listen to.
    constructor( ListenerObj ) {
        this.ListenerObj = ListenerObj;

        // Create a empty array of Obj to Listing to
        this.listening = new Array();

        // Create the Mouse Obj
        this.mouse = {x: null, y: null};

        // The Mouse Listener to get the Mouse position
        this.mouseListener = document.addEventListener("mousemove", (mouse) => {
            this.mouse = {
                x: mouse.clientX+window.scrollX,
                y: mouse.clientY+window.scrollY
            };
        });

        this.clicked = null;

        // Check if the Mouse is pressed
        document.addEventListener("mousedown", (ev) => {
            // Key for left msnbtn is 1
            // Only mark as down if the mouse is inside of the Listening Obj
            this.clicked = (this.ListenerObj.scrollWidth >= this.mouse.x) ? ev.which == 1 : false;
        })
        document.addEventListener("mouseup", () => {
            this.clicked = false;
        })
    }

    // Append a obj to be in the click Listener
    append( obj ) {
        this.listening[this.listening.length] = obj;
    }

    // The main Render obj for the Listener, to get a perma check.
    render() {
        // Return if listener is empty
        if(this.listening.length == 0)
            return;

        // Loop through all listening obj
        for(let i = 0; i < this.listening.length; ++i) {
            // If the mouse is over
            if(
                this.listening[i].offsetTop <= this.mouse.y && 
                this.listening[i].offsetLeft <= this.mouse.x && 
                this.listening[i].offsetTop+this.listening[i].height >= this.mouse.y &&
                this.listening[i].offsetLeft+this.listening[i].width >= this.mouse.x
                ) {
                    // if the left msnbtn is clicked
                    if(this.clicked)
                        this.listening[i].setActive(true);
                } else {
                    // and to reset the other
                    // but only on a click in the chat list
                    if(this.clicked)
                        this.listening[i].setActive(false);
                }
        }
    }
}

// Create the Obj
export let ChatClickListener = new ChatListener(document.querySelector(".chats"));