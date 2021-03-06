import { getUserNameOfActive } from "./chatFetcher.module.js";
import { connection } from "./chat.js";

export class inputListener {

    constructor( ListenerObj ) {
        this.ListenerObj = ListenerObj;

        this.enter = null;

        document.addEventListener("keydown", (ev) => {
            this.enter = ev.key.toLowerCase() == "enter" | false;
            this.render();
        });
        document.addEventListener("keyup", (ev) => {
            this.enter = false;
        });
    }

    render () {
        if(this.enter) {
            let string = this.ListenerObj.value;
            setTimeout(() => {
                this.ListenerObj.value = "";
            }, 100)
            if (string == "" || string == "\n" || string == "\n\n" || string == "\n\n\n" || string == "\n\n\n\n" || string == "\n\n\n\n\n" || string == "\n\n\n\n\n\n" || string == "\n\n\n\n\n\n\n")
                return;
            connection.invoke("SendtoUser", getUserNameOfActive(), string)
        }
    }
}