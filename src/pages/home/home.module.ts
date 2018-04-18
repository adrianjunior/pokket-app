import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ResultPageModule } from '../result/result.module';
import { FormPageModule } from '../form/form.module';

@NgModule({
  declarations: [HomePage],
  imports: [IonicPageModule.forChild(HomePage), FormPageModule, ResultPageModule],
  exports: [HomePage]
})
export class HomePageModule { }