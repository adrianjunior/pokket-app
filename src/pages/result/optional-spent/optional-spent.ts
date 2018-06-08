import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-optional-spent',
  templateUrl: 'optional-spent.html',
})
export class OptionalSpentPage {

  fixo = `OptionalFixedSpentPage`;
  variavel = `OptionalVariableSpentPage`;

}
