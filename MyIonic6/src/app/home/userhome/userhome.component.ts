import { Component, OnInit } from '@angular/core';
import { UseractivityService } from '../useractivity/useractivity.service';
import { PassThrough } from 'stream';
@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.scss']
})
export class UserhomeComponent implements OnInit {
  model;
  constructor(public uactivity: UseractivityService) {
  }
  createTweet() {
    this.uactivity.createTweet(this.model.tweetcontent);
  }

  ngOnInit() {
  }
}
