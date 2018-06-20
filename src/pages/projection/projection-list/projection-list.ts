import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Projection } from '../../../assets/data/projection.interface';
import { Diagnostic } from '../../../assets/data/diagnostic.interface';

@IonicPage()
@Component({
  selector: 'page-projection-list',
  templateUrl: 'projection-list.html',
})
export class ProjectionListPage implements OnInit {

  projections: Projection[] = [];

  projectionPage = `ProjectionPage`;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  ngOnInit() {
    this.projections = this.navParams.get('projections');
  }

  goToProjection(number: number, name: string, diagnostics: Diagnostic[]) {
    this.navCtrl.push(this.projectionPage, {
      balanceNumber: number, balanceName: name, diagnostics: diagnostics
    });
    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
