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
    private readonly IMongoCollection<Slot> SlotCollection;
    private readonly IMongoCollection<Item> ItemCollection;
    private readonly IMongoCollection<BorrowHistory> BorrowHistoryCollection;

    public SlotController()
    {
      client = new MongoClient("mongodb://mrborrow:0MCLlXvUgPDGaOVTaszveWl9mUxLC1IAtoIGd6eXfewIJcpiLw9Jtd7j2D0Cc2NeQsntAMXpsRrMvZfNoZjA6A==@mrborrow.documents.azure.com:10255/?ssl=true&replicaSet=globaldb");
      database = client.GetDatabase("mrborrow");
      SlotCollection = database.GetCollection<Slot>("slot");
      BorrowHistoryCollection = database.GetCollection<BorrowHistory>("borrowhistory");
      ItemCollection = database.GetCollection<Item>("item");
    }

    [Route("GetItems")]
    [HttpGet]
    public IEnumerable<Item> GetItems()
    {
      return ItemCollection.Find(x => true).ToList();
    }

    // POST api/values
    [Route("CreateItem")]
    [HttpPost]
    public async void CreateItem([FromBody] Item item)
    {
      var slot = SlotCollection.Find(x => x.Row == item.SlotRow && x.Column == item.SlotColumn).FirstOrDefault();

      var items = new List<Item>();
      item._id = Guid.NewGuid().ToString();

      items.Add(item);

      if (slot != null)
      {
        var data = new Item
        {
          _id = item._id,
          Name = item.Name,
          CreatedDate = DateTime.UtcNow,
          CreatedBy = item.CreatedBy,
          SlotId = slot._id,
          SlotColumn = item.SlotColumn,
          SlotRow = item.SlotRow
        };
        await ItemCollection.InsertOneAsync(data);

        slot.Items.Add(item);
        var update = Builders<Slot>.Update
            .Set(it => it.Items, slot.Items)
            ;

        await SlotCollection.UpdateOneAsync(it => it._id == slot._id, update);
      }
      else
      {
        string slotid = Guid.NewGuid().ToString();


        await ItemCollection.InsertOneAsync(new Item
        {
          Name = item.Name,
          CreatedDate = DateTime.UtcNow,
          CreatedBy = item.CreatedBy,
          SlotId = slotid,
        });

        var newslot = new Slot { _id = slotid, Row = item.SlotRow, Column = item.SlotColumn, Items = items };
        await SlotCollection.InsertOneAsync(newslot);
      }


    }

    [Route("GetSlots/{slotid}")]
    [HttpGet]
    public Slot GetSlot(string slotid)
    {
      return SlotCollection.Find(x => x._id == slotid).FirstOrDefault();
    }

    [Route("GetSlotForBorrow/{slotid}")]
    [HttpGet]
    public Slot GetSlotForBorrow(string slotid)
    {
      var slot = SlotCollection.Find(x => x._id == slotid).FirstOrDefault();
      if (slot.BorrowDate != null)
      {
        //throw new Exception("Someone borrowed this slot");
        return null;
      }
      return slot;
    }
    // POST api/values
    [Route("ConfirmBorrowHistory")]
    [HttpPost]
    public async Task<BorrowHistory> ConfirmBorrowHistory([FromBody] BorrowHistory borrowHistory)
    {
      borrowHistory._id = Guid.NewGuid().ToString();
      var slot = SlotCollection.Find(x => x._id == borrowHistory.SlotId).FirstOrDefault();
      borrowHistory.Items = slot.Items;
      borrowHistory.Row = slot.Row;
      borrowHistory.Column = slot.Column;
      borrowHistory.BorrowDate = null;
      borrowHistory.ReturnDate = null;
      borrowHistory.Guarantor = null;
      borrowHistory.Approver = null;

      await BorrowHistoryCollection.InsertOneAsync(borrowHistory);

      return borrowHistory;
    }

    [Route("GetBorrowHistoryForConsent/{borrowId}")]
    [HttpGet]
    public BorrowHistory GetBorrowHistoryForConsent(string borrowId)
    {
      return BorrowHistoryCollection.Find(x => x._id == borrowId).FirstOrDefault();
    }

    // POST api/values
    [Route("ConsentGuarantor/{borrowid}/{guarantor}")]
    [HttpPost]
    public async void ConsentGuarantor(string borrowid, string guarantor)
    {
      var update = Builders<BorrowHistory>.Update
          .Set(it => it.Guarantor, guarantor)
          ;

      await BorrowHistoryCollection.UpdateOneAsync(it => it._id == borrowid, update);
    }

    // POST api/values
    [Route("ConfirmBorrow/{borrowid}/{slotid}")]
    [HttpPost]
    public async Task<object> ConfirmBorrow(string borrowid, string slotid)
    {
      var borrow = BorrowHistoryCollection.Find(x => x._id == borrowid).FirstOrDefault();

      if (!string.IsNullOrEmpty(borrow.Guarantor))
      {
        var update = Builders<BorrowHistory>.Update
            .Set(it => it.BorrowDate, DateTime.UtcNow)
            ;

        await BorrowHistoryCollection.UpdateOneAsync(it => it._id == borrowid, update);


        var update2 = Builders<Slot>.Update
      .Set(it => it.BorrowDate, DateTime.UtcNow)
      ;

        await SlotCollection.UpdateOneAsync(it => it._id == slotid, update2);

        return null;
      }
      else
      {
        return new Exception("No one consent this borrow");
      }
    }

    [Route("GetBorrowHistoryForReturn/{borrowid}/{username}")]
    [HttpGet]
    public BorrowHistory GetBorrowHistoryForReturn(string borrowid, string username)
    {
      var borrow = BorrowHistoryCollection.Find(x => x._id == borrowid).FirstOrDefault();
      if (borrow.BorrowDate == null || borrow.ReturnDate != null)
      {
        throw new Exception("this slot still available");
      }
      if (username != borrow.Borrower && username != borrow.Guarantor)
      {
        throw new Exception("not allow to return");
      }
      return borrow;
    }

    // POST api/values
    [Route("ConsentApprover/{borrowid}/{approver}")]
    [HttpPost]
    public async void ConsentApprover(string borrowid, string approver)
    {
      var update = Builders<BorrowHistory>.Update
          .Set(it => it.Approver, approver)
          ;

      await BorrowHistoryCollection.UpdateOneAsync(it => it._id == borrowid, update);
    }

    // POST api/values
    [Route("ConfirmReturn/{borrowid}/{slotid}")]
    [HttpPost]
    public async void ConfirmReturn(string borrowid, string slotid)
    {
      var borrow = BorrowHistoryCollection.Find(x => x._id == borrowid).FirstOrDefault();

      if (!string.IsNullOrEmpty(borrow.Approver))
      {
        var update = Builders<BorrowHistory>.Update
            .Set(it => it.ReturnDate, DateTime.UtcNow)
            ;

        await BorrowHistoryCollection.UpdateOneAsync(it => it._id == borrowid, update);


        var update2 = Builders<Slot>.Update
      .Set(it => it.BorrowDate, null)
      ;

        await SlotCollection.UpdateOneAsync(it => it._id == slotid, update2);

      }
      else
      {
        throw new Exception("No one approve this borrow");
      }
    }

    //[Route("GetSlots")]
    //[HttpGet]
    //public IEnumerable<Slot> GetSlots()
    //{
    //  return SlotCollection.Find(x => true).ToList();
    //}

    //// POST api/values
    //[Route("CreateSlot")]
    //[HttpPost]
    //public async void CreateSlot([FromBody] Slot slot)
    //{
    //  await SlotCollection.InsertOneAsync(slot);
    //}
  }
}
