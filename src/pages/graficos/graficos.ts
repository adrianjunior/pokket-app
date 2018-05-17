import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-graficos',
  templateUrl: 'graficos.html',
  
})


export class GraficosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public doughnutChartLabels:string[] = ['Dados 1','Dados 2', 'Dados 3'];
  public doughnutChartData:number[] = [1500,3000,1235];
  public doughnutChartType:string = 'doughnut';

  ionViewDidLoad() {
    console.log('ionViewDidLoad GraficosPage');
  }

  onGoBack() {
    this.navCtrl.popToRoot();
  }
  

}
