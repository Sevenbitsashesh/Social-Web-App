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
import { analyzeAndValidateNgModules } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class UseractivityService {
  model;
  loggedUser;
  userscollection;
  usersDoc: AngularFirestoreDocument<UserDetails>;
  tweet: AngularFirestoreCollection<TweetModel>;
  tweets: Observable<TweetModel[]>;
  userDoc: string;
  constructor(public http: HttpClient, public rest: RestService, private db: AngularFirestore) {
    this.model = rest.model;
     this.loggedUser = rest.loggedUser;
     this.userscollection = rest.userscollection;
      this.getUsername();
     // Get Users Tweets
    //  this.tweet = this.db.collection('users').doc('gzQy1ok5IRAFgngn8nul').collection<TweetModel>(configtweets.collection_endpoint);
    //  this.tweet.ref.get().then( function(querySnapshot) {
    //     if (querySnapshot.size > 0) {
    //         querySnapshot.forEach(function(doc) {
    //           console.log(doc.id);
    //         });
    //     }
    //  });
     console.log(this.loggedUser);
  }
getUsername() {
  this.db.collection('users').ref.where('email', '==', this.loggedUser).onSnapshot(snap => {
    snap.forEach(change => {
      this.model = change.data();
      localStorage.setItem('userid', this.model.userid);
    });
    console.log(this.model.userid);
  });
  // getting users document id
  // this.db.collection('users').ref.get().then((snapshot) => {
  //   snapshot.docs.forEach(doc => {
  //     console.log(doc.id);
  //    });
  //   });
  }


  createTweet() {
  }
}
