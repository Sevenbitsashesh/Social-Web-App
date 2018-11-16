import { Component, NgModule } from '@angular/core';
import {RestService} from '../Rest/rest.service';
import { LoginComponent } from '../login/login.component';
import 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root2',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  users: any;
  loggedUsers: string = localStorage.getItem('userid');
  constructor(public restProvider: RestService, public route: Router) {
    this.restProvider.checkLogin();
  }
  logout() {
    localStorage.clear();
    this.restProvider.checkLogin();
  }
}
