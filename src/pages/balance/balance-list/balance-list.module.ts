import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BalanceListPage } from './balance-list';

@NgModule({
  declarations: [
    BalanceListPage,
  ],
  imports: [
    IonicPageModule.forChild(BalanceListPage),
  ],
})
export class BalanceListPageModule {}
