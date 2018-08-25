import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

import { BorrowitemPage } from '../borrowitem/borrowitem';
import { GranteePage } from '../grantee/grantee';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-qr',
  templateUrl: 'qr.html',
})
export class QrPage {

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private alertCtrl: AlertController,
     private barcodeScanner: BarcodeScanner,
     private httpClient: HttpClient,
     private userSvc: UserServiceProvider) {
  }

  brrowitem(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);

      var qrData = barcodeData.text;
      this.httpClient.get("https://mrborrowapi.azurewebsites.net/api/slot/getslotforborrow/" + qrData)
      .subscribe((data:any)=>{
        
        let message = "ชั้น " + data.row + "-" + data.column;
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
                this.httpClient.post("https://mrborrowapi.azurewebsites.net/api/Slot/ConfirmBorrowHistory", 
                {
                  "slotId": data._id,
                  "borrower": this.userSvc.Username,
                }, option).subscribe((result: any) => {
                  this.navCtrl.push(BorrowitemPage, result._id)
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
            }
          ]
        });
        alert.present();

      },
      error =>{

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

     }).catch(err => {
         alert("Error: " + err.message);
         console.log('Error', err.message);
     });
  }

  grantee(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);

      var qrData = barcodeData.text;
      this.httpClient.get("https://mrborrowapi.azurewebsites.net/api/slot/GetBorrowHistoryForConsent/" + qrData)
      .subscribe((data:any)=>{
        this.navCtrl.push(GranteePage, data);
      },error=>{let alert = this.alertCtrl.create({
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
    },
      error =>{
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