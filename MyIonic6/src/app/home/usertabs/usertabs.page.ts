import { Component, OnInit } from '@angular/core';
import { RestService } from '../../Rest/rest.service';

@Component({
  selector: 'app-usertabs',
  templateUrl: './usertabs.page.html',
  styleUrls: ['./usertabs.page.scss'],
})
export class UsertabsPage implements OnInit {

  constructor(rest: RestService) {
    // rest.checkLogin();
  }

  ngOnInit() {
  }

}
