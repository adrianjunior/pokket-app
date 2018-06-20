import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ThrowStmt } from '@angular/compiler';
import { Chart } from 'chart.js';

import colors from '../../assets/data/colors';
import { Category } from '../../assets/data/category.interface';
import categories from '../../assets/data/categories';
import { Diagnostic } from '../../assets/data/diagnostic.interface';
import { Projection } from '../../assets/data/projection.interface';
import { NewProjectionPage } from './new-projection/new-projection';

@IonicPage()
@Component({
  selector: 'page-projection',
  templateUrl: 'projection.html',
})
export class ProjectionPage implements OnInit {
  @ViewChild('chart') chart;
  chartEl: any;

  data: any[] = [];

  balanceName: string;
  balanceNumber: number;
  diagnostics: Diagnostic[] = [];
  dates: string[] = [];

  section: string;
  haveData: boolean;

  chartData = [];
  chartLabels = [];
  chartType: string = 'line';

  constructor(public navCtrl: NavController, private storage: Storage,
    private navParams: NavParams, public appCtrl: App, public viewCtrl: ViewController) {
  }

  ngOnInit() {
    this.balanceName = this.navParams.get('balanceName');
    this.balanceNumber = this.navParams.get('balanceNumber');
    this.diagnostics = this.navParams.get('diagnostics');
    this.diagnostics.forEach(diagnostic => {
      this.dates.push(diagnostic.date);
    });
    this.chartData = [];
    this.chartLabels = [];
    this.section = 'geral';
    this.loadData(null, `Total Balance Values`);
  }

  onSelectSection() {
    switch (this.section) {
      case 'geral':
        this.loadData(null, 'Total Balance Values');
        break;
      case 'desembolsos':
        this.loadData(null, 'Total Spent Values');
        break;
    }
  }

  loadData(categoryNumber: number, categoryName: string) {
    console.log('CHAVE:')
    console.log(`${categoryName} Balanço ${this.balanceNumber}`);
    this.storage.get(`${categoryName} Balanço ${this.balanceNumber}`)
      .then(value => {
        this.data = value;
        console.log('DATA: ');
        console.log(value);
        for(let i = 0; i < 6; i++) {
          this.chartLabels[i] = [];
          this.chartData[i]= [];
        }
        if (this.data != null) {
          this.data.forEach((data, index) => {
            data.forEach((element, jindex) => {
              this.chartLabels[jindex][index] = element.name;
              this.chartData[jindex][index] = element.value;
            }); 
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

  createChart(categoryName: string) {
    Chart.defaults.global.legend.position = 'top';
    this.chartEl = new Chart(this.chart.nativeElement, {
      type: this.chartType,
      data: {
        labels: this.dates,
        datasets: [],
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
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    this.chartLabels.forEach((labelDataset, index) => {
      if(labelDataset.length != 0) {
        console.log(labelDataset)
        this.chartEl.data.datasets.push({
          label: labelDataset[0],
          data: this.chartData[index],
          duration: 500,
          easing: 'easeInQuart',
          fill: false,
          borderColor: colors[index],
          borderWidth: 3,
          backgroundColor: colors[index],
          lineTension: 1,
          pointRadius: 3
        })
        this.chartEl.update();
      }
    })
  }

  goBack() {
    this.navCtrl.setRoot(`HomePage`, {}, {animate: true, direction: 'forward'});
  }
}
