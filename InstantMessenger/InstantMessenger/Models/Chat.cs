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

        [DataType(DataType.Time)]
        public DateTime date { get; set; }
        public string sender { get; set; }
        public string reciever { get; set; }
    }
}
