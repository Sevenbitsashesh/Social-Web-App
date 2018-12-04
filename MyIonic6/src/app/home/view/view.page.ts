import { Component, OnInit, Input } from '@angular/core';
import { UseractivityService } from '../useractivity/useractivity.service';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
@Input() searchdata = 'IAshesh40';
  constructor(uactivity: UseractivityService) {
    const  node: Subject<UseractivityService> = new BehaviorSubject<UseractivityService>(uactivity);
    uactivity.searchData(this.searchdata);
   }

  ngOnInit() {
  }

}
