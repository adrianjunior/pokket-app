import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-income',
  templateUrl: 'income.html',
})
export class IncomePage {

  formListPage = `FormListPage`;
  graficos: string = 'pie';

  data = []

  constructor(public navCtrl: NavController, private storage: Storage) {
  }

  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';

  public BarChartLabels: string[] = ["Apressados", "Com Calma", "Tranquilos"];
  public BarChartType: string = 'bar';
  public BarChartDataSets: Object = [
    {
      label: 'Meus: ',
      data: [12, 50, 20],
      borderWidth: 1
    },
    {
      label: 'Abreu: ',
      data: [70, 30, 10],
      borderWidth: 1
    }
  ];

  public BarObjectOptions: Object = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  public barChartColors: Array<any> = [
    {
      backgroundColor: '#1d1de2',
      borderColor: '#1d1de2',
      pointBackgroundColor: '#1d1de2',
      pointBorderColor: '#1d1de2',
      pointHoverBackgroundColor: '#1d1de2',
      pointHoverBorderColor: '#1d1de2',
      labels: '#1d1de2'
    },
    {
      backgroundColor: '#1d1de2',
      borderColor: '#1d1de2',
      pointBackgroundColor: '#1d1de2',
      pointBorderColor: '#1d1de2',
      pointHoverBackgroundColor: '#1d1de2',
      pointHoverBorderColor: '#1d1de2',
      labels: '#1d1de2'
    },
    {
      backgroundColor: '#3F51B5',
      borderColor: '#3F51B5',
      pointBackgroundColor: '#3F51B5',
      pointBorderColor: '#3F51B5',
      pointHoverBackgroundColor: '#3F51B5',
      pointHoverBorderColor: '#3F51B5',
      labels: '#3F51B5'
    }
  ];

  ionViewWillEnter() {
    this.storage.get('Receitas')
      .then( value => {
        this.data = value;
        console.log(this.data);

        for(let d of this.data) {
          this.doughnutChartLabels.push(d.name);
          this.doughnutChartData.push(d.value);
        }
      })
  }
}
