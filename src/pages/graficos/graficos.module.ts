import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GraficosPage } from './graficos';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  declarations: [
    GraficosPage,
  ],
  imports: [
    IonicPageModule.forChild(GraficosPage),
    ChartsModule
  ],
})
export class GraficosPageModule {}
