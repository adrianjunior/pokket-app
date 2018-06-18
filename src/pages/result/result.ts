import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ThrowStmt } from '@angular/compiler';
import { Chart } from 'chart.js';

import colors from '../../assets/data/colors';
import { Category } from '../../assets/data/category.interface';
import categories from '../../assets/data/categories';

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {
  @ViewChild('chart') chart;
  chartEl: any;

  formPage = `FormPage`;

  data: any[] = [];
  haveData: boolean;
  category: Category;
  diagnosticNumber: number;
  categoryNumber: number;

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
    this.categoryNumber = 0;
  }

  ionViewWillEnter() {
    this.loadData(this.categoryNumber);
  }

  createChart(categoryName: string) {
    Chart.defaults.global.legend.position = 'top';
    this.chartEl = new Chart(this.chart.nativeElement, {
      type: this.chartType,
      data: {
        labels: this.chartLabels,
        datasets: [{
          label: categoryName,
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
      case 'receitas':
        this.categoryNumber = 0;
        break;
      case 'dfo':
        this.categoryNumber = 1;
        break;
      case 'dfno':
        this.categoryNumber = 2;
        break;
      case 'dvo':
        this.categoryNumber = 3;
        break;
      case 'dvno':
        this.categoryNumber = 4;
        break;
    }
    this.loadData(this.categoryNumber);
  }

  loadData(categoryNumber: number) {
    this.category = categories[categoryNumber];
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
          this.createChart(this.category.name);
          this.haveData = true;
        } else {
          this.haveData = false;
        }
        console.log(this.chartData);
        console.log(this.chartLabels);
      })
  }
}
