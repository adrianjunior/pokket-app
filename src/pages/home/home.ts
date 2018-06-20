import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController, Content, AlertController, FabContainer } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Diagnostic } from '../../assets/data/diagnostic.interface';

import images from '../../assets/data/image-paths';
import { Projection } from '../../assets/data/projection.interface';
import { NewProjectionPage } from '../projection/new-projection/new-projection';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit{
  @ViewChild(Content) content: Content;
  loader = this.loadingCtrl.create({});

  formListPage = `FormListPage`;
  projectionPage = `ProjectionPage`;
  newProjectionPage = `NewProjectionPage`;
  projectionListPage = `ProjectionListPage`;
  creditsPage = `CreditsPage`;
  homePageImage = images.homePage;
  iconImage = images.logoIcon;

  showTooltips: boolean = false
  chosenDiagnostics: string[] = [];

  diagnostics: Diagnostic[] = [];
  projections: Projection[] = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
  private storage: Storage, public loadingCtrl: LoadingController,
  public toastCtrl: ToastController, public navParams: NavParams,
  public alertCtrl: AlertController) {}

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
    this.onCheckProjections();  
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

  onCheckProjections() {
    this.storage.get('Balanços')
                .then(value => {
                  if(value != null) {
                    this.projections = value;
                  } else {
                    this.projections = [];
                  }
                  console.log('VALUE: ');
                  console.log(value); 
                  console.log('PROJECTIONS: ');
                  console.log(this.projections);
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

  createDiagnostic(fab: FabContainer) {
    if(this.showTooltips == true){
      this.showTooltips = false;
    }
    this.navCtrl.push(this.formListPage, {
      diagnostics: this.diagnostics, number: this.diagnostics.length+1
    });
    fab.close();
  }

  createProjection(fab: FabContainer) {
    fab.close();
    if(this.showTooltips == true){
      this.showTooltips = false;
    }
    let profileModal = this.modalCtrl.create(this.newProjectionPage, { 
      diagnostics: this.diagnostics, number: this.projections.length+1,
      projections: this.projections });
    profileModal.present();
  }

  openFab() {
    if(this.showTooltips == false){
      setTimeout(() => {
        this.showTooltips = true;
      }, 300); 
    }else {
      this.showTooltips = false;
    }
  }

  goToDiagnostic(diagnostic: number) {
    if(this.showTooltips == true){
      this.showTooltips = false;
    }
    this.navCtrl.push(`ResultPage`, {
      number: diagnostic
    });
  }

  goToProjectionList() {
    if(this.showTooltips == true){
      this.showTooltips = false;
    }
    let profileModal = this.modalCtrl.create(this.projectionListPage, {
      projections: this.projections
    });
    profileModal.present();
  }

  startLoading(content: string) {
    this.loader.setContent(content);
    this.loader.present();
  }

  stopLoading() {
    this.loader.dismiss();
  }
}