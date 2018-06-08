import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DebtPage } from './debt';

@NgModule({
  declarations: [
    DebtPage,
  ],
  imports: [
    IonicPageModule.forChild(DebtPage),
  ],
})
export class DebtPageModule {}
