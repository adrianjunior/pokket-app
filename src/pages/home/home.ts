import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  formTutorialPage = `FormTutorialPage`;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {}
}
