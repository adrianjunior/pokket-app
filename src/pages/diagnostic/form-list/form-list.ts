import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Category } from '../../../assets/data/category.interface';
import categories from '../../../assets/data/categories';
import { Diagnostic } from '../../../assets/data/diagnostic.interface';

@IonicPage()
@Component({
  selector: 'page-form-list',
  templateUrl: 'form-list.html',
})
export class FormListPage implements OnInit {

  formPage = `FormPage`;
  incomePage = `IncomePage`;

  diagnostic: Diagnostic;
  categories: Category[];
  numberList: number[] = [];
  diagnosticNumber: number;
  diagnostics: Diagnostic[];

  categoryList: string[] = ['Receitas', 'Desembolso Fixo Obrigatório', 'Desembolso Fixo Não-Obrigatório', 
  'Desembolso Variável Obrigatório', 'Desembolso Variável Não-Obrigatório', 'Ativos Financeiros', 
  'Ativos Não-Financeiros', 'Dívidas'];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,private storage: Storage,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
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
    const date = new Date();
    this.diagnostic = {
      id: this.diagnosticNumber,
      date: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
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
                  this.navCtrl.setRoot(`HomePage`, {number: this.diagnosticNumber, goto: `IncomePage`});
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

  goToForm(category: Category){
      this.navCtrl.push(this.formPage, {
        category: category, number: this.diagnosticNumber
      });
  }

}
