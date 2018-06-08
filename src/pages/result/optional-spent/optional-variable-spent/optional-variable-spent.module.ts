import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OptionalVariableSpentPage } from './optional-variable-spent';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    OptionalVariableSpentPage,
  ],
  imports: [
    IonicPageModule.forChild(OptionalVariableSpentPage),
    ChartsModule
  ],
})
export class OptionalVariableSpentPageModule {}
