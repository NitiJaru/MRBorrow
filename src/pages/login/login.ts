import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  model = { name: "" };

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginForm(){

    this.nativeStorage.setItem('username', this.model.name)
    .then(
      () => console.log('Stored item!'),
      error => console.error('Error storing item', error)
    );

    // this.nativeStorage.getItem('username')
    // .then(
    //   data => alert(data),
    //   error => console.error(error)
    // );

    this.navCtrl.setRoot(TabsPage);
  }

}
