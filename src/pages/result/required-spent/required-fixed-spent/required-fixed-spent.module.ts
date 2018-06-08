import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequiredFixedSpentPage } from './required-fixed-spent';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    RequiredFixedSpentPage,
  ],
  imports: [
    IonicPageModule.forChild(RequiredFixedSpentPage),
    ChartsModule
  ],
})
export class RequiredFixedSpentPageModule {}
