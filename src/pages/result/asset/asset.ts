import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-asset',
  templateUrl: 'asset.html',
})
export class AssetPage {

  financeiros: string = `FinancialAssetPage`;
  naoFinanceiros: string = `NonFinancialAssetPage`;

}
