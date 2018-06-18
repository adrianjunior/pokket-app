import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';

import colors from '../../../../assets/data/colors';
import { Category } from '../../../../assets/data/category.interface';
import categories from '../../../../assets/data/categories';

@IonicPage()
@Component({
  selector: 'page-optional-fixed-spent',
  templateUrl: 'optional-fixed-spent.html',
})
export class OptionalFixedSpentPage {
  @ViewChild('chart') chart;
  chartEl: any;

  formPage = `FormPage`;

  data: any[] = [];
  haveData: boolean;
  category: Category;

  constructor(public navCtrl: NavController, private storage: Storage) {
  }

  chartData:number[] = [];
  chartLabels:string[] = [];
  chartType:string = 'pie';

  ionViewWillEnter() {
    this.category = categories[2];
    this.storage.get(this.category.name)
      .then( value => {
        this.data = value;

        this.chartData = [];
        this.chartLabels = [];
        if(this.data != null) {
          this.data.forEach((data, index) => {
            this.chartData = [...this.chartData, this.data[index].value]
            this.chartLabels = [...this.chartLabels, this.data[index].name]
          });
          this.createChart();
          this.haveData = true;
        } else {
          this.haveData = false;
        }
        console.log(this.chartData);
        console.log(this.chartLabels);
      })
  }

  createChart() {
    Chart.defaults.global.legend.position = 'top';
    this.chartEl = new Chart(this.chart.nativeElement, {
      type: this.chartType,
        data: {
          labels: this.chartLabels,
          datasets: [{
              label                 : 'Desembolsos Fixos Não-Obrigatórios',
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
