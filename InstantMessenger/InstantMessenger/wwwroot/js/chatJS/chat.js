let Chats = Array(
    {UserName: "Testuser", UserID: 1337, Messages: [[from = false, message = "laksdkasjd"],[from = true, message = 1],[from = false, message = 1],[from = false, message = 1],[from = true, message = 1]]},
    {UserName: "Sven", UserID: 1338,     Messages: [[from = false, message = "laksdkasjd"],[from = true, message = 1],[from = false, message = 1],[from = true, message = 1],[from = true, message = 1]]},
    {UserName: "Sven2", UserID: 138,     Messages: [[from = false, message = "laksdkasjd"],[from = true, message = 1],[from = false, message = 1],[from = true, message = 1],[from = true, message = 1]]},
    {UserName: "Sven3", UserID: 1347,    Messages: [[from = false, message = "laksdkasjd"],[from = true, message = 1],[from = false, message = 1],[from = true, message = 1],[from = true, message = 1]]},
    {UserName: "Sven4", UserID: 1335,    Messages: [[from = false, message = "laksdkasjd"],[from = true, message = 1],[from = false, message = 1],[from = true, message = 1],[from = true, message = 1]]},
    {UserName: "Sven5", UserID: 1386,    Messages: [[from = false, message = "laksdkasjd"],[from = true, message = 1],[from = false, message = 1],[from = true, message = 1],[from = true, message = 1]]},
    {UserName: "Sven6", UserID: 1737,    Messages: [[from = false, message = "laksdkasjd"],[from = true, message = 1],[from = false, message = 1],[from = true, message = 1],[from = true, message = 1]]},
    {UserName: "Sven7", UserID: 1388,    Messages: [[from = false, message = "laksdkasjd"],[from = true, message = 1],[from = false, message = 1],[from = true, message = 1],[from = true, message = 1]]},
    {UserName: "Sven8", UserID: 13888,   Messages: [[from = false, message = "laksdkasjd"],[from = true, message = 1],[from = false, message = 1],[from = true, message = 1],[from = true, message = 1]]},
    {UserName: "Sven9", UserID: 13567,   Messages: [[from = false, message = "laksdkasjd"],[from = true, message = 1],[from = false, message = 1],[from = true, message = 1],[from = true, message = 1]]},
    {UserName: "Sven10", UserID: 13356,  Messages: [[from = false, message = "laksdkasjd"],[from = true, message = 1],[from = false, message = 1],[from = true, message = 1],[from = true, message = 1]]},
    {UserName: "Sven11", UserID: 1381,   Messages: [[from = false, message = "laksdkasjd"],[from = true, message = 1],[from = false, message = 1],[from = true, message = 1],[from = true, message = 1]]}
);

"use strict";
var connection = new signalR.HubConnectionBuilder().withUrl("/chathub").build();

connection.start().then(function () {

})

connection.on("messages", function (chats) {
    Chats = JSON.parse(chats);
    ClearAll();
    updater();
    console.log(Chats);
});

connection.on("recievemessage", function (id, message, isfrom) {
    addMessage(id, message, isfrom);
    console.log(Chats);
});

function sendnewmessage () {
    connection.invoke("SendtoUser", "Svenistraucher", "test")
}