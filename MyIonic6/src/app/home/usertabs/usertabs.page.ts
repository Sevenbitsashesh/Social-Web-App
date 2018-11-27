import { Component, OnInit } from '@angular/core';
import { RestService } from '../../Rest/rest.service';
import 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usertabs',
  templateUrl: './usertabs.page.html',
  styleUrls: ['./usertabs.page.scss'],
})
export class UsertabsPage implements OnInit {
  users: any;
  username: any;
  constructor(public restProvider: RestService, public route: Router) {
    console.log('usertab page');
     this.restProvider.checkLogin();
     this.username = localStorage.getItem('username');
  }
  logout() {
    this.restProvider = undefined;
    localStorage.removeItem('usermail');
     localStorage.removeItem('username');
    this.restProvider.checkLogin();
  }
  ngOnInit() {
  }

}
