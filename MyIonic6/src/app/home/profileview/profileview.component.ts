import { Component, OnInit, Input } from '@angular/core';
import { UseractivityService } from '../useractivity/useractivity.service';

@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.scss']
})
export class ProfileviewComponent implements OnInit {
@Input() searchdata;
content;
  constructor(public uactivity: UseractivityService) {
  }

  ngOnInit() {
  }
  getUser() {
    this.uactivity.searchData(this.searchdata);
  }
}
