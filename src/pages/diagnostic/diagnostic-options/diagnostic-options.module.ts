import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiagnosticOptionsPage } from './diagnostic-options';

@NgModule({
  declarations: [
    DiagnosticOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(DiagnosticOptionsPage),
  ]
})
export class DiagnosticOptionsPageModule {}
