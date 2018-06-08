import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequiredVariableSpentPage } from './required-variable-spent';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    RequiredVariableSpentPage,
  ],
  imports: [
    IonicPageModule.forChild(RequiredVariableSpentPage),
    ChartsModule
  ],
})
export class RequiredVariableSpentPageModule {}
