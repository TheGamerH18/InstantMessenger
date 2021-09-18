import { autocomplete } from "./autocomplete.js";
import { mainRender } from "./modules/renderer.module.js";

$(document).ready(function () {
    $.get("/Chats/Details", function (data) {
        console.log(data);
        let users = data;
        autocomplete(document.getElementById("username"), users);
    });
});


mainRender()