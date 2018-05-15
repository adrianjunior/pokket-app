import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LoadingController, ToastController } from 'ionic-angular';
import { Value } from '../../assets/data/value.interface';

@Injectable()
export class FormProvider {

  values: Value[];
  numberList: number[] = [];
  categoryList: string[] = ['Receitas', 'Desembolso Fixo Obrigatório', 'Desembolso Fixo Não-Obrigatório', 
  'Desembolso Variável Obrigatório', 'Desembolso Variável Não-Obrigatório', 'Ativos Financeiros', 
  'Ativos Não-Financeiros', 'Dívidas'];

  constructor(private storage: Storage, public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {}

  setValues(key: string, list, length) {
    let loader = this.loadingCtrl.create({
      content: `Salvando sua lista de ${key}`
    });
    loader.present();
    this.storage.set(key, list)
                .then(() => {
                  this.setNumber(key, length);
                }) 
                .then(value => {
                  console.log(`Value: ${value}`);
                  console.log(value);
                  let toast = this.toastCtrl.create({
                    message: `Lista salva com sucesso!`,
                    duration: 3000
                  });
                  toast.present();
                  loader.dismiss();
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

  setNumber(key, length) {
    this.storage.set(`length ${key}`, length)
                .then(value => {
                  console.log(`ESCRITA: Valor: ${value} / Key: ${key}`)
                })
                .catch(err => {
                  let toast = this.toastCtrl.create({
                    message: `Houve um erro salvando a quantidade de ${key}. :(`,
                    duration: 3000
                  });
                  toast.present();
                })
  }

  getNumbers() {
    this.categoryList.forEach((item, index) => {
      this.storage.get(`length ${item}`)
                  .then(value => {
                    this.numberList[index] = value;
                    console.log(`LEITURA: Valor: ${value} / Key: ${item}`)
                  })
    });
    console.log(this.numberList)
    return this.numberList;
  }
}
