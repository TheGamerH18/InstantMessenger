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

        document.addEventListener("scroll", (ev) => {
            console.log(ev)
        })
    }

    render () {
        if(this.enter) {
            let string = this.ListenerObj.value;
            setTimeout(() => {
                this.ListenerObj.value = "";
            }, 100)
            if(string == "" || 0)
                return;
            connection.invoke("SendtoUser", getUserNameOfActive(), string)
        }
    }
}