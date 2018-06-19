import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewProjectionPage } from './new-projection';

@NgModule({
  declarations: [
    NewProjectionPage,
  ],
  imports: [
    IonicPageModule.forChild(NewProjectionPage),
  ],
})
export class NewProjectionPageModule {}
