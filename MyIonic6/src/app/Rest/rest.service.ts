import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { configusers } from '../models/users_firestore';
import { UserDetails } from '../models/user_model';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Rx';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class RestService {
  model: UserDetails;
  users: AngularFirestoreCollection<UserDetails>;
  usersDoc: AngularFirestoreDocument<UserDetails>;
  loggedUser: any[];
  constructor(public http: HttpClient, public router: Router, private db: AngularFirestore) {
    this.users = this.db.collection<UserDetails>(configusers.collection_endpoint);
  }

  // Adding user info
  addInfo(model) {
    console.log(model);
    // this.users.add(model));
    if (true ) {
      this.router.navigate(['/tabs']);
    }

  }
  getLogged() {
    return localStorage.getItem('userid');
  }
  // Checking Login
  checkLogin() {
    if (localStorage.getItem('userid') !== null ) {
        this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}

