using Microsoft.AspNetCore.Identity;
namespace InstantMessenger.Data
{
    public class ApplicationUser : IdentityUser
    {
        public byte[] ProfilePicture { get; set; }
    }
}
