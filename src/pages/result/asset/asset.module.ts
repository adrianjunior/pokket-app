import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssetPage } from './asset';

@NgModule({
  declarations: [
    AssetPage,
  ],
  imports: [
    IonicPageModule.forChild(AssetPage),
  ],
})
export class AssetPageModule {}
