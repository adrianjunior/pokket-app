import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ResultPage } from '../result/result';
import { FormPage } from '../form/form';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {}

  goToFormPage(){
    this.navCtrl.push(FormPage);
  }

}
