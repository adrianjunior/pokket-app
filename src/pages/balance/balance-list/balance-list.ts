import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Balance } from '../../../assets/data/balance.interface';
import { Diagnostic } from '../../../assets/data/diagnostic.interface';

@IonicPage()
@Component({
  selector: 'page-balance-list',
  templateUrl: 'balance-list.html',
})
export class BalanceListPage implements OnInit {

  balances: Balance[] = [];

  balanceResultPage = `BalanceResultPage`;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  ngOnInit() {
    this.balances = this.navParams.get('Balanços');
  }

  goToBalance(number: number, name: string, diagnostics: Diagnostic[]) {
    this.navCtrl.push(this.balanceResultPage, {
      balanceNumber: number, balanceName: name, diagnostics: diagnostics
    });
    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
