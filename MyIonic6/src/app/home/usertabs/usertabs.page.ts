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
  loggedUsers: string = localStorage.getItem('userid');
  constructor(public restProvider: RestService, public route: Router) {
    // this.restProvider.checkLogin();
  }
  logout() {
    localStorage.clear();
    this.restProvider.checkLogin();
  }
  ngOnInit() {
  }

}
