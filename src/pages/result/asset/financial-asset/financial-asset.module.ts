import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FinancialAssetPage } from './financial-asset';

@NgModule({
  declarations: [
    FinancialAssetPage,
  ],
  imports: [
    IonicPageModule.forChild(FinancialAssetPage),
  ],
})
export class FinancialAssetPageModule {}
