import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController, ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { Diagnostic } from '../../../assets/data/diagnostic.interface';
import { Balance } from '../../../assets/data/balance.interface';


@IonicPage()
@Component({
  selector: 'page-new-balance',
  templateUrl: 'new-balance.html',
})
export class NewBalancePage implements OnInit{

  loader = this.loadingCtrl.create({
    content: `Gerando seu Balanço Financeiro...`
  });
  balanceResultPage = `BalanceResultPage`;

  diagnostics: Diagnostic[] = [];
  balanceList: Balance[] = [];
  chosenDiagnostics: Diagnostic[] = [];
  number: number;
  balance: Balance;

  chosenDiagnosticsNumber: number;
  chosenTimeGap: number;
  chosenName: string;

  incomes: {name: string, value: number}[] = [];
  requiredFixedSpents: {name: string, value: number}[] = [];
  requiredVariableSpents: {name: string, value: number}[] = [];
  optionalFixedSpents: {name: string, value: number}[] = [];
  optionalVariableSpents: {name: string, value: number}[] = [];
  balances: {name: string, value: number}[] = [];
  spents: {name: string, value: number}[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public storage: Storage,
    public toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.number = this.navParams.get('number');
    this.balanceList = this.navParams.get('balances');
    this.diagnostics = this.navParams.get('diagnostics');
    this.chosenDiagnostics = [];
    this.chosenDiagnosticsNumber = -1;
    this.chosenTimeGap = -1;
    this.chosenName = '';
  }

  dismiss() {
    let alert = this.alertCtrl.create({
      title: 'Tem certeza?',
      subTitle: 'Caso volte agora, todo seu progresso será perdido.',
      buttons: [{
        text: 'Sim, tenho certeza!',
        handler: () => {
          this.viewCtrl.dismiss();
        }
      }, {
        text: 'Não, quero ficar.', 
      }]
    });
    alert.present();
  }

  onGenerateBalance() {
    this.loader.present();
    let d = this.diagnostics.reverse();
    d = d.slice(0, this.chosenDiagnosticsNumber);
    d = d.reverse();
    console.log('CDN: ' + this.chosenDiagnosticsNumber)
    for(let i = 0; i < this.chosenDiagnosticsNumber; i++){
      this.chosenDiagnostics.push(d[i]);
      console.log('CDs: ' + this.chosenDiagnostics)
    }
    const date = new Date();
    this.balance = {
      id: this.number,
      name: this.chosenName,
      date: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`,
      diagnostics: this.chosenDiagnostics
    }
    console.log('Balance: ')
    console.log(this.balance)
    this.storage.set(`Balanços`, [...this.balanceList, this.balance])
      .then(() => {
        this.onLoadDiagnostic();
      })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: `Não foi possível gerar o balanço. :(`,
          duration: 3000
        });
        toast.present();
        this.loader.dismiss();
        console.log(`Erro no Balanços ` + err)
      })
  }

  onLoadDiagnostic() {
    for (let i = 0; i < this.chosenDiagnosticsNumber; i++){
      this.onLoadSpents(i);
    }
  }

  onLoadSpents(i: number) {
    this.storage.get(`Total Spent Values ${this.chosenDiagnostics[i].id}`)
    .then(value => {
      this.spents.push(value);
      this.onLoadBalance(i);
    })
    .catch(err => {
      let toast = this.toastCtrl.create({
        message: `Não foi possível gerar o balanço. :(`,
        duration: 3000
      });
      toast.present();
      this.loader.dismiss();
      console.log(`Erro no Total Spent Values ${this.chosenDiagnostics[i].id}`)
      this.balanceList.pop();
      this.storage.set(`Balanços`, this.balanceList);
    })
  }

  onLoadBalance(i: number) {
    this.storage.get(`Total Balance Values ${this.chosenDiagnostics[i].id}`)
    .then(value => {
      this.balances.push(value);
      if(i == this.chosenDiagnosticsNumber-1) {
        this.onWriteBalance();
      }
    })
    .catch(err => {
      let toast = this.toastCtrl.create({
        message: `Não foi possível gerar o balanço. :(`,
        duration: 3000
      });
      toast.present();
      this.loader.dismiss();
      console.log(`Erro no Total Balance Values ${this.chosenDiagnostics[i].id}`)
      this.balanceList.pop();
      this.storage.set(`Balanços`, this.balanceList);
    })
  }

  onWriteBalance() {
    this.onWriteSpents();
  }

  onWriteSpents() {
    this.storage.set(`Total Spent Values Balanço ${this.number}`, this.spents)
      .then(() => {
        this.onWriteBalances();
      })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: `Não foi possível gerar o balanço. :(`,
          duration: 3000
        });
        toast.present();
        this.loader.dismiss();
        console.log(`Erro no Total Spent Values Balanço ${this.number}`)
        this.balanceList.pop();
        this.storage.set(`Balanços`, this.balanceList);
      })
  }

  onWriteBalances() {
    this.storage.set(`Total Balance Values Balanço ${this.number}`, this.balances)
      .then(() => {
        let toast = this.toastCtrl.create({
          message: `Balanço gerado com sucesso!`,
          duration: 3000
        });
        toast.present();
        this.loader.dismiss();
        this.navCtrl.push(this.balanceResultPage, {
          balanceNumber: this.number, balanceName: this.chosenName, diagnostics: this.diagnostics
        });
        this.viewCtrl.dismiss();
      })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: `Não foi possível gerar o balanço. :(`,
          duration: 3000
        });
        toast.present();
        this.loader.dismiss();
        console.log(`Erro no Total Balance Values Balanço ${this.number}`)
        this.balanceList.pop();
        this.storage.set(`Balanços`, this.balanceList);
      })
  }
}
