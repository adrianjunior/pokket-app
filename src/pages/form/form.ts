import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
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
