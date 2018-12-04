import { Component, OnInit } from '@angular/core';
import { Nav, NavController, NavParams } from '@ionic/angular';
import { UseractivityService } from '../useractivity/useractivity.service';

@Component({
  selector: 'app-searchview',
  templateUrl: './searchview.component.html',
  styleUrls: ['./searchview.component.scss']
})
export class SearchviewComponent implements OnInit {
  userid;
  u: any[];
  search = [];
  search_content: string;
  searchdata;
  nav: Nav;
  constructor(public uactivity: UseractivityService, public navcontroller: NavController, public navParam: NavParams) {
    this.u = uactivity.getAllUsers();
    console.log('users coll', this.u);
  }

  ngOnInit() {
  }
  onInput() {
    console.log('searching', this.search_content.toLowerCase());
     this.search = [];
     this.u.forEach(i => {
       // const searching: string = i.userid;
      if ( this.search_content !== '' && i.userid.toLowerCase().indexOf(this.search_content.toLowerCase()) > -1) {
        this.search.push(i);
      }
     });
     console.log('searched: ', this.search);
   }

   goSearchView(user) {
 console.log('selected user:', user);
  this.search_content = user;
 this.searchdata = user;
 this.navParam.data = {
   'search': this.searchdata
 };
 this.navcontroller.navigateRoot('/tabs/(view_tab:view_tab)');
   }
}
