using InstantMessenger.Data;
using InstantMessenger.Models;
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
            var userquery = _context.Users
                .Where(p => p.UserName != _userManager.GetUserAsync(User).Result.UserName)
                .Select(p => p.UserName);
            foreach (var user in userquery)
            {
                result.Add(user);
            }
            return Ok(result);
        }

        // GET: Chats/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Chats/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Text,date,sender,reciever")] Chat chat)
        {
            if (ModelState.IsValid)
            {
                _context.Add(chat);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(chat);
        }

        // GET: Chats/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Chat chat = await _context.Chat.FindAsync(id);
            if (chat == null)
            {
                return NotFound();
            }
            return View(chat);
        }

        // POST: Chats/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Text,date,sender,reciever")] Chat chat)
        {
            if (id != chat.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(chat);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ChatExists(chat.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(chat);
        }

        // GET: Chats/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Chat chat = await _context.Chat
                .FirstOrDefaultAsync(m => m.Id == id);
            if (chat == null)
            {
                return NotFound();
            }

            return View(chat);
        }

        // POST: Chats/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            Chat chat = await _context.Chat.FindAsync(id);
            _context.Chat.Remove(chat);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ChatExists(int id)
        {
            return _context.Chat.Any(e => e.Id == id);
        }
    }
}
