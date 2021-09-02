using System;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using InstantMessenger.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace InstantMessenger.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly ApplicationDbContext _context;

        public ChatHub(ApplicationDbContext context)
        {
            _context = context;
        }

        public override Task OnConnectedAsync()
        {
            Groups.AddToGroupAsync(Context.ConnectionId, Context.User.Identity.Name);

            List<Models.Chat> chats = new List<Models.Chat>();
            Clients.Group(Context.User.Identity.Name).SendAsync("Chats", chats);
            return base.OnConnectedAsync();
        }

        public async Task SendtoUser(string sender, string reciever, string message)
        {
            Models.Chat messagetodb = new Models.Chat();
            messagetodb.reciever = userManager.FindByNameAsync(reciever).Result;
            messagetodb.sender = userManager.FindByNameAsync(Context.User.Identity.Name).Result;
            messagetodb.Text = message;

            await _context.Chat.AddAsync(messagetodb);
            await Clients.Group(reciever).SendAsync("Recieve Message", sender, message);
        }
    }
}
