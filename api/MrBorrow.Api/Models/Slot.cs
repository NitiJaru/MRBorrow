using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MrBorrow.Api.Models
{
    public class Slot
    {
        public string _id { get; set; }
        public string Row { get; set; }
        public string Column { get; set; }

        public List<Item> Items { get; set; }
        public DateTime? BorrowDate { get; set; }
        public string Borrower { get; set; }
        public string Guarantor { get; set; }

        public bool IsAvailable { get; set; }
  }
}
