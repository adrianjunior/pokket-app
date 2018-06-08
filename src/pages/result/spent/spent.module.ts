import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpentPage } from './spent';

@NgModule({
  declarations: [
    SpentPage,
  ],
  imports: [
    IonicPageModule.forChild(SpentPage),
  ],
})
export class SpentPageModule {}
