import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { BorrowitemPage } from '../borrowitem/borrowitem';

/**
 * Generated class for the QrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr',
  templateUrl: 'qr.html',
})
export class QrPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private barcodeScanner: BarcodeScanner) {
  }

  brrowitem(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);

      var message = barcodeData.text;
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
            handler: () => { this.navCtrl.push(BorrowitemPage, message) }
          }
        ]
      });
      alert.present();

     }).catch(err => {
         alert("Error: " + err);
         console.log('Error', err);
     });
  }

}
