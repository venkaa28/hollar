import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserProfile} from '../../models/userProfile.model';
import {FirebaseService} from './firebase.service';
import {Observable} from 'rxjs';
import {LinkedAccountsModel} from '../../models/linkedAccounts.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private afAuth: AngularFireAuth,
              private firebaseService: FirebaseService,
              private afStore: AngularFirestore,
              private router: Router) {
  }

  //change to accept a user model
  doRegister(userDict){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(userDict.email, userDict.password)
        .then(
          async res => {
            const newUser: UserProfile = {
              uid: firebase.auth().currentUser.uid,
              firstName: userDict.firstName,
              lastName: userDict.lastName,
              email: userDict.email,
              connections: [],
              inviteRequests: [],
              phoneNumber: userDict.phoneNumber,
              company: '',
              industry : '',
              job: '',
              linkedAccounts: new LinkedAccountsModel(),
              documents: [],
              profilePicture: ''
            };
            await this.firebaseService.writeNewUser(newUser);
            resolve(res);
          },
          err => reject(err)
        );
    });
  }

doLogin(email, password){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
      .then(
        res => resolve(res),
        err => reject(err)
      );
    });
  }

  doResetPassword(email){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.sendPasswordResetEmail(email)
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      this.afAuth.signOut()
        .then(async res => {
          await this.router.navigateByUrl('/login', {replaceUrl: true});
          resolve(res);
        }, ).catch((error) => {
        console.log(error);
        reject();
      });
    });
  }

}
