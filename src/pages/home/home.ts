import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Diagnostic } from '../../assets/data/diagnostic.interface';

import images from '../../assets/data/image-paths';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit{
  @ViewChild(Content) content: Content;

  formListPage = `FormListPage`;
  homePageImage = images.homePage;

  diagnostics: Diagnostic[] = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
  private storage: Storage, public loadingCtrl: LoadingController,
  public toastCtrl: ToastController, public navParams: NavParams) {}

  ngOnInit() {
    let number = this.navParams.get('number');
    let goto = this.navParams.get('goto');
    console.log(`NUMBER: ${number}`)
    if(goto != null) {
      this.navCtrl.push(goto, {number: number})
    }
  }

  ionViewWillEnter() {
    this.onCheckDiagnostic();
  }

  ionViewDidEnter() {
    this.content.resize();
  }

  onCheckDiagnostic() {
    this.storage.get('Diagnostics')
                .then(value => {
                  if(value != null) {
                    this.diagnostics = value;
                  } else {
                    this.diagnostics = [];
                  }
                  console.log('VALUE: ');
                  console.log(value); 
                  console.log('DIAGNOSTIC: ');
                  console.log(this.diagnostics);
                })
                .catch(err => {
                  console.log(`Error: ${err}`);
                  console.log(err);
                  let toast = this.toastCtrl.create({
                    message: `Não foi possível checar se o seu diagnostico foi feito. :(`,
                    duration: 3000
                  });
                  toast.present();
                });
  }

  createDiagnostic() {
    this.navCtrl.push(this.formListPage, {
      diagnostics: this.diagnostics, number: this.diagnostics.length+1
    });
  }

  goToDiagnostic(diagnostic: number) {
    this.navCtrl.push(`ResultPage`, {
      number: diagnostic
    });
  }

}
