import { Component, OnInit } from '@angular/core';
import { HomePage } from '../home/home.page';
import { RestService, User } from '../Rest/rest.service';
import { Router } from '@angular/router';
import { Input } from '@ionic/angular';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, NgModel  } from '@angular/forms';
import { Observable } from 'rxjs';
import { deepEqual } from 'assert';
import { shallowEqual } from '@angular/router/src/utils/collection';
import { FirebaseAuth } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { userInfo } from 'os';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { UserDetails } from '../models/user_model';
import { firestore } from 'firebase';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentialsForm: FormGroup;
  ref = firebase.database().ref('users/').push();
  userid;
  pass;
  message: string;
  constructor(private router: Router, public rest: RestService, public fireauth: AngularFireAuth, public afs: AngularFirestore) {
    this.rest.checkLogin();
  }
  loggedin = false;
  model: any = {};
  ngOnInit() {
  }
  getLogin(userid: string, pass: string) {

    this.fireauth.auth.signInWithEmailAndPassword(userid, pass).then(user => {
      localStorage.setItem('userid', userid);
      this.loggedin = true;
      this.router.navigate(['/home']);
     });
     this.message = 'Please check your login details';
  }
  createAcc(userid: string, pass: string) {
    this.fireauth.auth.createUserWithEmailAndPassword(userid, pass).then(user => {
      this.createUser(userid);
      this.getLogin(userid, pass);
    });
  }
  createUser(userid: string) {
    this.ref.set(userid);
  }



}
