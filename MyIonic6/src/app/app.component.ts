import { Component, NgModule } from '@angular/core';

import { Platform, App } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireDatabase  } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2/';
import { Firebase_Config } from '../app/Rest/firebase.cred';
import { NgModel } from '@angular/forms';
import firestore from 'firebase/firestore';
import { Set_Firestore } from '../app/Rest/setting_forestore';
import { RestService } from './Rest/rest.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private rest: RestService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      AngularFireModule.initializeApp(Firebase_Config);
    });
  }
}
