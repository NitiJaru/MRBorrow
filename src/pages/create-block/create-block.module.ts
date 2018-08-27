import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateBlockPage } from './create-block';

@NgModule({
  declarations: [
    CreateBlockPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateBlockPage),
  ],
})
export class CreateBlockPageModule {}
