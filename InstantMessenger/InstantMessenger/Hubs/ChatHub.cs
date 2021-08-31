using System;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using InstantMessenger.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace InstantMessenger.Hubs
{
    public class ChatHub : Hub
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly ApplicationDbContext _context;

        public ChatHub(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SendMessage(string username, string message)
        {
            List<Models.Chat> chats = new List<Models.Chat>;
            List<Models.Chat> chatstemp = await _context.Chat.Include(m => m.sender).ToListAsync();
            foreach(Models.Chat d in chatstemp)
            {
                chats.Add(d);
            }
            chatstemp = await _context.Chat.Include(m => m.reciever).ToListAsync();
            foreach(Models.Chat d in chatstemp)
            {
                chats.Add(d);
            }
        }
    }
}
