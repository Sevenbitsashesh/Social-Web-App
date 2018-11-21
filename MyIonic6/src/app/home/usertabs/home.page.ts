import { Component, NgModule } from '@angular/core';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { RestService } from '../../Rest/rest.service';

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
