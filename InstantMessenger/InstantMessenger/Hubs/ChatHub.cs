using System;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace InstantMessenger.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string username, string message)
        {
            await Clients.All.SendAsync("Recieve Message", username, message);
        }
    }
}
