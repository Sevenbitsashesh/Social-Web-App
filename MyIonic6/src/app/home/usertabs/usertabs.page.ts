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
  loggedUsers;
  constructor(public restProvider: RestService, public route: Router) {
     this.loggedUsers = localStorage.getItem('userid');
     this.restProvider.checkLogin();
  }
  logout() {
    localStorage.removeItem('userid');
    this.restProvider.checkLogin();
  }
  ngOnInit() {
  }

}
