import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormListPage } from './form-list';

@NgModule({
  declarations: [
    FormListPage,
  ],
  imports: [
    IonicPageModule.forChild(FormListPage),
  ],
  exports: [
    FormListPage
  ]
})
export class FormListPageModule {}
