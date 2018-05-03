import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { debugOutputAstAsTypeScript } from '@angular/compiler';

import { Category } from '../../../assets/data/category.interface';
import { Income } from '../../../assets/data/income.interface';

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage implements OnInit {

  form: FormGroup;
  category: Category;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.category = this.navParams.data;
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.initFields()
      ])
    });
  }

  initFields(): FormGroup {
    switch (this.category.name) {
      case 'Receitas': {
        return this.formBuilder.group({
          name: ['', Validators.required],
          value: ['', Validators.required]
        });
      }
      case 'Desembolso Fixo Obrigatório': {
        return this.formBuilder.group({
          name: ['', Validators.required],
          value: ['', Validators.required]
        });
      }
      case 'Desembolso Fixo Não-Obrigatório': {
        return this.formBuilder.group({
          name: ['', Validators.required],
          value: ['', Validators.required]
        });
      }
      case 'Desembolso Variável Obrigatório': {
        return this.formBuilder.group({
          name: ['', Validators.required],
          value: ['', Validators.required]
        });
      }
      case 'Desembolso Variável Não-Obrigatório': {
        return this.formBuilder.group({
          name: ['', Validators.required],
          value: ['', Validators.required]
        });
      }
      case 'Ativos Financeiros': {
        return this.formBuilder.group({
          product: ['', Validators.required],
          type: ['', Validators.required],
          institution: ['', Validators.required],
          invDate: ['', Validators.required],
          initialValue: ['', Validators.required],
          currentValue: ['', Validators.required]
        });
      }
      case 'Ativos Não-Financeiros': {
        return this.formBuilder.group({
          description: ['', Validators.required],
          type: ['', Validators.required],
          buyDate: ['', Validators.required],
          provider: ['', Validators.required],
          buyValue: ['', Validators.required],
          currentValue: ['', Validators.required]
        });
      }
      case 'Dívidas': {
        return this.formBuilder.group({
          description: ['', Validators.required],
          type: ['', Validators.required],
          creditor: ['', Validators.required],
          debtDate: ['', Validators.required],
          interest: ['', Validators.required],
          mainValue: ['', Validators.required],
          remainingValue: ['', Validators.required]
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

  onSubmit(val: any) {
    console.log(val.formArray);
    switch (this.category.name) {
      case 'Receitas': {
      }
      case 'Desembolso Fixo Obrigatório': {
      }
      case 'Desembolso Fixo Não-Obrigatório': {
      }
      case 'Desembolso Variável Obrigatório': {
      }
      case 'Desembolso Variável Não-Obrigatório': {
      }
      case 'Ativos Financeiros': {
      }
      case 'Ativos Não-Financeiros': {
      }
      case 'Dívidas': {
      }
    }
  }

  onGoBack() {
    let alert = this.alertCtrl.create({
      title: 'Tem certeza?',
      subTitle: 'Caso volte agora, todo seu progresso no formulário será perdido.',
      buttons: [{
        text: 'Sim, tenho certeza!',
        handler: () => {
          this.navCtrl.pop();
        }
      }, 'Não, quero ficar.']
    });
    alert.present();
  }

}
