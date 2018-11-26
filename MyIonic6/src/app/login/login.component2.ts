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
  email;
  pass;
  message: string;
  constructor(private router: Router, public rest: RestService, public fireauth: AngularFireAuth, public afs: AngularFirestore) {
    this.rest.checkLogin();
  }
  loggedin = false;

  ngOnInit() {
  }

  getLogin(email: string, pass: string) {

    this.fireauth.auth.signInWithEmailAndPassword(email, pass).then(user => {
      localStorage.setItem('email', email);
      this.loggedin = true;
      this.router.navigate(['/home']);
     },
     err => { this.message = err; throw err;  }
     );
  }
  // Create user in firebase Authentication
  createAcc(email: string, pass: string) {
    this.fireauth.auth.createUserWithEmailAndPassword(email, pass).then(user => {
      this.createUser(email, pass);
      this.getLogin(email, pass);
    },
    err => { this.message = err; throw err;  }
    );
    //  pass: new FormControl('', Validators.required)
  }

  // create user in Firestore
  createUser(email: string, password: string) {
    const user = {
      email: email,
      password: password
    };
    this.rest.addInfo(user);
  }


}