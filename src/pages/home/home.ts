import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { ResultPage } from '../result/result';
import { FormPage } from '../diagnostic/form/form';
import { FormTutorialPage } from '../diagnostic/form-tutorial/form-tutorial';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {}

  goToFormTutorialPage(){
    this.navCtrl.push(`FormTutorialPage`);
  }

}
