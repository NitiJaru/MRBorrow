using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MrBorrow.Api.Models
{
    public class Item
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public DateTime CreatedDate { get; set; }
       
    }
}
