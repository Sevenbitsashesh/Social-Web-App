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
searchdata;
  constructor(public uactivity: UseractivityService, public navcontroller: NavController) {
    this.u = uactivity.getAllUsers();
  }
  ngOnInit() {
  }
  onInput() {
   console.log('searching', this.search_content.toLowerCase());
    this.search = [];
    this.u.forEach(i => {
      // const searching: string = i.userid;
     if ( this.search_content !== '' && i.toLowerCase().indexOf(this.search_content.toLowerCase()) > -1) {
       this.search.push(i);
     }
    });
    console.log('searched: ', this.search);
  }

  goSearchView(user) {
console.log('selected user:', user);
 this.search_content = user;
this.searchdata = user;
  }
}
