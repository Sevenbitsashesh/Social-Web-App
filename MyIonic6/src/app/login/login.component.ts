import { Input } from '@ionic/angular';
import { Observable } from 'rxjs';
import { deepEqual } from 'assert';
import { shallowEqual } from '@angular/router/src/utils/collection';
import { FirebaseAuth } from 'angularfire2';
import { userInfo } from 'os';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import {AngularFireDatabase} from 'angularfire2/database';
import { UserDetails } from '../models/user_model';
import { firestore } from 'firebase';
import { Component, OnInit, Injectable } from '@angular/core';
import { RestService } from '../Rest/rest.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, NgModel  } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { ErrorHandler } from '@angular/router/src/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
@Injectable()
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
     },
     err => { this.message = err; throw err;  }
     );
  }
  // Create user in firebase Authentication
  createAcc(userid: string, pass: string) {
    this.fireauth.auth.createUserWithEmailAndPassword(userid, pass).then(user => {
      this.createUser(userid, pass);
      this.getLogin(userid, pass);
    },
    err => { this.message = err; throw err;  }
    );
  }

  // create user in Firestore
  createUser(userid: string, password: string) {
    const user = {
      userid: userid,
      password: password
    };
    this.rest.addInfo(user);
  }


}
