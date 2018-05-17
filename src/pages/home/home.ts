import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  formTutorialPage = `FormTutorialPage`;
  navGraficosPage = `GraficosPage`; // Navegacao ate os graficos

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {}

  public doughnutChartLabels:string[] = ['Dados 1','Dados 2', 'Dados 3'];
  public doughnutChartData:number[] = [1500,3000,1235];
  public doughnutChartType:string = 'doughnut';
}
