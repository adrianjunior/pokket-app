import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NonFinancialAssetPage } from './non-financial-asset';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    NonFinancialAssetPage,
  ],
  imports: [
    IonicPageModule.forChild(NonFinancialAssetPage),
    ChartsModule
  ],
})
export class NonFinancialAssetPageModule {}
