import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncomePage } from './income';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    IncomePage,
  ],
  imports: [
    IonicPageModule.forChild(IncomePage),
    ChartsModule
  ],
})
export class IncomePageModule {}
