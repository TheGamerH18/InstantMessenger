using InstantMessenger.Data;
using System;
using System.ComponentModel.DataAnnotations;

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
