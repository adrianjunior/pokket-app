import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Category } from '../../../assets/data/category.interface';
import categories from '../../../assets/data/categories';

@IonicPage()
@Component({
  selector: 'page-form-list',
  templateUrl: 'form-list.html',
})
export class FormListPage implements OnInit {

  formPage = `FormPage`;
  resultPage = `ResultPage`;
  diagnostic: boolean;
  categories: Category[];
  numberList: number[] = [];

  categoryList: string[] = ['Receitas', 'Desembolso Fixo Obrigatório', 'Desembolso Fixo Não-Obrigatório', 
  'Desembolso Variável Obrigatório', 'Desembolso Variável Não-Obrigatório', 'Ativos Financeiros', 
  'Ativos Não-Financeiros', 'Dívidas'];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,private storage: Storage,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  }

  ionViewWillEnter() {
    this.numberList = this.getNumbers();
    this.getDiagnostic();
  }

  ngOnInit() {
    this.categories = categories;
  }

  onGoBack() {
    this.navCtrl.popToRoot();
  }

  onGenerateDiagnostic() {
    let loader = this.loadingCtrl.create({
      content: `Gerando seu Diagnóstico...`
    });
    loader.present();
    this.storage.set('Diagnostic', true)
                .then(value => {
                  let toast = this.toastCtrl.create({
                    message: `Diagnóstico gerado com sucesso!`,
                    duration: 3000
                  });
                  toast.present();
                  loader.dismiss();
                  this.navCtrl.setRoot(`ResultPage`);
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
      this.storage.get(`length ${item}`)
                  .then(value => {
                    this.numberList[index] = value;
                    console.log(`LEITURA: Valor: ${value} / Key: ${item}`)
                  })
    });
    console.log(this.numberList)
    return this.numberList;
  }

  getDiagnostic() {
    this.storage.get('Diagnostic')
      .then(value => {
        if (value) {
          this.diagnostic = true;
        } else {
          this.diagnostic = false;
        }
      })
  }

}
