import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormControl, FormGroup } from '@angular/forms';

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
  numberOfFields = [
    ""
  ];

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

  addField() {
    switch (this.category.name) {
      case 'Receitas': {
        this.numberOfFields.push("");
        break;
      }
      case 'Desembolso Fixo Obrigatório': {
        
        break;
      }
      case 'Desembolso Fixo Não-Obrigatório': {
        
        break;
      }
      case 'Desembolso Variável Obrigatório': {
        
        break;
      }
      case 'Desembolso Variável Não-Obrigatório': {
        
        break;
      }
      case 'Ativos Financeiros': {
        
        break;
      }
      case 'Ativos Não-Financeiros': {
        
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
