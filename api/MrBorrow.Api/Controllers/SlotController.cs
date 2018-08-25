using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MrBorrow.Api.Models;

namespace MrBorrow.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SlotController : ControllerBase
    {
        private readonly IMongoClient client;
        private readonly IMongoDatabase database;

        public SlotController()
        {
            client = new MongoClient("");
            database = client.GetDatabase("");
        }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        [HttpGet]
        public IEnumerable<Slot> GetSlots()
        {
            throw new NotImplementedException();
        }

        [HttpGet("{id}")]
        public IEnumerable<Slot> GetSlot(string slotid)
        {
            throw new NotImplementedException();
        }

        // POST api/values
        [HttpPost]
        public void CreateSlot([FromBody] Slot slot)
        {
            throw new NotImplementedException();
        }

        // POST api/values
        [HttpPost]
        public void CreateItemToSlot([FromBody] Item item)
        {
            throw new NotImplementedException();
        }

    }
}
