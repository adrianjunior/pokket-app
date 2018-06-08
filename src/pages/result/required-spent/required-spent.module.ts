import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequiredSpentPage } from './required-spent';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    RequiredSpentPage,
  ],
  imports: [
    IonicPageModule.forChild(RequiredSpentPage),
    ChartsModule
  ],
})
export class RequiredSpentPageModule {}
