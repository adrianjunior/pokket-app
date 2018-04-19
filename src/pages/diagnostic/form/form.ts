import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormControl, FormGroup } from '@angular/forms';

import { Category } from '../../../assets/data/category.interface';

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage implements OnInit {

  form: FormGroup;
  category: Category;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) { }

  ngOnInit() {
    this.category = this.navParams.data;
  }
  
  initForm() {
    switch (this.category.name) {
      case 'Receitas': {
        this.form =  new FormGroup({
          
        })
        break;
      }
      case 'Desembolso Fixo Obrigatório': {
        this.form =  new FormGroup({
          
        })
        break;
      }
      case 'Desembolso Fixo Não-Obrigatório': {
        this.form =  new FormGroup({
          
        })
        break;
      }
      case 'Desembolso Variável Obrigatório': {
        this.form =  new FormGroup({
          
        })
        break;
      }
      case 'Desembolso Variável Não-Obrigatório': {
        this.form =  new FormGroup({
          
        })
        break;
      }
      case 'Ativos Financeiros': {
        this.form =  new FormGroup({
          
        })
        break;
      }
      case 'Ativos Não-Financeiros': {
        this.form =  new FormGroup({
          
        })
        break;
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
