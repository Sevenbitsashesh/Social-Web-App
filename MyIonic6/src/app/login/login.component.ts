import { Input, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { deepEqual } from 'assert';
import { shallowEqual } from '@angular/router/src/utils/collection';
import { FirebaseAuth } from 'angularfire2';
import { userInfo, type, platform } from 'os';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import {AngularFireDatabase} from 'angularfire2/database';
import { UserDetails } from '../models/user_model';
import { firestore } from 'firebase';
import { Component, OnInit, Injectable } from '@angular/core';
import { RestService } from '../Rest/rest.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, NgModel, FormControl  } from '@angular/forms';
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
  email: string;
  pass: string;
  message: string;
  loginForm: FormGroup;
  model: any;
  validation_messages = {
      'email': [
        {type: 'required', message: 'Email is required'},
        { type: 'pattern', message: 'Not valid email' }
      ],
      'password': [
        { type: 'required', message: 'Password is required'},
        { type: 'pattern', message: 'Minimum 8 and should include at least special charater'}
      ]
    };
  constructor(private router: Router, public rest: RestService, public fireauth: AngularFireAuth, public afs: AngularFirestore,
    formBuilder: FormBuilder, plat: Platform) {
     this.rest.checkLogin();
     console.log('height:', plat.height());
     console.log('width:', plat.width());

    this.loginForm = formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$'),
        Validators.required
      ])),
      pass: new FormControl('', Validators.compose([
        // Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}'),
        Validators.required,
      ])),
    });
  }
  loggedin = false;

  ngOnInit() {
  }
  getLogin() {
     const model = {
      'email': this.loginForm.get('email').value,
      'pass': this.loginForm.get('pass').value
    };

    this.fireauth.auth.signInWithEmailAndPassword(model.email , model.pass).then(user => {
      localStorage.setItem('email', model.email);
      // this.loggedin = true;
      this.router.navigate(['/home']);
     },
     err => {
      this.message = err.message; throw err; }
     );
  }
  // Create user in firebase Authentication
  createAcc() {
    const model = {
      'email': this.loginForm.get('email').value,
      'pass': this.loginForm.get('pass').value
    };
    this.fireauth.auth.createUserWithEmailAndPassword(model.email , model.pass).then(user => {
      this.createUser(model.email , model.pass);
      // this.createUid();
      this.getLogin();
    },
    err => { this.message = err;  throw err;  }
    );

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
