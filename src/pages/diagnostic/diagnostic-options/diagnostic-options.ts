import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Category } from '../../../assets/data/category.interface';
import categories from '../../../assets/data/categories';
import { Diagnostic } from '../../../assets/data/diagnostic.interface';

@IonicPage()
@Component({
  selector: 'page-diagnostic-options',
  templateUrl: 'diagnostic-options.html',
})
export class DiagnosticOptionsPage implements OnInit {

  diagnosticFormPage = `DiagnosticFormPage`;
  diagnosticResultPage = `DiagnosticResultPage`;
  tutorialPage = "TutorialPage";

  diagnostic: Diagnostic;
  categories: Category[];c
  numberList: number[] = [];
  diagnosticNumber: number;
  diagnostics: Diagnostic[];

  categoryList: string[] = ['Receitas', 'Desembolso Fixo Obrigatório', 'Desembolso Fixo Não-Obrigatório',
    'Desembolso Variável Obrigatório', 'Desembolso Variável Não-Obrigatório', 'Ativos Financeiros',
    'Ativos Não-Financeiros', 'Dívidas'];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, private storage: Storage,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public modalCtrl: ModalController) {
  }

  ionViewWillEnter() {
    this.numberList = this.getNumbers();
  }

  ngOnInit() {
    this.categories = categories;
    this.diagnosticNumber = this.navParams.get('number');
    this.diagnostics = this.navParams.get('diagnostics');
  }

  onGoBack() {
    this.navCtrl.popToRoot();
  }

  onGenerateDiagnostic() {
    if (this.numberList[0] > 0 && (this.numberList[1] > 0 || this.numberList[2] > 0 || this.numberList[3] > 0 || this.numberList[4] > 0)) {
      const date = new Date();
      this.diagnostic = {
        id: this.diagnosticNumber,
        date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
      }
      let loader = this.loadingCtrl.create({
        content: `Gerando seu Diagnóstico...`
      });
      loader.present();
      this.storage.set(`Diagnostics`, [...this.diagnostics, this.diagnostic])
        .then(value => {
          let toast = this.toastCtrl.create({
            message: `Diagnóstico gerado com sucesso!`,
            duration: 3000
          });
          toast.present();
          loader.dismiss();
          this.navCtrl.setRoot(`HomePage`, { number: this.diagnosticNumber, goto: `DiagnosticResultPage` });
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
    } else {
      let alert = this.alertCtrl.create({
        subTitle: 'Preencha, pelo menos, uma Receita e um desembolso qualquer para poder gerar seu diagnóstico.',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  getNumbers() {
    this.categoryList.forEach((item, index) => {
      this.storage.get(`length ${item} ${this.diagnosticNumber}`)
        .then(value => {
          this.numberList[index] = value;
          console.log(`LEITURA: Valor: ${value} / Key: ${item} ${this.diagnosticNumber}`)
        })
    });
    console.log(this.numberList)
    return this.numberList;
  }

  goToForm(category: Category) {
    let loader = this.loadingCtrl.create({
      content: `Carregando...`,
      dismissOnPageChange: true
    });
    loader.present();
    this.navCtrl.push(this.diagnosticFormPage, {
      category: category, number: this.diagnosticNumber
    });
  }

  help() {
    let profileModal = this.modalCtrl.create(this.tutorialPage, {
      type: 5
    });
    profileModal.present();
  }
}
