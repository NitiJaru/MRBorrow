import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

import { BorrowsuccessPage } from '../borrowsuccess/borrowsuccess';

@IonicPage()
@Component({
  selector: 'page-borrowitem',
  templateUrl: 'borrowitem.html',
})
export class BorrowitemPage {

  model: any;
  qr: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient, private alertCtrl: AlertController) {

    let id = this.navParams.data;
    this.httpClient.get("https://mrborrowapi.azurewebsites.net/api/slot/GetBorrowHistoryForConsent/" + id)
    .subscribe((data:any)=>{

      JSON.stringify(data);
      this.model = data;
      this.qr = "https://chart.googleapis.com/chart?cht=qr&chl=" + data._id +"&chs=400x400&choe=UTF-8&chld=L%7C2%27%20rel=%27nofollow";
    }, error=>{
      let alert = this.alertCtrl.create({
        title: 'เกิดข้อผิดพลาด',
        message: error.message,
        buttons: [
          {
            text: 'ตกลง',
            role: 'cancel',
            handler: () => { }
          }
        ]
      });
      alert.present();
    });

    // this.message = this.navParams.data;
    // this.qr  = "https://chart.googleapis.com/chart?cht=qr&chl=" + this.message +"&chs=400x400&choe=UTF-8&chld=L%7C2%27%20rel=%27nofollow";
  }

  cancel(){
    this.navCtrl.pop();
  }

  submit(){
    
    try{
      let option = { "headers": { "Content-Type": "application/json" }};
      this.httpClient.post("https://mrborrowapi.azurewebsites.net/api/Slot/ConfirmBorrow/" + this.model._id + "/" + this.model.SlotId, { }, option)
      .subscribe((result: any) => {
        this.navCtrl.push(BorrowsuccessPage);
      }, error => {
        let alert = this.alertCtrl.create({
          title: 'เกิดข้อผิดพลาด',
          message: error.message,
          buttons: [
            {
              text: 'ตกลง',
              role: 'cancel',
              handler: () => { }
            }
          ]
        });
        alert.present();
      });
    }
    catch (error){
      let alert = this.alertCtrl.create({
        title: 'เกิดข้อผิดพลาด',
        message: error.message,
        buttons: [
          {
            text: 'ตกลง',
            role: 'cancel',
            handler: () => { }
          }
        ]
      });
      alert.present();
    }
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BorrowitemPage');
  }

}
