using Microsoft.AspNetCore.Identity; using InstantMessenger.Data;
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
        public DateTime Date { get; set; }
        public ApplicationUser Sender { get; set; }
        public ApplicationUser Reciever { get; set; }
    }
}
