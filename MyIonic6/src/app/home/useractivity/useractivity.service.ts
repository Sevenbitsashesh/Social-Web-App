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
import { map } from 'rxjs/operators';
import firebase = require('firebase');
@Injectable({
  providedIn: 'root'
})
export class UseractivityService {
  model;
  tweetmodel: TweetModel;
  loggedUser;
  userscollection;
  usersDoc: AngularFirestoreDocument<UserDetails>;
  tweetscollection: AngularFirestoreCollection<TweetModel>;
  uid;
  usersTweets = [];
  storageRef: any;
  myPhotoURL;
  constructor(public http: HttpClient, public rest: RestService, private db: AngularFirestore) {
    this.model = rest.model;
     this.loggedUser = rest.loggedUser;
     this.userscollection = rest.userscollection;
      this.getUsername();
    this.storageRef = firebase.storage().ref('/profiles/');
  }
// Adding user info
addInfo(model) {
  this.rest.saveProfile(model, this.uid);
  // this.userscollection.add(model);
  // this.db.collection<UserDetails>
}
getUsername() {
  console.log('uid', this.loggedUser);
  // Get Logged in user email
  this.db.collection('users').ref.where('email', '==', this.loggedUser).onSnapshot(snap => {
    snap.forEach(change => {
      // Users Profile data set to model
      this.model = change.data();
      // console.log(this.model);
      localStorage.setItem('username', this.model.userid);
      // Getting Logged user id
       this.uid = change.id;
        this.getTweets(this.uid);

      // console.log('new', this.uid);
    });
    // console.log(this.model.email);
    // Setting Username
    // localStorage.setItem('username', this.model.username);
  });
  // getting users document id
  // this.db.collection('users').ref.get().then((snapshot) => {
  //   snapshot.docs.forEach(doc => {
  //      // console.log(doc.id);
  //    });
  //   });
  }

// Getusernames tweets
// getUsername() {
//   console.log('uid', this.loggedUser);
//   // Get Logged in user email
//   this.db.collection('users').ref.where('email', '==', this.loggedUser).onSnapshot(snap => {
//     snap.forEach(change => {
//       this.model = change.data();
//       console.log(this.model);
//       localStorage.setItem('username', this.model.userid);
//       // Getting Logged users Tweet
//       this.tweet = this.db.collection('users').doc(change.id).collection<TweetModel>(configtweets.collection_endpoint);
//       this.tweet.ref.get().then( function(querySnapshot) {
//          if (querySnapshot.size > 0) {
//              querySnapshot.forEach(function(doc) {
//               // Tweets document ids
//               // console.log(doc.id);
//              });
//          }
//       });
//       // Getting Logged user id
//       this.uid = change.id;
//     });
//     console.log(this.model.email);
//     // Setting Username
//     // localStorage.setItem('username', this.model.username);
//     console.log('new id', this.uid);
//   });
//   // getting users document id
//   this.db.collection('users').ref.get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//       // console.log(doc.data());
//      });
//     });
//   }


  getTweets(uid) {

      // Getting Logged users Tweet
      this.tweetscollection = this.db.collection('users').doc(uid).collection<TweetModel>(configtweets.collection_endpoint);
      const observer  = this.tweetscollection.snapshotChanges().
      pipe(map(docArray => {
         return docArray.map(data => {

        return ( {tweetcontent: data.payload.doc.data()['tweetcontent'], t_title: data.payload.doc.data()['t_title'],
        t_date: data.payload.doc.data()['t_date']
        });
      });
    } )
    ).subscribe(tweets => {
      [].push.apply(this.usersTweets, tweets);
      console.log('t:', this.usersTweets);
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
      this.tweetscollection.add(this.tweetmodel);
    }
    );
    });
  }
  uploadImage(profilePic) {
    this.storageRef.child('profilepic1.png')
    .putString(profilePic, 'base64', { contentType: 'image/png' })
    .then((savedPicture) => {
      this.myPhotoURL = savedPicture.downloadURL;
    });
  }
}
