import { getUserNameOfActive } from "./chatFetcher.module.js";
import { connection } from "./chat.js";

export class inputListener {

    constructor( ListenerObj ) {
        this.ListenerObj = ListenerObj;

        this.enter = null;

        document.addEventListener("keydown", (ev) => {
            this.enter = ev.key.toLowerCase() == "enter" | false;
        });
        document.addEventListener("keyup", (ev) => {
            this.enter = false;
        });
        
        this.render();
    }

    render () {
        if(this.enter) {
            let string = this.ListenerObj.value;
            this.ListenerObj.value = "";
            if(string == "" || 0)
                return;
            connection.invoke("SendtoUser", getUserNameOfActive(), string)
        }
    }
}