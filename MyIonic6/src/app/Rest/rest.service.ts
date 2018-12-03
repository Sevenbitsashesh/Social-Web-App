import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { configusers } from '../models/users_firestore';
import { UserDetails } from '../models/user_model';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { formatDate } from '@angular/common';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class RestService {
  model: UserDetails;
  userscollection: AngularFirestoreCollection<UserDetails>;
  loggedUser: any;
  constructor(public http: HttpClient, public router: Router, private db: AngularFirestore, public Toast: ToastController) {
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
    console.log('getlogged', localStorage.getItem('usermail'));
    return localStorage.getItem('usermail');
  }
  saveProfilePic(img: any, uid) {
    const promodel = {
     'profile_pic': img
    };
    this.db.collection('users').doc(`${uid}`).update(promodel).then(snap => {
      this.callToast('Profile Pic Updated');
      this.router.navigate(['/tabs/(home_tab:home_tab)']);
    });
  }
  // Checking Login
  checkLogin() {
    if (localStorage.getItem('usermail') !== null ) {
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
async callToast(msg) {
  const toast = await this.Toast.create({
    message: msg,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}

}

