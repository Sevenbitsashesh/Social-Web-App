import { Component, OnInit } from '@angular/core';
import { UseractivityService } from '../useractivity/useractivity.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
userid;
u: any;
  constructor(uactivity: UseractivityService) {
    this.u = uactivity.getAllUsers();
// console.log('u',);
  }

  ngOnInit() {
  }

}
