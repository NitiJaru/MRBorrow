import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the CreateBlockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-block',
  templateUrl: 'create-block.html',
})
export class CreateBlockPage {
 item: any = {name: "", row:"" ,column:""};
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateBlockPage');
  }

  createdata(){
  this.httpClient.post("http://mrborrowapi.azurewebsites.net/api/Slot/CreateItem",
   this.item,{headers: { 'Content-Type': 'application/json' }}).subscribe((item:any)=>{
    // alert(JSON.stringify(data));
    console.log(this.item)
  },
  error=>{
    alert("Error: " + error + "\nError message: " + error.message + "\nError result: " + error.error)
  })


  this.navCtrl.pop();
  }

  // createdata(){

  //   console.log(this.item);
  // }


}
