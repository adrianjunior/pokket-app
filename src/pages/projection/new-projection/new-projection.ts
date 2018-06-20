import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController, ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { Diagnostic } from '../../../assets/data/diagnostic.interface';
import { Projection } from '../../../assets/data/projection.interface';


@IonicPage()
@Component({
  selector: 'page-new-projection',
  templateUrl: 'new-projection.html',
})
export class NewProjectionPage implements OnInit{

  loader = this.loadingCtrl.create({
    content: `Gerando seu Balanço Financeiro...`
  });
  projectionPage = `ProjectionPage`;

  diagnostics: Diagnostic[] = [];
  projections: Projection[] = [];
  chosenDiagnostics: Diagnostic[] = [];
  number: number;
  projection: Projection;

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
    this.projections = this.navParams.get('projections');
    this.diagnostics = this.navParams.get('diagnostics');
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
    this.chosenDiagnostics = this.diagnostics.reverse();
    const date = new Date();
    this.projection = {
      id: this.number,
      name: this.chosenName,
      date: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`,
      diagnostics: this.chosenDiagnostics
    }
    this.storage.set(`Balanços`, [...this.projections, this.projection])
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
        console.log(`Erro no Balanços`)
      })
  }

  onLoadDiagnostic() {
    for (let i = 0; i < this.chosenDiagnosticsNumber; i++){
      this.onLoadIncomes(i);
    }
  }

  onLoadIncomes(i: number) {
    this.storage.get(`Receitas Balanço ${this.chosenDiagnostics[i].id}`)
    .then(value => {
      this.incomes.push(value);
      this.onLoadRequiredFixedSpent(i);
    })
    .catch(err => {
      let toast = this.toastCtrl.create({
        message: `Não foi possível gerar o balanço. :(`,
        duration: 3000
      });
      toast.present();
      this.loader.dismiss();
      console.log(`Erro no Receitas ${this.chosenDiagnostics[i].id}`)
      this.projections.pop();
      this.storage.set(`Balanços`, this.projections);
    })
  }

  onLoadRequiredFixedSpent(i: number) {
    this.storage.get(`Desembolso Fixo Obrigatório ${this.chosenDiagnostics[i].id}`)
    .then(value => {
      this.requiredFixedSpents.push(value);
      this.onLoadRequiredVariableSpent(i);
    })
    .catch(err => {
      let toast = this.toastCtrl.create({
        message: `Não foi possível gerar o balanço. :(`,
        duration: 3000
      });
      toast.present();
      this.loader.dismiss();
      console.log(`Erro no Desembolso Fixo Obrigatório ${this.chosenDiagnostics[i].id}`)
      this.projections.pop();
      this.storage.set(`Balanços`, this.projections);
    })
  }

  onLoadRequiredVariableSpent(i: number) {
    this.storage.get(`Desembolso Variável Obrigatório ${this.chosenDiagnostics[i].id}`)
    .then(value => {
      this.requiredVariableSpents.push(value);
      this.onLoadOptionalVariableSpent(i);
    })
    .catch(err => {
      let toast = this.toastCtrl.create({
        message: `Não foi possível gerar o balanço. :(`,
        duration: 3000
      });
      toast.present();
      this.loader.dismiss();
      console.log(`Erro no Desembolso Variável Obrigatório ${this.chosenDiagnostics[i].id}`)
      this.projections.pop();
      this.storage.set(`Balanços`, this.projections);
    })
  }

  onLoadOptionalVariableSpent(i: number) {
    this.storage.get(`Desembolso Variável Não-Obrigatório ${this.chosenDiagnostics[i].id}`)
    .then(value => {
      this.optionalVariableSpents.push(value);
      this.onLoadOptionalFixedSpent(i);
    })
    .catch(err => {
      let toast = this.toastCtrl.create({
        message: `Não foi possível gerar o balanço. :(`,
        duration: 3000
      });
      toast.present();
      this.loader.dismiss();
      console.log(`Erro no Desembolso Variável Não-Obrigatório ${this.chosenDiagnostics[i].id}`)
      this.projections.pop();
      this.storage.set(`Balanços`, this.projections);
    })
  }

  onLoadOptionalFixedSpent(i: number) {
    this.storage.get(`Desembolso Fixo Não-Obrigatório ${this.chosenDiagnostics[i].id}`)
    .then(value => {
      this.optionalFixedSpents.push(value);
      this.onLoadSpents(i);
    })
    .catch(err => {
      let toast = this.toastCtrl.create({
        message: `Não foi possível gerar o balanço. :(`,
        duration: 3000
      });
      toast.present();
      this.loader.dismiss();
      console.log(`Erro no Desembolso Fixo Não-Obrigatório ${this.chosenDiagnostics[i].id}`)
      this.projections.pop();
      this.storage.set(`Balanços`, this.projections);
    })
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
      this.projections.pop();
      this.storage.set(`Balanços`, this.projections);
    })
  }

  onLoadBalance(i: number) {
    this.storage.get(`Total Balance Values ${this.chosenDiagnostics[i].id}`)
    .then(value => {
      this.balances.push(value);
      if(i == this.chosenDiagnosticsNumber-1) {
        this.onWriteProjection();
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
      this.projections.pop();
      this.storage.set(`Balanços`, this.projections);
    })
  }

  onWriteProjection() {
    this.onWriteIncomes();
  }

  onWriteIncomes() {
    this.storage.set(`Receitas Balanço ${this.number}`, this.incomes)
      .then(() => {
        this.onWriteRequiredFixedSpents();
      })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: `Não foi possível gerar o balanço. :(`,
          duration: 3000
        });
        toast.present();
        this.loader.dismiss();
        console.log(`Erro no Receitas Balanço ${this.number}`)
        this.projections.pop();
        this.storage.set(`Balanços`, this.projections);
      })
  }

  onWriteRequiredFixedSpents() {
    this.storage.set(`Desembolso Fixo Obrigatório Balanço ${this.number}`, this.requiredFixedSpents)
      .then(() => {
        this.onWriteRequiredVariableSpents();
      })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: `Não foi possível gerar o balanço. :(`,
          duration: 3000
        });
        toast.present();
        this.loader.dismiss();
        console.log(`Erro no Desembolso Fixo Obrigatório Balanço ${this.number}`)
        this.projections.pop();
        this.storage.set(`Balanços`, this.projections);
      })
  }

  onWriteRequiredVariableSpents() {
    this.storage.set(`Desembolso Variável Obrigatório Balanço ${this.number}`, this.requiredVariableSpents)
      .then(() => {
        this.onWriteOptionalVariableSpent();
      })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: `Não foi possível gerar o balanço. :(`,
          duration: 3000
        });
        toast.present();
        this.loader.dismiss();
        console.log(`Erro no Desembolso Variável Obrigatório Balanço ${this.number}`)
        this.projections.pop();
        this.storage.set(`Balanços`, this.projections);
      })
  }

  onWriteOptionalVariableSpent() {
    this.storage.set(`Desembolso Variável Não-Obrigatório Balanço ${this.number}`, this.optionalVariableSpents)
      .then(() => {
        this.onWriteOptionalFixedSpent();
      })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: `Não foi possível gerar o balanço. :(`,
          duration: 3000
        });
        toast.present();
        this.loader.dismiss();
        console.log(`Erro no Desembolso Variável Não-Obrigatório Balanço ${this.number}`)
        this.projections.pop();
        this.storage.set(`Balanços`, this.projections);
      })
  }

  onWriteOptionalFixedSpent() {
    this.storage.set(`Desembolso Fixo Não-Obrigatório Balanço ${this.number}`, this.optionalFixedSpents)
      .then(() => {
        this.onWriteSpents();
      })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: `Não foi possível gerar o balanço. :(`,
          duration: 3000
        });
        toast.present();
        this.loader.dismiss();
        console.log(`Erro no Desembolso Fixo Não-Obrigatório Balanço ${this.number}`)
        this.projections.pop();
        this.storage.set(`Balanços`, this.projections);
      })
  }

  onWriteSpents() {
    this.storage.set(`Total Spent Values Balanço ${this.number}`, this.spents)
      .then(() => {
        this.onWriteBalance();
      })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: `Não foi possível gerar o balanço. :(`,
          duration: 3000
        });
        toast.present();
        this.loader.dismiss();
        console.log(`Erro no Total Spent Values Balanço ${this.number}`)
        this.projections.pop();
        this.storage.set(`Balanços`, this.projections);
      })
  }

  onWriteBalance() {
    this.storage.set(`Total Balance Values Balanço ${this.number}`, this.balances)
      .then(() => {
        let toast = this.toastCtrl.create({
          message: `Balanço gerado com sucesso!`,
          duration: 3000
        });
        toast.present();
        this.loader.dismiss();
        this.viewCtrl.dismiss();
        this.navCtrl.push(this.projectionPage, {
          balanceNumber: this.number, 
        });
      })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: `Não foi possível gerar o balanço. :(`,
          duration: 3000
        });
        toast.present();
        this.loader.dismiss();
        console.log(`Erro no Total Balance Values Balanço ${this.number}`)
        this.projections.pop();
        this.storage.set(`Balanços`, this.projections);
      })
  }
}