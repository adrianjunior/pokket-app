import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { ToastController, LoadingController } from 'ionic-angular';

import { Income } from '../../assets/data/income.interface';

@Injectable()
export class FormProvider {

  public incomes;
  public loader = this.loadingCtrl.create();

  constructor(private nativeStorage: NativeStorage, public toastCtrl: ToastController, public loadingCtrl: LoadingController) { }

  setIncomeList(incomes) {
    this.startLoading('Guardando sua lista de receitas...');
    this.nativeStorage.setItem('incomes', JSON.stringify(incomes))
        .then(
          () =>{
            this.showToast('Receitas guardadas com sucesso! :)')
            console.log(JSON.stringify(incomes));
            this.stopLoading();
          },
          error => { 
            this.showToast('Erro ao guardar suas receitas. Tente novamente. :(');
            this.stopLoading();
          }
        );
  }

  getIncomeList() {
    this.startLoading('Carregando sua lista de receitas...');
    this.nativeStorage.getItem('incomes')
      .then(
        data => { 
          this.incomes = JSON.parse(data._body);
          console.log(this.incomes);
          this.stopLoading();
        },
        error => {
          this.showToast('Erro ao carregar suas receitas. Tente novamente. :(');
          console.log(error);
          this.stopLoading();
        }
      );
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  startLoading(content: string) {
    this.loader.setContent(content);
    this.loader.present();
  }

  stopLoading() {
    this.loader.dismiss();
  }
}
