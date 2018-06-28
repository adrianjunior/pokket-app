import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiagnosticResultPage } from './diagnostic-result';

@NgModule({
  declarations: [
    DiagnosticResultPage,
  ],
  imports: [
    IonicPageModule.forChild(DiagnosticResultPage),
  ],
})
export class DiagnosticResultPageModule {}
