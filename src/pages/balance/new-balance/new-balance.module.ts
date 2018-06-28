import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewBalancePage } from './new-balance';

@NgModule({
  declarations: [
    NewBalancePage,
  ],
  imports: [
    IonicPageModule.forChild(NewBalancePage),
  ],
})
export class NewBalancePageModule {}
