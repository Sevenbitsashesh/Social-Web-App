import { Component, OnInit } from '@angular/core';
import { RestService } from '../../Rest/rest.service';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { UseractivityService } from '../useractivity/useractivity.service';
@Component({
  selector: 'app-usertabs',
  templateUrl: './usertabs.page.html',
  styleUrls: ['./usertabs.page.scss'],
})
export class UsertabsPage implements OnInit {
  users: any;
  username: any;
  constructor(public restProvider: RestService, public route: Router) {
     this.restProvider.checkLogin();
     this.username = localStorage.getItem('username');
  }
  logout() {
    localStorage.removeItem('usermail');
     localStorage.removeItem('username');
    this.restProvider.checkLogin();
  }
  ngOnInit() {
  }

}
