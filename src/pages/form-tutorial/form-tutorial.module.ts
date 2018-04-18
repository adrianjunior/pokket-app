import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormTutorialPage } from './form-tutorial';

@NgModule({
  declarations: [
    FormTutorialPage,
  ],
  imports: [
    IonicPageModule.forChild(FormTutorialPage),
  ],
  exports: [
    FormTutorialPage
  ]
})
export class FormTutorialPageModule {}
