import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DebtPage } from './debt';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    DebtPage,
  ],
  imports: [
    IonicPageModule.forChild(DebtPage),
    ChartsModule
  ],
})
export class DebtPageModule {}
