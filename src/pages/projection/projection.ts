import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Diagnostic } from '../../assets/data/diagnostic.interface';
import { Projection } from '../../assets/data/projection.interface';
import { NewProjectionPage } from './new-projection/new-projection';

@IonicPage()
@Component({
  selector: 'page-projection',
  templateUrl: 'projection.html',
})
export class ProjectionPage implements OnInit {

  balanceNumber: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.balanceNumber = this.navParams.get('balanceNumber');
  }
}
