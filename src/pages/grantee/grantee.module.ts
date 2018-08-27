import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GranteePage } from './grantee';

@NgModule({
  declarations: [
    GranteePage,
  ],
  imports: [
    IonicPageModule.forChild(GranteePage),
  ],
})
export class GranteePageModule {}
