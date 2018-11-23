import { Component, OnInit } from '@angular/core';
import { UseractivityService } from '../useractivity/useractivity.service';
import { PassThrough } from 'stream';
import { TweetModel } from '../../models/tweet_model';
@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.scss']
})
export class UserhomeComponent implements OnInit {
  tweetcontent;
  t_title;
  constructor(public uactivity: UseractivityService) {
  }
  createTweet() {
      this.uactivity.createTweet(this.tweetcontent, this.t_title);
  }

  ngOnInit() {
  }
}
