import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiagnosticFormPage } from './diagnostic-form';

@NgModule({
  declarations: [
    DiagnosticFormPage,
  ],
  imports: [
    IonicPageModule.forChild(DiagnosticFormPage),
  ],
})
export class DiagnosticFormPageModule {}
