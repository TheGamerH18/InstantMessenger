using Microsoft.AspNetCore.Hosting;

[assembly: HostingStartup(typeof(InstantMessenger.Areas.Identity.IdentityHostingStartup))]
namespace InstantMessenger.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) =>
            {
            });
        }
    }
}