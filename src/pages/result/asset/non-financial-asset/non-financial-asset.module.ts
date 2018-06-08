import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NonFinancialAssetPage } from './non-financial-asset';

@NgModule({
  declarations: [
    NonFinancialAssetPage,
  ],
  imports: [
    IonicPageModule.forChild(NonFinancialAssetPage),
  ],
})
export class NonFinancialAssetPageModule {}
