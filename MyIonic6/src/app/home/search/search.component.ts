import { Component, OnInit } from '@angular/core';
import { UseractivityService } from '../useractivity/useractivity.service';
import { JsonPipe } from '@angular/common';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
userid;
u: any[];
search = [];
search_content: string;
  constructor(uactivity: UseractivityService, public router: Router) {
    this.u = uactivity.getAllUsers();
// console.log('u',);
  }
  ngOnInit() {
  }
  onInput() {
   console.log('searching', this.search_content.toLowerCase());
    this.search = [];
    this.u.forEach(i => {
      // const searching: string = i.userid;
     if ( this.search_content !== '' && i.toLowerCase().indexOf(this.search_content) > -1) {
       this.search.push(i);
     }
    });
    console.log('searched: ', this.search);
  }
  goSearchView(user) {
console.log('selected user:', user);
this.router.navigate(['/searchview']);
  }
}
