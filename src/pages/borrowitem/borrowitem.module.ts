import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BorrowitemPage } from './borrowitem';

@NgModule({
  declarations: [
    BorrowitemPage,
  ],
  imports: [
    IonicPageModule.forChild(BorrowitemPage),
  ],
})
export class BorrowitemPageModule {}
