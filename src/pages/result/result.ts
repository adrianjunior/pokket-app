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
  category: Category;
  diagnosticNumber: number;
  categoryNumber: number;

  section: string;
  spentType: string;

  haveData: boolean;
  isEditable: boolean;
  isSpent: boolean;

  constructor(public navCtrl: NavController, private storage: Storage,
    private navParams: NavParams, public appCtrl: App, public viewCtrl: ViewController) {
  }

  chartData: number[] = [];
  chartLabels: string[] = [];
  chartType: string = 'pie';

  ngOnInit() {
    this.section = 'receitas';
    this.spentType = 'todos';
    this.isSpent = false;
    this.isEditable = true;
    this.diagnosticNumber = this.navParams.get('number');
    this.categoryNumber = 0;
    this.category = categories[0];
  }

  ionViewWillEnter() {
    this.loadData(this.categoryNumber, this.category.name);
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
          duration: 500,
          easing: 'easeInQuart',
          backgroundColor: colors
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        animation: {
          duration: 1000
        },
        legend: {
          labels: {
              fontFamily: 'Roboto',
          }
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              let dataset = data.datasets[tooltipItem.datasetIndex];
              let meta = dataset._meta[Object.keys(dataset._meta)[0]];
              let total = meta.total;
              let currentValue = dataset.data[tooltipItem.index];
              let percentage = parseFloat((currentValue/total*100).toFixed(1));
              return currentValue + ' (' + percentage + '%)';
            },
            title: function(tooltipItem, data) {
              return data.labels[tooltipItem[0].index];
            }
          }
        },
      }
    });
  }

  onSelectSection() {
    switch (this.section) {
      case 'receitas':
        this.categoryNumber = 0;
        this.category = categories[0];
        this.isEditable = true;
        this.isSpent = false;
        this.spentType = 'todos';
        this.loadData(this.categoryNumber, this.category.name);
        break;
      case 'desembolsos':
        this.isSpent = true;
        this.loadData(null, 'Total Spent Values');
        this.isEditable = false;
        break;
      case 'geral':
        this.loadData(null, 'Total Balance Values');
        this.isEditable = false;
        this.isSpent = false;
        break;
    }
    console.log(this.category);
  }

  onSelectSpentType() {
    switch (this.spentType) {
      case 'todos':
        this.loadData(null, 'Total Spent Values');
        this.isEditable = false;
        break;
      case 'dfo':
        this.categoryNumber = 1;
        this.category = categories[1];
        this.loadData(this.categoryNumber, this.category.name);
        this.isEditable = true;
        break;
      case 'dfno':
        this.categoryNumber = 2;
        this.category = categories[2];
        this.loadData(this.categoryNumber, this.category.name);
        this.isEditable = true;
        break;
      case 'dvo':
        this.categoryNumber = 3;
        this.category = categories[3];
        this.loadData(this.categoryNumber, this.category.name);
        this.isEditable = true;
        break;
      case 'dvno':
        this.categoryNumber = 4;
        this.category = categories[4];
        this.loadData(this.categoryNumber, this.category.name);
        this.isEditable = true;
        break;
    }
    console.log(this.category);
  }

  loadData(categoryNumber: number, categoryName: string) {
    console.log('CHAVE:')
    console.log(`${categoryName} ${this.diagnosticNumber}`);
    this.storage.get(`${categoryName} ${this.diagnosticNumber}`)
      .then(value => {
        this.data = value;
        console.log('DATA: ');
        console.log(value);
        this.chartData = [];
        this.chartLabels = [];
        if (this.data != null) {
          this.data.forEach((data, index) => {
            this.chartData = [...this.chartData, this.data[index].value]
            this.chartLabels = [...this.chartLabels, this.data[index].name]
          });
          this.haveData = true;
          this.createChart(categoryName);
        } else {
          this.haveData = false;
          this.createChart(categoryName);
        }
        console.log(this.chartData);
        console.log(this.chartLabels);
      })
  }

  goToForm() {
    this.navCtrl.push(`FormPage`, {
      category: this.category,
      number: this.diagnosticNumber
    })
  }
}
