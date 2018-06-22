import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ViewController } from 'ionic-angular';

import images from '../../../assets/data/image-paths';

@IonicPage()
@Component({
  selector: 'page-form-tutorial',
  templateUrl: 'form-tutorial.html',
})
export class FormTutorialPage {
  @ViewChild(Slides) slides: Slides;

  formListPage = `FormListPage`;
  images: string[] = [];
  type: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.type = this.navParams.get('type');
    switch (this.type) {
      case 0:
        this.images[0] = images.receitaTutorial1;
        this.images[1] = images.receitaTutorial2;
        this.images[2] = images.receitaTutorial3;
        break;
      case 1:
        this.images[0] = images.dfoTutorial1;
        this.images[1] = images.dfoTutorial2;
        this.images[2] = images.dfoTutorial3;
        break;
      case 2:
        this.images[0] = images.dfnoTutorial1;
        this.images[1] = images.dfnoTutorial2;
        this.images[2] = images.dfnoTutorial3;
        break;
      case 3:
        this.images[0] = images.dvoTutorial1;
        this.images[1] = images.dvoTutorial2;
        this.images[2] = images.dvoTutorial3;
        break;
      case 4:
        this.images[0] = images.dvnoTutorial1;
        this.images[1] = images.dvnoTutorial2;
        this.images[2] = images.dvnoTutorial3;
        break;
      case 5:
        this.images[0] = images.formListTutorial1;
        this.images[1] = images.formListTutorial2;
        this.images[2] = images.formListTutorial3;
        this.images[3] = images.formListTutorial4;
        this.images[4] = images.formListTutorial5;
        this.images[5] = images.formListTutorial6;
        this.images[6] = images.formListTutorial7;
        this.images[7] = images.formListTutorial8;
        this.images[8] = images.formListTutorial9;
        break;
      case 6:
        this.images[0] = images.graficosTutorial1;
        this.images[1] = images.graficosTutorial2;
        this.images[2] = images.graficosTutorial3;
        this.images[3] = images.graficosTutorial4;
        this.images[4] = images.graficosTutorial5;
        this.images[5] = images.graficosTutorial6;
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
