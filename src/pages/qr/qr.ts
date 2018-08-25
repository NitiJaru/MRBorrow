import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

import { BorrowitemPage } from '../borrowitem/borrowitem';

@IonicPage()
@Component({
  selector: 'page-qr',
  templateUrl: 'qr.html',
})
export class QrPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private barcodeScanner: BarcodeScanner, private httpClient: HttpClient) {
  }

  brrowitem(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);

      var qrData = barcodeData.text;
      this.httpClient.get("https://mrborrowapi.azurewebsites.net/api/slot/getslotforborrow/" + qrData)
      .subscribe((data:any)=>{
        
        let message = "ขั้น " + data.row + "-" + data.column;
        let alert = this.alertCtrl.create({
          title: 'ยืนยันการยืม',
          message: message,
          buttons: [
            {
              text: 'ยกเลิก',
              role: 'cancel',
              handler: () => { }
            },
            {
              text: 'ยืม',
              handler: () => { 
                
                let option = { "headers": { "Content-Type": "application/json" }};

                // Hack: Mock username
                let usernameBorrow = "Earn";
                this.httpClient.post("https://mrborrowapi.azurewebsites.net/api/slot/confirmborrowhistory", { slotId: data._id, borrower: usernameBorrow  }, option)
                .subscribe((postdata:any)=>{
                  this.navCtrl.push(BorrowitemPage, postdata.id)
                },
                error=>{
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
                })

               }
            }
          ]
        });
        alert.present();

      },
      (error: string) =>{

        let alert = this.alertCtrl.create({
          title: 'เกิดข้อผิดพลาด',
          message: error,
          buttons: [
            {
              text: 'ตกลง',
              role: 'cancel',
              handler: () => { }
            }
          ]
        });
        alert.present();

      })

     }).catch(err => {
         alert("Error: " + err.message);
         console.log('Error', err.message);
     });
  }

}