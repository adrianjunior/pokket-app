import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';

import colors from '../../../assets/data/colors';
import { Diagnostic } from '../../../assets/data/diagnostic.interface';

@IonicPage()
@Component({
  selector: 'page-balance-result',
  templateUrl: 'balance-result.html',
})
export class BalanceResultPage implements OnInit {
  @ViewChild('chart') chart;
  chartEl: any;

  data: any[] = [];

  balanceName: string;
  balanceNumber: number;
  diagnostics: Diagnostic[] = [];
  dates: string[] = [];

  section: string;
  haveData: boolean;

  balanceData = [];
  balanceLabels = [];
  spentData = [];
  spentLabels = [];
  chartType: string = 'line';

  balanceIndex: number[] = [];
  spentIndex: number[] = [];

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
    if(categoryName == 'Total Balance Values') {
    
      this.storage.get(`Total Balance Values Balanço ${this.balanceNumber}`)
      .then(value => {
        this.data = value;
        console.log('DATA: ');
        console.log(this.data);
        if (this.data != null) {
          this.data.forEach((data, index) => {
            data.forEach((element, jindex) => {
              this.balanceLabels[jindex] = [];
              this.balanceData[jindex] = [];
            }); 
          });
          this.data.forEach((data, index) => {
            data.forEach((element, jindex) => {
              this.balanceIndex[jindex] = 0;
              this.balanceLabels[jindex][index] = element.name;
              this.balanceData[jindex][index] = element.value;
            }); 
          });
          this.haveData = true;
          this.createChart(categoryName);
        } else {
          this.haveData = false;
          this.createChart(categoryName);
        }
      });

      console.log(`Balance Labels:`);
      console.log(this.balanceData);

    } else if(categoryName == 'Total Spent Values') {
    
      this.storage.get(`Total Spent Values Balanço ${this.balanceNumber}`)
      .then(value => {
        this.data = value;
        if (this.data != null) {
          this.data.forEach((data, index) => {
            data.forEach((element, jindex) => {
              this.spentLabels[jindex] = [];
              this.spentData[jindex] = [];
            }); 
          });
          this.data.forEach((data, index) => {
            data.forEach((element, jindex) => {
              this.spentIndex[jindex] = 0;
              this.spentLabels[jindex][index] = element.name;
              this.spentData[jindex][index] = element.value;
            }); 
          });
          this.haveData = true;
          this.createChart(categoryName);
        } else {
          this.haveData = false;
          this.createChart(categoryName);
        }
      })

    }
    
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
    if(categoryName == 'Total Balance Values') {
      
      this.balanceLabels.forEach((labelDataset, index) => {
        if(labelDataset.length != 0) {
          //console.log(labelDataset)
          this.chartEl.data.datasets.push({
            label: labelDataset[0],
            data: this.balanceData[index],
            duration: 500,
            easing: 'easeInQuart',
            fill: false,
            borderColor: colors[index],
            borderWidth: 3,
            backgroundColor: colors[index],
            lineTension: 0,
            pointRadius: 3
          })
          this.chartEl.update();
        }
      })

    } else if (categoryName == 'Total Spent Values') {

      this.spentLabels.forEach((labelDataset, index) => {
        if(labelDataset.length != 0) {
          //console.log(labelDataset)
          this.chartEl.data.datasets.push({
            label: labelDataset[0],
            data: this.spentData[index],
            duration: 500,
            easing: 'easeInQuart',
            fill: false,
            borderColor: colors[index],
            borderWidth: 3,
            backgroundColor: colors[index],
            lineTension: 0,
            pointRadius: 3
          })
          this.chartEl.update();
        }
      })

    }
  }

  goBack() {
    this.navCtrl.setRoot(`HomePage`, {catcher: true}, {animate: true, direction: 'forward'});
  }
}
