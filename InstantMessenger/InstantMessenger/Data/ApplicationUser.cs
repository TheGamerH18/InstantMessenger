using Microsoft.AspNetCore.Identity; using InstantMessenger.Data;

namespace InstantMessenger.Data
{
    public class ApplicationUser : IdentityUser
    {
        public byte[] ProfilePicture { get; set; }
    }
}
