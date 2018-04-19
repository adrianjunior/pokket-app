import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Category } from '../../../assets/data/category.interface';
import categories from '../../../assets/data/categories';

@IonicPage()
@Component({
  selector: 'page-form-list',
  templateUrl: 'form-list.html',
})
export class FormListPage implements OnInit {

  formPage = `FormPage`;
  categories: Category[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormListPage');
  }

  ngOnInit() {
    this.categories = categories;
  }

  onGoBack() {
    let alert = this.alertCtrl.create({
      title: 'Tem certeza?',
      subTitle: 'Caso volte agora, todo seu progresso no formulário será perdido.',
      buttons: [{
        text: 'Sim, tenho certeza!',
        handler: () => {
          this.navCtrl.popToRoot();
        }
      }, 'Não, quero ficar.']
    });
    alert.present();
  }

}
