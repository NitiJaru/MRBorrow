import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BorrowitemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-borrowitem',
  templateUrl: 'borrowitem.html',
})
export class BorrowitemPage {

  message: string;
  qr: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.message = this.navParams.data;
    this.qr  = "https://chart.googleapis.com/chart?cht=qr&chl=" + this.message +"&chs=400x400&choe=UTF-8&chld=L%7C2%27%20rel=%27nofollow"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BorrowitemPage');
  }

}
