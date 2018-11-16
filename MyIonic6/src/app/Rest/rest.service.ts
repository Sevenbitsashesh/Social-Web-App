import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { configusers } from '../models/users_firestore';
import { UserDetails } from '../models/user_model';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class RestService {
  model: User;
  users: AngularFirestoreCollection<UserDetails>;
  usersDoc: AngularFirestoreDocument<UserDetails>;
  constructor(public http: HttpClient, public router: Router, private db: AngularFirestore) {
    this.users = this.db.collection<UserDetails>(configusers.collection_endpoint);
  }

  // Adding user info
  addInfo(user) {
    this.users.add(user);
  }
  // Error handler

  // Checking Login
  checkLogin() {
    if (localStorage.getItem('userid') !== null ) {
        this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
// Login model
export class User {
  userid: string;
  constructor(userid: Object = {} ) {
    Object.assign(this, userid);
}
}
