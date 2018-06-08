import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-required-spent',
  templateUrl: 'required-spent.html',
})
export class RequiredSpentPage {

  ofixo = `RequiredFixedSpentPage`;
  ovariavel = `RequiredVariableSpentPage`;

}
