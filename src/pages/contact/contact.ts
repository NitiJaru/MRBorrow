import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreateBlockPage } from '../create-block/create-block';
import { ItemdetailPage } from '../itemdetail/itemdetail';
import { SlotdetailPage } from '../slotdetail/slotdetail';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  tab1Root = ItemdetailPage;
  tab2Root = SlotdetailPage;
  Getdata: Getdate;

  constructor(public navCtrl: NavController,private http: HttpClient) {
    // this.Getdata = this.navParams.data;
    this.http.get("http://mrborrowapi.azurewebsites.net/api/Slot/GetItems")
      //  .timeout(10000)
      //  .map(res => res.json())
       .subscribe((data) => {
         alert("Data: " + data);
       },
         error => {
           alert("Error: " + error + "\nError message: " + error.message + "\nError result: " + error.error)
         });
    
  }

  
  Goblock(){
    this.navCtrl.push(CreateBlockPage);
  }

  

  
}

export class Getdate {

  constructor(
    public id: number,
    public name: string,
    public createdDate: string,
    public createdBy: string,
    public slotId?: string,
    public slotRow?: string,
    public slotColumn?: string,

  ) {  }

}