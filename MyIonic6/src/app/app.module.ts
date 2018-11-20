import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RestService } from './Rest/rest.service';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePage } from './home/home.page';
import { Firebase_Config } from '../app/Rest/firebase.cred';
import { AngularFireModule } from 'angularfire2/';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CreateComponent } from '../app/home/create/create.component';
import { AngularFirestoreModule} from 'angularfire2/firestore';
import { GlobalErrorService } from './Rest/global_error';
@NgModule({
  declarations: [ AppComponent, LoginComponent, PageNotFoundComponent, HomePage, CreateComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule, FormsModule,
    AngularFireModule.initializeApp(Firebase_Config),
    ReactiveFormsModule,
    AngularFireDatabaseModule, AngularFirestoreModule],
  exports: [ FormsModule, CreateComponent],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    RestService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GlobalErrorService,
    { provide: ErrorHandler, useClass: GlobalErrorService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
