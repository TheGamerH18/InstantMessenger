using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InstantMessenger.Models
{
    public class Chat
    {
        public int Id { get; set; }
        public string Text { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime date { get; set; }
        public IdentityUser sender { get; set; }
        public IdentityUser reciever { get; set; }
    }
}
