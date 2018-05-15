import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Category } from '../../../assets/data/category.interface';
import categories from '../../../assets/data/categories';
import { FormProvider } from '../../../providers/form/form';

@IonicPage()
@Component({
  selector: 'page-form-list',
  templateUrl: 'form-list.html',
})
export class FormListPage implements OnInit {

  formPage = `FormPage`;
  categories: Category[];
  numberList: number[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public formProvider: FormProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormListPage');
  }

  ngOnInit() {
    this.categories = categories;
    this.numberList = this.formProvider.getNumbers();
  }

  onGoBack() {
    this.navCtrl.popToRoot();
  }

}
