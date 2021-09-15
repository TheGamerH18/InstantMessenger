using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity; using InstantMessenger.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using System.IO;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace InstantMessenger.Areas.Identity.Pages.Account.Manage
{
    public class ProfilePicture : PageModel
    {
        private const string AuthenicatorUriFormat = "otpauth://totp/{0}:{1}?secret={2}&issuer={0}";

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger<ProfilePicture> _logger;
        private readonly ApplicationDbContext _context;

        public ProfilePicture(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ILogger<ProfilePicture> logger,
            ApplicationDbContext context)

        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _context = context;
        }

        [BindProperty]
        public BufferedSingleFileUploadDb FileUpload { get; set; }
        public bool HasProfilePicture { get; set; }
        public string StatusMessage { get; set; }
        public async Task<IActionResult> OnGet()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            HasProfilePicture = user.ProfilePicture != null;

            return Page();
        }

        public async Task<IActionResult> OnPostUploadAsync()
        {
            using (var memoryStream = new MemoryStream())
            {
                await FileUpload.FormFile.CopyToAsync(memoryStream);

                // Upload the file if less than 2 MB
                if(memoryStream.Length < 2097152)
                {
                    var user = _userManager.GetUserAsync(User).Result;
                    user.ProfilePicture = memoryStream.ToArray();
                    _context.Users.Update(user);
                    _context.SaveChanges();
                }
                else
                {
                    ModelState.AddModelError("File", "The file is too large.");
                }
            }
            return Page();
        }
    }

    public class BufferedSingleFileUploadDb
    {
        [Required]
        [Display(Name="File")]
        public IFormFile FormFile { get; set; }
    }
}