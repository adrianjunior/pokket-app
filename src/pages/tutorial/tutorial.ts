import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ViewController } from 'ionic-angular';

import images from '../../assets/data/image-paths';


@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {
  @ViewChild(Slides) slides: Slides;

  formListPage = `FormListPage`;
  images: string[] = [];
  type: number;
  name: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.type = this.navParams.get('type');
    switch (this.type) {
      case 0:
        this.images[0] = images.receitaTutorial1;
        this.images[1] = images.receitaTutorial2;
        this.images[2] = images.receitaTutorial3;
        this.name = 'Receitas';
        break;
      case 1:
        this.images[0] = images.dfoTutorial1;
        this.images[1] = images.dfoTutorial2;
        this.images[2] = images.dfoTutorial3;
        this.name = 'Desembolso Fixo Obrigatório';
        break;
      case 2:
        this.images[0] = images.dfnoTutorial1;
        this.images[1] = images.dfnoTutorial2;
        this.images[2] = images.dfnoTutorial3;
        this.name = 'Desembolso Fixo Não-Obrigatório';
        break;
      case 3:
        this.images[0] = images.dvoTutorial1;
        this.images[1] = images.dvoTutorial2;
        this.images[2] = images.dvoTutorial3;
        this.name = 'Desembolso Variável Obrigatório';
        break;
      case 4:
        this.images[0] = images.dvnoTutorial1;
        this.images[1] = images.dvnoTutorial2;
        this.images[2] = images.dvnoTutorial3;
        this.name = 'Desembolso Variável Não-Obrigatório';
        break;
      case 5:
        this.images[0] = images.diagnosticOptionsTutorial1;
        this.images[1] = images.diagnosticOptionsTutorial2;
        this.images[2] = images.diagnosticOptionsTutorial3;
        this.images[3] = images.diagnosticOptionsTutorial4;
        this.images[4] = images.diagnosticOptionsTutorial5;
        this.images[5] = images.diagnosticOptionsTutorial6;
        this.images[6] = images.diagnosticOptionsTutorial7;
        this.images[7] = images.diagnosticOptionsTutorial8;
        this.images[8] = images.diagnosticOptionsTutorial9;
        this.name = 'Novo Diagnóstico Financeiro';
        break;
      case 6:
        this.images[0] = images.diagnosticResultTutorial1;
        this.images[1] = images.diagnosticResultTutorial2;
        this.images[2] = images.diagnosticResultTutorial3;
        this.images[3] = images.diagnosticResultTutorial4;
        this.images[4] = images.diagnosticResultTutorial5;
        this.images[5] = images.diagnosticResultTutorial6;
        this.name = 'Resultados Diagnóstico';
        break;
    }
    console.log(`TIPO ${this.type} - IMAGENS ${this.images}`);
  }

  next() {
    this.slides.slideNext();
  }

  end() {
    this.viewCtrl.dismiss();
  }
}
