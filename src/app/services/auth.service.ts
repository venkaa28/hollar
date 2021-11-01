import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserProfile} from '../../models/userProfile.model';
import {FirebaseService} from './firebase.service';
import {Observable} from 'rxjs';
import {LinkedAccountsModel} from '../../models/linkedAccounts.model';
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userObservable: Observable<UserProfile> | null = null;
  public user: UserProfile;

  constructor(private afAuth: AngularFireAuth,
              private firebaseService: FirebaseService,
              private afStore: AngularFirestore) {

    this.afAuth.onAuthStateChanged( async (firebaseUser) => {
      if (firebaseUser) {
        this.userObservable = await this.afStore.doc<UserProfile>('users/' + firebaseUser.uid).valueChanges();
        this.userObservable.subscribe((data) => {
          this.user = data;
        });
      } else {
        this.userObservable = null;
        this.user = null;
      }
    });
  }

  async getUserObservable() {
    if (this.userObservable != null) {
      return this.userObservable;
    }else {
      this.userObservable = await this.afStore.doc<UserProfile>('users/' + firebase.auth().currentUser.uid).valueChanges();
      this.userObservable.subscribe((data) => {
        this.user = data;
      });
      return this.userObservable;
    }

  }

  getUser(){
    return this.user;
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
        .then(res => {
          this.firebaseService.unsubscribeOnLogOut();
          resolve(res);
        }, ).catch((error) => {
        console.log(error);
        reject();
      });
    });
  }

}
