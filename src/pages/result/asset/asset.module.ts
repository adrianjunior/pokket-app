import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssetPage } from './asset';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AssetPage,
  ],
  imports: [
    IonicPageModule.forChild(AssetPage),
    ChartsModule
  ],
})
export class AssetPageModule {}
