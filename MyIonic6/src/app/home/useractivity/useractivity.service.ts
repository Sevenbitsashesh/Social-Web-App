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
import { map, finalize } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AngularFireStorage } from 'angularfire2/storage';
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
  myPhotoURL: any;
  stor_task: any;
  constructor(public http: HttpClient, public rest: RestService, private db: AngularFirestore, private fstorage: AngularFireStorage) {
    this.model = rest.model;
     this.loggedUser = rest.loggedUser;
     this.userscollection = rest.userscollection;
      this.getUsername();
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
      // console.log('model', this.model);
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

  public uploadPhoto(profilepic) {
    const file = 'data:image/jpg;base64,' + profilepic;
    this.stor_task =  this.fstorage.ref(this.generateUUID() + '.jpg').putString(file, 'data_url').snapshotChanges().pipe(
      finalize(() => {
        this.storageRef.getDownloadURL().subscribe(url => {
        this.myPhotoURL = url;
        this.rest.saveProfilePic(url, this.uid);
        });
      }));
    // this.stor_task =  this.fstorage.ref(this.generateUUID() + '.jpg').putString(file, 'data_url').then(snapshot => {
    //   // this.myPhotoURL = this.stor_task.ref.downloadURL();
    //   this.myPhotoURL = snapshot.ref.getDownloadURL();
    //   this.rest.saveProfilePic(this.myPhotoURL, this.uid);
    // });
    // return this.myPhotoURL;
  }
  private generateUUID(): any {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
}
