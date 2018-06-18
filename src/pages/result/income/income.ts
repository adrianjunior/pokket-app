import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ThrowStmt } from '@angular/compiler';
import { Chart } from 'chart.js';

import colors from '../../../assets/data/colors';
import { Category } from '../../../assets/data/category.interface';
import categories from '../../../assets/data/categories';

@IonicPage()
@Component({
  selector: 'page-income',
  templateUrl: 'income.html',
})
export class IncomePage implements OnInit {
  @ViewChild('chart') chart;
  chartEl: any;

  formPage = `FormPage`;

  data: any[] = [];
  haveData: boolean;
  category: Category;
  diagnosticNumber: number;

  section: string;

  constructor(public navCtrl: NavController, private storage: Storage,
    private navParams: NavParams, public appCtrl: App, public viewCtrl: ViewController) {
  }

  chartData: number[] = [];
  chartLabels: string[] = [];
  chartType: string = 'pie';

  ngOnInit() {
    this.section = 'receitas';
    this.diagnosticNumber = this.navParams.get('number');
  }

  ionViewWillEnter() {
    this.category = categories[0];
    this.storage.get(`${this.category.name} ${this.diagnosticNumber}`)
      .then(value => {
        this.data = value;

        this.chartData = [];
        this.chartLabels = [];
        if (this.data != null) {
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
          label: 'Suas Receitas',
          data: this.chartData,
          duration: 1000,
          easing: 'easeInQuart',
          backgroundColor: colors
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        animation: {
          duration: 3000
        }
      }
    });
  }

  onSelect() {
    switch (this.section) {
      case 'dfo':
        this.navCtrl.setRoot(`HomePage`, { number: this.diagnosticNumber, goto: `RequiredFixedSpentPage` });
        break;
      case 'dfno':
        this.navCtrl.setRoot(`HomePage`, { number: this.diagnosticNumber, goto: `OptionaFixedSpentPage` });
        break;
      case 'dvo':
        this.navCtrl.setRoot(`HomePage`, { number: this.diagnosticNumber, goto: `RequiredVariableSpentPage` });
        break;
      case 'dvno':
        this.navCtrl.setRoot(`HomePage`, { number: this.diagnosticNumber, goto: `OptionaVariableSpentPage` });
        break;
    }
  }
}
