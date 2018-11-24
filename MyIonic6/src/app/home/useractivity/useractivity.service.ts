import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { configusers, configtweets } from '../../models/users_firestore';
import { UserDetails } from '../../models/user_model';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { RestService } from '../../Rest/rest.service';
import { Router } from '@angular/router';
import { TweetModel } from '../../models/tweet_model';
import { Observable, config } from 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class UseractivityService {
  model;
  tweetmodel: TweetModel;
  loggedUser;
  userscollection;
  usersDoc: AngularFirestoreDocument<UserDetails>;
  tweet: AngularFirestoreCollection<TweetModel>;
  tweets: Observable<TweetModel[]>;
  userDoc: string;
  tweetDoc: string;

  constructor(public http: HttpClient, public rest: RestService, private db: AngularFirestore) {
    this.model = rest.model;
     this.loggedUser = rest.loggedUser;
     this.userscollection = rest.userscollection;
      this.getUsername();

  }
getUsername() {
  // Get Logged in user email
 // console.log('hi', this.loggedUser);
  this.db.collection('users').ref.where('email', '==', this.loggedUser).onSnapshot(snap => {
    snap.forEach(change => {
      this.model = change.data();
      localStorage.setItem('username', this.model.userid);
      // Getting Logged users Tweet
      this.tweet = this.db.collection('users').doc(change.id).collection<TweetModel>(configtweets.collection_endpoint);
      this.tweet.ref.get().then( function(querySnapshot) {
         if (querySnapshot.size > 0) {
             querySnapshot.forEach(function(doc) {
               console.log(doc.id);
             });
         }
      }); // Getting Logged users Tweet
      console.log(change.id);
    });
    console.log(this.model.email);
    // Setting Username
    localStorage.setItem('username', this.model.username);
  });
  // getting users document id
  this.db.collection('users').ref.get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      // console.log(doc.data());
     });
    });
  }

  // Tweeet create
  createTweet(tweetcontent, t_title) {
    this.tweetmodel = {
      tweetcontent: tweetcontent,
      tweetid: Math.random().toString(14),
      t_title: t_title,
      t_date: this.rest.getTodayDate()
    };
    const tweetColl = this.db.collection('users').ref.where('email', '==', this.loggedUser);
    console.log(this.loggedUser);
    tweetColl.onSnapshot(snap => {
    snap.forEach(data => {
      this.tweet.add(this.tweetmodel);
    }
    );
    });
    console.log(this.tweetDoc);
  }
  // getUsername() {
  //   // Get Logged in user email
  //  // console.log('hi', this.loggedUser);
  //   this.db.collection('users').ref.where('email', '==', this.loggedUser).onSnapshot(snap => {
  //     snap.forEach(change => {
  //       this.model = change.data();
  //       localStorage.setItem('userid', this.model.userid);
  //     });
  //     console.log(this.model.email);
  //   });
  //   // getting users document id
  //   this.db.collection('users').ref.get().then((snapshot) => {
  //     snapshot.docs.forEach(doc => {
  //       // console.log(doc.data());
  //      });
  //     });
  //   }

}
