import { Injectable, Component } from '@angular/core';
import { UserhomeComponent } from './userhome/userhome.component';
@Component({
  selector: 'app-userhome',
})
export class UsertabsService {
  tab1: any;
  tab2: any;
  tab3: any;
  constructor() {
    this.tab1 = UserhomeComponent;
  }
}

