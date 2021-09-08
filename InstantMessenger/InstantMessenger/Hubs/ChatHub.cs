using System;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using InstantMessenger.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using System.Linq;

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
        }

        public override Task OnConnectedAsync()
        {
            Groups.AddToGroupAsync(Context.ConnectionId, Context.User.Identity.Name);
            var user = _userManager.FindByNameAsync(Context.User.Identity.Name);
            var messages = _context.Chat.Where(p =>
                p.reciever == user.Result
                || p.sender == user.Result);
            List<Dictionary<string, dynamic>> chats = new();
            Clients.Group(Context.User.Identity.Name).SendAsync("messages", chats);
            return base.OnConnectedAsync();
        }

        private List<Dictionary<string, dynamic>> AddmessagetoArray(Models.Chat message, List<Dictionary<string, dynamic>> chats)
        {
            var contextuser = _userManager.FindByNameAsync(Context.User.Identity.Name).Result;
            var isfromuser = (message.reciever.UserName != contextuser.UserName);
            // Create Dictionary, which holds if the user is the sender and the message itself
            Dictionary<string, dynamic> newmessage = new();
            newmessage.Add("from", isfromuser);
            newmessage.Add("message", message.Text);

            // Add message to existing Chat, if existing and returning
            for (int i = 0; i < chats.Count; i++)
            {
                if(chats[i]["UserName"] == message.reciever.UserName &&
                    chats[i]["UserID"] == message.reciever.Id)
                {
                    chats[i]["Message"].append(newmessage);
                    return chats;
                }
            }

            // Create new Chat
            var newchat = NewChat(isfromuser, message);
            newchat["Message"].append(newmessage);
            _ = chats.Append(newchat);
            return chats;
        }

        private static Dictionary<string, dynamic> NewChat(bool isfromuser, Models.Chat message)
        {
            var User = isfromuser ? message.reciever : message.sender;
            Dictionary<string, dynamic> newchat = new();
            newchat.Add("UserName", User.UserName);
            newchat.Add("UserID", User.Id);
            newchat.Add("Messages", new List<Dictionary<string, dynamic>>());

            return newchat;
        }

        public async Task SendtoUser(string sender, string reciever, string message)
        {
            Models.Chat messagetodb = new()
            {
                reciever = _userManager.FindByNameAsync(reciever).Result,
                sender = _userManager.FindByNameAsync(Context.User.Identity.Name).Result,
                Text = message
            };

            await _context.Chat.AddAsync(messagetodb);
            await Clients.Group(reciever).SendAsync("Recieve Message", sender, message);
        }
    }
}
