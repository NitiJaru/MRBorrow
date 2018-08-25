using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MrBorrow.Api.Models
{
    public class Slot
    {
        public string SlotId { get; set; }
        public string SlotName { get; set; }
        public IEnumerable<Item> Items { get; set; }
        public DateTime? BorrowDate { get; set; }
        public string Borrower { get; set; }
        public string Guarantor { get; set; }
    }
}
