using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MrBorrow.Api.Models
{
    public class Item
    {
        public string _id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string SlotId { get; set; }
        public string SlotRow { get; set; }
        public string SlotColumn { get; set; }

  }
}
