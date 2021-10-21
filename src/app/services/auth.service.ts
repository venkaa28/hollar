import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {UserProfile} from '../../models/userProfile.model';
import {FirebaseService} from './firebase.service';
import {Observable} from 'rxjs';
import {LinkedAccountsModel} from '../../models/linkedAccounts.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: UserProfile;

  constructor(private afAuth: AngularFireAuth,
              private firebaseService: FirebaseService) {

  }

  //change to accept a user model
  doRegister(userDict){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(userDict.email, userDict.password)
        .then(
          async res => {
            await this.firebaseService.writeNewUser(userDict);
            this.user = {
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
            };
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

}
