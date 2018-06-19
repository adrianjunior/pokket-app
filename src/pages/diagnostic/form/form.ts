import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController, Navbar } from 'ionic-angular';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { Storage } from '@ionic/storage';

import { Category } from '../../../assets/data/category.interface';
import { Value } from '../../../assets/data/value.interface';

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage implements OnInit {

  @ViewChild('navbar') navBar: Navbar;
  form: FormGroup;
  category: Category;
  diagnosticNumber: number;
  values: Value[];
  totalSpentValue: { name: string, value: number }[];
  totalBalanceValue: { name: string, value: number }[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public formBuilder: FormBuilder,
    private storage: Storage, public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) { }

  ngOnInit() {
    this.category = this.navParams.get('category');
    this.diagnosticNumber = this.navParams.get('number');
    console.log(this.category);
    this.onLoadValues();
    this.initForm();
    this.navBar.backButtonClick = () => {
      this.backButtonClick();
    };
  }

  initForm() {
    this.form = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.initFields()
      ])
    });
  }

  initFields(value = {
    name: '', value: '', product: '', type: '', institution: '', invDate: '', initialValue: '',
    currentValue: '', description: '', buyDate: '', provider: '', buyValue: '', creditor: '',
    debtDate: '', interest: '', mainValue: '', remainingValue: ''
  }): FormGroup {
    switch (this.category.name) {
      case 'Receitas': {
        return this.formBuilder.group({
          name: [value.name, Validators.required],
          value: [value.value, Validators.required]
        });
      }
      case 'Desembolso Fixo Obrigatório': {
        return this.formBuilder.group({
          name: [value.name, Validators.required],
          value: [value.value, Validators.required]
        });
      }
      case 'Desembolso Fixo Não-Obrigatório': {
        return this.formBuilder.group({
          name: [value.name, Validators.required],
          value: [value.value, Validators.required]
        });
      }
      case 'Desembolso Variável Obrigatório': {
        return this.formBuilder.group({
          name: [value.name, Validators.required],
          value: [value.value, Validators.required]
        });
      }
      case 'Desembolso Variável Não-Obrigatório': {
        return this.formBuilder.group({
          name: [value.name, Validators.required],
          value: [value.value, Validators.required]
        });
      }
      case 'Ativos Financeiros': {
        return this.formBuilder.group({
          product: [value.product, Validators.required],
          type: [value.type, Validators.required],
          institution: [value.institution, Validators.required],
          invDate: [value.invDate, Validators.required],
          initialValue: [value.initialValue, Validators.required],
          currentValue: [value.currentValue, Validators.required]
        });
      }
      case 'Ativos Não-Financeiros': {
        return this.formBuilder.group({
          description: [value.description, Validators.required],
          type: [value.type, Validators.required],
          buyDate: [value.buyDate, Validators.required],
          provider: [value.provider, Validators.required],
          buyValue: [value.buyValue, Validators.required],
          currentValue: [value.currentValue, Validators.required]
        });
      }
      case 'Dívidas': {
        return this.formBuilder.group({
          description: [value.description, Validators.required],
          type: [value.type, Validators.required],
          creditor: [value.creditor, Validators.required],
          debtDate: [value.debtDate, Validators.required],
          interest: [value.interest, Validators.required],
          mainValue: [value.mainValue, Validators.required],
          remainingValue: [value.remainingValue, Validators.required]
        });
      }
    }
  }

  addField(): void {
    const control = <FormArray>this.form.controls.formArray;
    control.push(this.initFields());
  }

  removeField(i: number): void {
    const control = <FormArray>this.form.controls.formArray;
    control.removeAt(i);
  }

  addFilledField(value): void {
    const control = <FormArray>this.form.controls.formArray;
    control.push(this.initFields(value))
  }

  onSubmit(val: any, length: number) {
    console.log('Val.FormArray:');
    console.log(val.formArray);
    let loader = this.loadingCtrl.create({
      content: `Salvando sua lista de ${this.category.name}`
    });
    loader.present();
    this.storage.set(`${this.category.name} ${this.diagnosticNumber}`, val.formArray)
                .then(() => {
                  this.setNumber(`${this.category.name} ${this.diagnosticNumber}`, length);
                }) 
                .then(() => {
                  this.setTotalSpent(val.formArray, this.totalSpentValue);
                })
                .then(() => {
                  this.setBalance(val.formArray, this.totalBalanceValue);
                })
                .then(value => {
                  console.log(`Value: ${value}`);
                  console.log(value);
                  let toast = this.toastCtrl.create({
                    message: `Valores salvos com sucesso!`,
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

  onLoadValues() {
    this.storage.get(`${this.category.name} ${this.diagnosticNumber}`)
                .then(value => {
                  if(value != null) {
                    this.values = value;
                    this.removeField(0);
                    for(let i = 0; i < this.values.length; i++) {
                      this.addFilledField(this.values[i]);
                    }
                  }
                  console.log(`Values: ${this.values}`);                
                })
                .then(() => {
                  this.onLoadSpentValues();
                  console.log(`SpentValues: ${this.totalSpentValue}`);
                })
                .then(() => {
                  this.onLoadBalanceValues();
                  console.log(`BalanceValues: ${this.totalBalanceValue}`);
                })
                .catch(err => {
                  console.log(`Error: ${err}`);
                  console.log(err);
                  let toast = this.toastCtrl.create({
                    message: `Não foi possível carregar sua lista. :(`,
                    duration: 3000
                  });
                  toast.present();
                });
  }

  onLoadSpentValues() {
    this.storage.get(`Total Spent Values ${this.diagnosticNumber}`)
                .then(value => {
                  this.totalSpentValue = value;
                })
  }

  onLoadBalanceValues() {
    this.storage.get(`Total Balance Values ${this.diagnosticNumber}`)
                .then(value => {
                  this.totalBalanceValue = value;
                })
  }

  setNumber(name: string, length:number) {
    this.storage.set(`length ${name}`, length);
  }

  setTotalSpent(formArray, spentArray: { name: string, value: number }[]) {
    let totalValue: number = 0;
    for(let form of formArray) {
      totalValue = totalValue + +form.value;
    }
    if(spentArray == undefined) {
      spentArray = [
        {name: 'Fixo Obrigatório', value: 0},
        {name: 'Fixo Não-Obrigatório', value: 0},
        {name: 'Variável Obrigatório', value: 0},
        {name: 'Variável Não-Obrigatório', value: 0},
      ];
    }
    switch(this.category.name) {
      case 'Desembolso Fixo Obrigatório': {
        spentArray[0].value = totalValue;
        break;
      }
      case 'Desembolso Fixo Não-Obrigatório': {
        spentArray[1].value = totalValue;
        break;
      }
      case 'Desembolso Variável Obrigatório': {
        spentArray[2].value = totalValue;
        break;
      }
      case 'Desembolso Variável Não-Obrigatório': {
        spentArray[3].value = totalValue;
        break;
      }
    }
    this.storage.set(`Total Spent Values ${this.diagnosticNumber}`, spentArray)
                .then(() => {
                  console.log(`Total Spent Values ${this.diagnosticNumber}`);
                  console.log(spentArray);
                });  
  }

  setBalance(formArray, balanceArray: { name: string, value: number }[]) {
    let totalValue: number = 0;
    for(let form of formArray) {
      totalValue = totalValue + +form.value;
    }
    if(balanceArray == undefined) {
      balanceArray = [
        {name: 'Receitas', value: 0},
        {name: 'Desembolsos', value: 0},
      ];
    }
    switch(this.category.name) {
      case 'Receitas': {
        balanceArray[0].value = totalValue;
        break;
      }
      case 'Desembolso Fixo Obrigatório': {
        balanceArray[1].value = balanceArray[1].value + totalValue;;
        break;
      }
      case 'Desembolso Fixo Não-Obrigatório': {
        balanceArray[1].value = balanceArray[1].value + totalValue;
        break;
      }
      case 'Desembolso Variável Obrigatório': {
        balanceArray[1].value = balanceArray[1].value + totalValue;
        break;
      }
      case 'Desembolso Variável Não-Obrigatório': {
        balanceArray[1].value = balanceArray[1].value + totalValue;
        break;
      }
    }
    this.storage.set(`Total Balance Values ${this.diagnosticNumber}`, balanceArray)
                .then(() => {
                  console.log(`Total Balance Values ${this.diagnosticNumber}`);
                  console.log(balanceArray);
                });  
  }

  backButtonClick() {
    let alert = this.alertCtrl.create({
      title: 'Tem certeza?',
      subTitle: 'Caso volte agora, todo seu progresso no formulário será perdido.',
      buttons: [{
        text: 'Sim, tenho certeza!',
        handler: () => {
          this.navCtrl.pop();
        }
      }, {
        text: 'Não, quero ficar.',
        handler: () => {
          const alert = this.alertCtrl.create({
            subTitle: 'Para sair sem perder o seu progresso, clique no botão "Concluir"',
            buttons: ['OK']
          });
          alert.present();
        }  
      }]
    });
    alert.present();
  }

}
