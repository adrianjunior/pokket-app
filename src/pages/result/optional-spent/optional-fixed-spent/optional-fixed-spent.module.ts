import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OptionalFixedSpentPage } from './optional-fixed-spent';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    OptionalFixedSpentPage,
  ],
  imports: [
    IonicPageModule.forChild(OptionalFixedSpentPage),
    ChartsModule
  ],
})
export class OptionalFixedSpentPageModule {}
