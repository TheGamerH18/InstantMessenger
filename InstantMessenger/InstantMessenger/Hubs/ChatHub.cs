using InstantMessenger.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace InstantMessenger.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public ChatHub(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
            Console.WriteLine("Context configured");
        }

        public override Task OnConnectedAsync()
        {
            Groups.AddToGroupAsync(Context.ConnectionId, Context.User.Identity.Name);
            Task<ApplicationUser> user = _userManager.FindByNameAsync(Context.User.Identity.Name);
            Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Models.Chat, ApplicationUser> messages = _context.Chat.Where(p =>
                p.Reciever == user.Result
                || p.Sender == user.Result)
                .Include(p => p.Reciever)
                .Include(p => p.Sender);
            List<Dictionary<string, dynamic>> chats = new();
            foreach (Models.Chat message in messages)
            {
                chats = AddmessagetoArray(message, chats);
            }

            string chatjson = JsonSerializer.Serialize(chats);
            Clients.Group(Context.User.Identity.Name).SendAsync("messages", chatjson);
            Console.WriteLine("Connected");
            return base.OnConnectedAsync();
        }

        private List<Dictionary<string, dynamic>> AddmessagetoArray(Models.Chat message, List<Dictionary<string, dynamic>> chats)
        {
            ApplicationUser contextuser = GetUserbyName(Context.User.Identity.Name);
            bool isfromuser = (message.Reciever.UserName != contextuser.UserName);
            // Create Dictionary, which holds if the user is the sender and the message itself
            List<dynamic> newmessage = new();
            newmessage.Add(!isfromuser);
            newmessage.Add(message.Text);
            // Add message to existing Chat, if existing and returning
            for (int i = 0; i < chats.Count; i++)
            {
                if (isfromuser)
                {
                    if (chats[i]["UserName"] == message.Reciever.UserName &&
                        chats[i]["UserID"] == message.Reciever.Id)
                    {
                        chats[i]["Messages"].Add(newmessage);
                        return chats;
                    }
                }
                else
                {
                    if (chats[i]["UserName"] == message.Sender.UserName &&
                        chats[i]["UserID"] == message.Sender.Id)
                    {
                        chats[i]["Messages"].Add(newmessage);
                        return chats;
                    }
                }
            }

            // Create new Chat
            Dictionary<string, dynamic> newchat = NewChat(isfromuser, message);
            newchat["Messages"].Add(newmessage);
            chats.Add(newchat);
            return chats;
        }

        private static Dictionary<string, dynamic> NewChat(bool isfromuser, Models.Chat message)
        {
            ApplicationUser User = isfromuser ? message.Reciever : message.Sender;
            Dictionary<string, dynamic> newchat = new();
            newchat.Add("UserName", User.UserName);
            newchat.Add("UserID", User.Id);
            if(User.ProfilePicture != null) newchat.Add("UserProfilePicture", User.ProfilePicture);
            newchat.Add("Messages", new List<List<dynamic>>());

            return newchat;
        }

        public async Task SendtoUser(string reciever, string message)
        {
            string name = Context.User.Identity.Name;

            if (!Checkuserexists(reciever))
            {
                Console.WriteLine("User " + name + " send Message to Unknown User " + reciever);
                return;
            }
            // Create Chat message from model
            Models.Chat messagetodb = new()
            {
                Reciever = GetUserbyName(reciever),
                Sender = GetUserbyName(name),
                Text = message
            };

            Console.WriteLine("Created new Message");

            // Add message to DB
            await _context.Chat.AddAsync(messagetodb);
            await _context.SaveChangesAsync();

            bool v = messagetodb.Reciever.UserName != name;
            ApplicationUser id = v ? messagetodb.Reciever : messagetodb.Sender;
            ApplicationUser id2 = v ? messagetodb.Sender : messagetodb.Reciever;
            bool isfromuser = messagetodb.Reciever.UserName != GetUserbyName(name).UserName;

            _ = Clients.Caller.SendAsync("recievemessage", id.Id, messagetodb.Text, !isfromuser);
            _ = Clients.Group(id.UserName).SendAsync("recievemessage", id2.Id, messagetodb.Text, isfromuser);
        }

        private ApplicationUser GetUserbyName(string username)
        {
            return _userManager.FindByNameAsync(username).Result;
        }

        private bool Checkuserexists(string username)
        {
            if (GetUserbyName(username) != null)
            {
                return true;
            }

            return false;
        }
    }
}
