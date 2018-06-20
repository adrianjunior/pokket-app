import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Diagnostic } from '../../../assets/data/diagnostic.interface';
import { Projection } from '../../../assets/data/projection.interface';

@IonicPage()
@Component({
  selector: 'page-new-projection',
  templateUrl: 'new-projection.html',
})
export class NewProjectionPage implements OnInit{

  diagnostics: Diagnostic[] = [];
  projections: Projection[] = [];
  chosenDiagnostics: string[] = [];
  number: number;
  chosenDiagnosticsNumber: number;
  chosenTimeGap: number;
  chosenName: string;

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

  onGenerateProjection() {
    let loader = this.loadingCtrl.create({
      content: `Gerando sua Projeção`
    });
    loader.present();
    this.storage.set(`${this.category.name} ${this.diagnosticNumber}`, val.formArray)
    .then(() => {
      this.setNumber(`${this.category.name} ${this.diagnosticNumber}`, length);
    }) 
    .then(() => {
      this.setTotalSpent(val.formArray, this.totalSpentValue);
    })
    .then(() => {
      this.setBalance(val.formArray, this.totalBalanceValue);
    })
    .then(value => {
      console.log(`Value: ${value}`);
      console.log(value);
      let toast = this.toastCtrl.create({
        message: `Valores salvos com sucesso!`,
        duration: 3000
      });
      toast.present();
      loader.dismiss();
      this.navCtrl.pop();
    })
    .catch(err => {
      console.log(`Error: ${err}`);
      console.log(err);
      let toast = this.toastCtrl.create({
        message: `Não foi possível salvar sua lista. :(`,
        duration: 3000
      });
      toast.present();
      loader.dismiss();
    });
  }
}