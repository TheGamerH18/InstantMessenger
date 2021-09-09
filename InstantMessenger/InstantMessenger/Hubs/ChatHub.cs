using System;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using InstantMessenger.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace InstantMessenger.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ApplicationDbContext _context;

        public ChatHub(ApplicationDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
            Console.WriteLine("Context configured");
        }

        public override Task OnConnectedAsync()
        {
            Groups.AddToGroupAsync(Context.ConnectionId, Context.User.Identity.Name);
            var user = _userManager.FindByNameAsync(Context.User.Identity.Name);
            var messages = _context.Chat.Where(p =>
                p.reciever == user.Result
                || p.sender == user.Result)
                .Include(p => p.reciever)
                .Include(p => p.sender);
            List<Dictionary<string, dynamic>> chats = new();
            foreach(Models.Chat message in messages)
            {
                Console.WriteLine("Message from " + message.sender.UserName + " to " + message.reciever.UserName);
                chats = AddmessagetoArray(message, chats);
                Console.WriteLine("Message Added");
            }

            var chatjson = JsonSerializer.Serialize(chats);
            Console.WriteLine(chatjson);
            Clients.Group(Context.User.Identity.Name).SendAsync("messages", chatjson);
            return base.OnConnectedAsync();
        }

        private List<Dictionary<string, dynamic>> AddmessagetoArray(Models.Chat message, List<Dictionary<string, dynamic>> chats)
        {
            var contextuser = _userManager.FindByNameAsync(Context.User.Identity.Name).Result;
            var isfromuser = (message.reciever.UserName != contextuser.UserName);
            // Create Dictionary, which holds if the user is the sender and the message itself
            List<dynamic> newmessage = new();
            newmessage.Add(isfromuser);
            newmessage.Add(message.Text);
            // Add message to existing Chat, if existing and returning
            for (int i = 0; i < chats.Count; i++)
            {
                if (isfromuser)
                {
                    var index = i;
                    var username = chats[index]["UserName"];
                    var userid = chats[index]["UserID"];
                    if (username == message.reciever.UserName &&
                        userid == message.reciever.Id)
                    {
                        chats[i]["Messages"].Add(newmessage);
                        return chats;
                    }
                } else
                {
                    if (chats[i]["UserName"] == message.sender.UserName &&
                        chats[i]["UserID"] == message.sender.Id)
                    {
                        chats[i]["Messages"].Add(newmessage);
                        return chats;
                    }
                }
            }

            // Create new Chat
            var newchat = NewChat(isfromuser, message);
            newchat["Messages"].Add(newmessage);
            chats.Add(newchat);
            return chats;
        }

        private static Dictionary<string, dynamic> NewChat(bool isfromuser, Models.Chat message)
        {
            var User = isfromuser ? message.reciever : message.sender;
            Dictionary<string, dynamic> newchat = new();
            newchat.Add("UserName", User.UserName);
            newchat.Add("UserID", User.Id);
            newchat.Add("Messages", new List<List<dynamic>>());

            return newchat;
        }

        public async Task SendtoUser(string reciever, string message)
        {
            Models.Chat messagetodb = new()
            {
                reciever = _userManager.FindByNameAsync(reciever).Result,
                sender = _userManager.FindByNameAsync(Context.User.Identity.Name).Result,
                Text = message
            };

            Console.WriteLine("Created new Message");

            await _context.Chat.AddAsync(messagetodb);
            await _context.SaveChangesAsync();
            var id = (messagetodb.reciever.UserName != Context.User.Identity.Name) ? messagetodb.reciever : messagetodb.sender;
            var id2 = (messagetodb.reciever.UserName != Context.User.Identity.Name) ? messagetodb.sender : messagetodb.reciever;
            _ = Clients.Caller.SendAsync("recievemessage", id.Id, messagetodb.Text);
            _ = Clients.Group(id.UserName).SendAsync("recievemessage", id2.Id, messagetodb.Text);
        }
    }
}
