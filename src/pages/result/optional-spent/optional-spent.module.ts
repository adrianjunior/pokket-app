import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OptionalSpentPage } from './optional-spent';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    OptionalSpentPage,
  ],
  imports: [
    IonicPageModule.forChild(OptionalSpentPage),
    ChartsModule
  ],
})
export class OptionalSpentPageModule {}
