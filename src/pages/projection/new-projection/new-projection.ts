import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Diagnostic } from '../../../assets/data/diagnostic.interface';
import { Projection } from '../../../assets/data/projection.interface';

@IonicPage()
@Component({
  selector: 'page-new-projection',
  templateUrl: 'new-projection.html',
})
export class NewProjectionPage implements OnInit{

  diagnostics: Diagnostic[] = [];
  projections: Projection[] = [];
  chosenDiagnostics: string[] = [];
  number: number;

  diagnosticCheck: boolean[] = [];
  chosenDiagnosticsNumber: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.number = this.navParams.get('number');
    this.projections = this.navParams.get('projections');
    this.diagnostics = this.navParams.get('diagnostics');
    for(let i; i < this.diagnostics.length; i++) {
      this.diagnosticCheck[i] = false;
    }
  }

  dismiss() {
    let alert = this.alertCtrl.create({
      title: 'Tem certeza?',
      subTitle: 'Caso volte agora, todo seu progresso será perdido.',
      buttons: [{
        text: 'Sim, tenho certeza!',
        handler: () => {
          this.viewCtrl.dismiss();
        }
      }, {
        text: 'Não, quero ficar.', 
      }]
    });
    alert.present();
  }

}
