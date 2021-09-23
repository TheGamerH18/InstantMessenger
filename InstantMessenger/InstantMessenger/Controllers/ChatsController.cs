using InstantMessenger.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InstantMessenger.Controllers
{
    [Authorize]
    public class ChatsController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public ChatsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
            _context = context;
        }

        // GET: Chats
        public async Task<IActionResult> Index()
        {
            return View(await _context.Chat.ToListAsync());
        }

        // GET: Chats/Details/
        // Returns all Usernames except the one of the Calling User
        public IActionResult Details()
        {
            List<string> result = new();
            IQueryable<string> userquery = _context.Users
                .Where(p => p.UserName != _userManager.GetUserAsync(User).Result.UserName)
                .Select(p => p.UserName);
            foreach (string user in userquery)
            {
                result.Add(user);
            }
            return Ok(result);
        }

        private bool ChatExists(int id)
        {
            return _context.Chat.Any(e => e.Id == id);
        }
    }
}
