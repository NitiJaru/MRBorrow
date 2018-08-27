import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-grantee',
  templateUrl: 'grantee.html',
})
export class GranteePage {

  model: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient, private userSvc: UserServiceProvider,private alertCtrl: AlertController) {
    this.model = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GranteePage');
  }

  cancel(){
    this.navCtrl.pop();
  }

  submit(){
    
    let option = { "headers": { "Content-Type": "application/json" }};
    this.httpClient.post("https://mrborrowapi.azurewebsites.net/api/slot/ConsentGuarantor/" + this.model._id + "/" + this.userSvc.Username,{},option)
    .subscribe((data:any)=>{

      let alert = this.alertCtrl.create({
        title: 'ค้ำประกันสำเร็จ',
        buttons: [
          {
            text: 'ตกลง',
            role: 'cancel',
            handler: () => { this.navCtrl.popToRoot(); }
          }
        ]
      });
      alert.present();
      
    },error=>{
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
