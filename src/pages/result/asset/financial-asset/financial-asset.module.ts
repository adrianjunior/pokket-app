import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FinancialAssetPage } from './financial-asset';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    FinancialAssetPage,
  ],
  imports: [
    IonicPageModule.forChild(FinancialAssetPage),
    ChartsModule
  ],
})
export class FinancialAssetPageModule {}
