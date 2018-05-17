import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, LoadingController, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  formTutorialPage = `FormTutorialPage`;
  navGraficosPage = `GraficosPage`; // Navegacao ate os graficos

  isDiagnosticDone: boolean;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
  private storage: Storage, public loadingCtrl: LoadingController,
  public toastCtrl: ToastController) {}

  public doughnutChartLabels:string[] = ['Dados 1','Dados 2', 'Dados 3'];
  public doughnutChartData:number[] = [1500,3000,1235];
  public doughnutChartType:string = 'doughnut';

  ionViewWillEnter() {
    this.onCheckDiagnostic();
  }

  onCheckDiagnostic() {
    this.storage.get('Diagnostic')
                .then(value => {
                  if(value != null) {
                    this.isDiagnosticDone = value;
                  } else {
                    this.isDiagnosticDone = false;
                  }
                  console.log(value); 
                  console.log(this.isDiagnosticDone);              
                })
                .catch(err => {
                  console.log(`Error: ${err}`);
                  console.log(err);
                  let toast = this.toastCtrl.create({
                    message: `Não foi checar se o seu diagnostico foi feito. :(`,
                    duration: 3000
                  });
                  toast.present();
                });
  }

}
