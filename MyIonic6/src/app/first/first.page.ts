import { Component, OnInit } from '@angular/core';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first',
  templateUrl: './first.page.html',
  styleUrls: ['./first.page.scss'],
})
export class FirstPage implements OnInit {
  firsttime = 'load';
  constructor(private rout: Router) {
    this.check();
  }
  check() {
    if (localStorage.getItem('firsttime') ===  'load') {
      this.rout.navigate(['/login']);
      }
  }
set() {
  localStorage.setItem('firsttime', this.firsttime);
  this.check();
}
  ngOnInit() {

  }

}
