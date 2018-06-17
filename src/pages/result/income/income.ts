import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ThrowStmt } from '@angular/compiler';
import { Chart } from 'chart.js';

import colors from '../../../assets/data/colors';

@IonicPage()
@Component({
  selector: 'page-income',
  templateUrl: 'income.html',
})
export class IncomePage {
  @ViewChild('chart') chart;
  chartEl: any;

  formListPage = `FormListPage`;
  graficos: string = 'pie';

  data: any[] = [];

  constructor(public navCtrl: NavController, private storage: Storage) {
  }

  chartData:number[] = [];
  chartLabels:string[] = [];
  chartType:string = 'doughnut';

  ionViewWillEnter() {
    this.storage.get('Receitas')
      .then( value => {
        this.data = value;

        this.chartData = [];
        this.chartLabels = [];
        this.data.forEach((data, index) => {
          this.chartData = [...this.chartData, this.data[index].value]
          this.chartLabels = [...this.chartLabels, this.data[index].name]
        });
        console.log(this.chartData);
        console.log(this.chartLabels);
        this.createChart();
      })
  }

  createChart() {
    Chart.defaults.global.legend.position = 'bottom';
    this.chartEl = new Chart(this.chart.nativeElement, {
      type: 'pie',
        data: {
          labels: this.chartLabels,
          datasets: [{
              label                 : 'Suas Receitas',
              data                  : this.chartData,
              duration              : 1000,
              easing                : 'easeInQuart',
              backgroundColor       : colors
          }]
        },
        options : {
          maintainAspectRatio: false,
          responsive: true,
          animation: {
              duration : 3000
          }
        }
    });
  }
}
