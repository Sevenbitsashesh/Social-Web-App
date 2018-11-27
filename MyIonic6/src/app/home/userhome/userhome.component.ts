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
  tweets: any;
  t_title;

  constructor(public uactivity: UseractivityService) {
     this.tweets = this.uactivity.usersTweets;
    this.getTweet();
  }

  createTweet() {
      this.uactivity.createTweet(this.tweetcontent, this.t_title);
  }
  getTweet() {
     console.log('data :', this.tweets );
  }
  ngOnInit() {

  }
}
