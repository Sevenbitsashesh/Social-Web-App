import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { configusers } from '../models/users_firestore';
import { UserDetails } from '../models/user_model';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  model: UserDetails;
  userscollection: AngularFirestoreCollection<UserDetails>;
  usersDoc: AngularFirestoreDocument<UserDetails>;
  loggedUser: any;
  constructor(public http: HttpClient, public router: Router, private db: AngularFirestore) {
    this.userscollection = this.db.collection<UserDetails>(configusers.collection_endpoint);
  }

  // Adding user info
  addInfo(model) {
    console.log(model);
     this.userscollection.add(model);
    if (true ) {
      this.router.navigate(['/tabs']);
    }
  }
  // Profile data update of user by uid
  saveProfile(model, uid) {
    console.log(model, uid);
     this.db.doc<UserDetails>(`users/${uid}`).set(model).then(saved => {
      this.router.navigate(['/tabs']);
     }).catch(error => console.log(error));
  }
    getLogged() {
    console.log('getlogged', localStorage.getItem('username'));
    return localStorage.getItem('username');
  }

  // Checking Login
  checkLogin() {
    if (localStorage.getItem('username') !== null ) {
      // setting login user
       this.loggedUser = this.getLogged();
        // this.loggedUser = this.loggedUser.toLowerCase();
        this.router.navigateByUrl('/tabs/(home_tab:home_tab)');
    } else {
      this.router.navigate(['/login']);
    }
  }
  getTodayDate() {
      const today = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss', 'en-US');
      return today;
  }
}

