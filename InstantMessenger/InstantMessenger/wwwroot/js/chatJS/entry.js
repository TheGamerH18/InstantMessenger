import { autocomplete } from "./autocomplete.js";
import "./modules/renderer.module.js";

$(document).ready(function () {
    $.get("/Chats/Details", function (data) {
        let users = data;
        autocomplete(document.getElementById("username"), users);
    });
});