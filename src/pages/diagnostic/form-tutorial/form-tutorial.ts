import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-form-tutorial',
  templateUrl: 'form-tutorial.html',
})
export class FormTutorialPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormTutorialPage');
  }

  goToFormListPage(){
    this.navCtrl.push(`FormListPage`);
  }

}
