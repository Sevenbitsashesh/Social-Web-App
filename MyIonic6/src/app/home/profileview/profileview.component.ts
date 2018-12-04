import { Component, OnInit, Input } from '@angular/core';
import { UseractivityService } from '../useractivity/useractivity.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.scss']
})
export class ProfileviewComponent implements OnInit {
@Input() searchdata;
content;
  constructor(public uactivity: UseractivityService, public navctrler: NavController) {
  }

  ngOnInit() {
  }
  getUser() {
    this.uactivity.searchData(this.searchdata);
  }
  goback() {
    this.navctrler.goBack();
  }
}
