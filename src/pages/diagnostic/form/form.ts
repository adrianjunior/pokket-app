import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Category } from '../../../assets/data/category.interface';

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage implements OnInit {

  form: FormGroup;
  category: Category;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.category = this.navParams.data;
    /*switch (this.category.name) {
      case 'Receitas': {
        this.form = this.formBuilder.group({
          email: [''],
          password: ['']
        })
        break;
      }
      case 'Desembolso Fixo Obrigatório': {
        this.form = this.formBuilder.group({
          email: [''],
          password: ['']
        })
        break;
      }
      case 'Desembolso Fixo Não-Obrigatório': {
        this.form = this.formBuilder.group({
          email: [''],
          password: ['']
        })
        break;
      }
      case 'Desembolso Variável Obrigatório': {
        this.form = this.formBuilder.group({
          email: [''],
          password: ['']
        })
        break;
      }
      case 'Desembolso Variável Não-Obrigatório': {
        this.form = this.formBuilder.group({
          email: [''],
          password: ['']
        })
        break;
      }
      case 'Ativos Financeiros': {
        this.form = this.formBuilder.group({
          email: [''],
          password: ['']
        })
        break;
      }
      case 'Ativos Não-Financeiros': {
        this.form = this.formBuilder.group({
          email: [''],
          password: ['']
        })
        break;
      }
    }*/
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
