import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LoadingController, ToastController, NavController } from 'ionic-angular';
import { Value } from '../../assets/data/value.interface';

@Injectable()
export class FormProvider {

  values: Value[];

  constructor(private storage: Storage, public loadingCtrl: LoadingController,
    public toastCtrl: ToastController, public navCtrl: NavController) {}

  setValues(key: string, list) {
    let loader = this.loadingCtrl.create({
      content: `Salvando sua lista de ${key}`
    });
    loader.present();
    this.storage.set(key, list)
                .then(value => {
                  console.log(`Value: ${value}`);
                  console.log(value);
                  let toast = this.toastCtrl.create({
                    message: `Lista salva com sucesso!`,
                    duration: 3000
                  });
                  toast.present();
                  loader.dismiss();
                  this.navCtrl.pop();
                })
                .catch(err => {
                  console.log(`Error: ${err}`);
                  console.log(err);
                  let toast = this.toastCtrl.create({
                    message: `Não foi possível salvar sua lista. :(`,
                    duration: 3000
                  });
                  toast.present();
                  loader.dismiss();
                });
  }
  
  getValues(key: string) {
    let loader = this.loadingCtrl.create({
      content: `Carregando sua lista de ${key}`
    });
    this.storage.get(key)
                .then(value => {
                  console.log(`Value: ${value}`);
                  console.log(value);                  
                  loader.dismiss();
                  if(value != null) {
                    this.values = value;
                    let toast = this.toastCtrl.create({
                      message: `Lista carregada com sucesso!`,
                      duration: 3000
                    });
                    toast.present();
                    return this.values;
                  }
                })
                .catch(err => {
                  console.log(`Error: ${err}`);
                  console.log(err);
                  let toast = this.toastCtrl.create({
                    message: `Não foi possível carregar sua lista. :(`,
                    duration: 3000
                  });
                  toast.present();
                  loader.dismiss();
                });
  }

}
