import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    ChartsModule
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}
