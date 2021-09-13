import { ClearAll, addMessage } from "./chatFetcher.module.js";
import { updater } from "./renderer.module.js";

export let Chats = Array(
    {UserName: "Error", UserID: "Error", Messages: [[false, "Error"]]},
    {UserName: "Error1", UserID: "Error1", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error11", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error1111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error11111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error111111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error211111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error311111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error411111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error511111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error611111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error711111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error811111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error911111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error121111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error131111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error141111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error151111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error161111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error171111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error181111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error191111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error101111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error112111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error113111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error114111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error115111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error116111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error117111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error118111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error119111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error110111", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error111211", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error111311", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error111411", Messages: [[false, "Error1"]]},
    {UserName: "Error1", UserID: "Error111511", Messages: [[false, "Error1"]]}
);


"use strict";
var connection = new signalR.HubConnectionBuilder().withUrl("/chathub").build();

connection.start().then( () => {
    console.log("Connected")
})

connection.on("messages", (chats) => {
    Chats = JSON.parse(chats);
    console.log("Geht");
    ClearAll();
    console.log("Geht");
    updater();
    console.log("Geht");
    console.log(Chats);
});

connection.on("recievemessage", (id, message, isfrom) => {
    addMessage(id, message, isfrom);
    console.log(Chats);
});