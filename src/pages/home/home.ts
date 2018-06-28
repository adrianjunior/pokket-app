import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController, Content, AlertController, FabContainer } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import images from '../../assets/data/image-paths';
import { Balance } from '../../assets/data/balance.interface';
import { Diagnostic } from '../../assets/data/diagnostic.interface';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {
  @ViewChild(Content) content: Content;
  loader = this.loadingCtrl.create({});

  diagnosticOptionsPage = `DiagnosticOptionsPage`;
  diagnosticResultPage = `DiagnosticResultPage`;
  balanceResultPage = `BalanceResultPage`;
  newBalancePage = `NewBalancePage`;
  balanceListPage = `BalanceListPage`;
  creditsPage = `CreditsPage`;
  homePageImage = images.homePage;
  iconImage = images.logoIcon;
  catcher: boolean = false;

  showTooltips: boolean;;
  chosenDiagnostics: string[] = [];

  diagnostics: Diagnostic[] = [];
  balances: Balance[] = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
    private storage: Storage, public loadingCtrl: LoadingController,
    public toastCtrl: ToastController, public navParams: NavParams,
    public alertCtrl: AlertController) { }

  ngOnInit() {
    let number = this.navParams.get('number');
    let goto = this.navParams.get('goto');
    let catcher = this.navParams.get('catcher');
    this.showTooltips = false;
    if (goto != null) {
      this.navCtrl.push(goto, { number: number })
    }
    if (catcher != null) {
      this.catcher = catcher;
    }
  }

  ionViewWillEnter() {
    this.onCheckDiagnostic();
    this.onCheckBalances();
  }

  ionViewDidEnter() {
    this.content.resize();
  }

  onCheckDiagnostic() {
    this.storage.get('Diagnostics')
      .then(value => {
        if (value != null) {
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

  onCheckBalances() {
    this.storage.get('Balanços')
      .then(value => {
        if (value != null) {
          this.balances = value;
        } else {
          this.balances = [];
        }
        console.log('VALUE: ');
        console.log(value);
        console.log('BALANCES: ');
        console.log(this.balances);
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
    if (this.showTooltips == true || this.catcher == false) {
      this.showTooltips = false;
    }
    this.navCtrl.push(this.diagnosticOptionsPage, {
      diagnostics: this.diagnostics, number: this.diagnostics.length + 1
    });
    fab.close();
  }

  createBalance(fab: FabContainer) {
    fab.close();
    if (this.showTooltips == true || this.catcher == false) {
      this.showTooltips = false;
    }
    let profileModal = this.modalCtrl.create(this.newBalancePage, {
      diagnostics: this.diagnostics, number: this.balances.length + 1,
      balances: this.balances
    });
    profileModal.present();
  }

  openFab() {
    if (this.catcher == false) {
      if (this.showTooltips == false) {
        setTimeout(() => {
          this.showTooltips = true;
        }, 300);
      } else {
        this.showTooltips = false;
      }
    }
  }

  goToDiagnostic(diagnostic: number) {
    if (this.showTooltips == true || this.catcher == false) {
      this.showTooltips = false;
    }
    this.navCtrl.push(this.diagnosticResultPage, {
      number: diagnostic
    });
  }

  goToBalanceList() {
    if (this.showTooltips == true || this.catcher == false) {
      this.showTooltips = false;
    }
    let profileModal = this.modalCtrl.create(this.balanceListPage, {
      balances: this.balances
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