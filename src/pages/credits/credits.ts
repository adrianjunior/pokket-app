import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Credit } from '../../assets/data/credit.interface';
import members from '../../assets/data/members';
import monitors from '../../assets/data/monitors';
import teachers from '../../assets/data/teachers';

@IonicPage()
@Component({
  selector: 'page-credits',
  templateUrl: 'credits.html',
})
export class CreditsPage {

  members: Credit[];
  monitors: Credit[];
  teachers: Credit[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.members = members;
    this.monitors = monitors;
    this.teachers = teachers;
  }

}
