import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = `FormListPage`;

  formListPage = `FormListPage`;
  incomePage = `IncomePage`;
  debtPage = `DebtPage`;
  assetPage = `AssetPage`;
  requiredSpentPage = `RequiredSpentPage`;
  optionalSpentPage = `OptionalSpentPage`;
  helpPage = `HelpPage`;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, storage: Storage) {
    storage.get('Diagnostic')
      .then(value => {
        if (value) {
          this.nav.setRoot(this.incomePage);
        } else {
          this.nav.setRoot(this.formListPage);
        }
      })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page);
  }

}

