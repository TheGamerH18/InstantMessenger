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
            Clients.Group(Context.User.Identity.Name).SendAsync("messages", chats);
            return base.OnConnectedAsync();
        }

        public async Task SendtoUser(string sender, string reciever, string message)
        {
            Models.Chat messagetodb = new Models.Chat();
            messagetodb.reciever = _userManager.FindByNameAsync(reciever).Result;
            messagetodb.sender = _userManager.FindByNameAsync(Context.User.Identity.Name).Result;
            messagetodb.Text = message;

            await _context.Chat.AddAsync(messagetodb);
            await Clients.Group(reciever).SendAsync("Recieve Message", sender, message);
        }
    }
}
