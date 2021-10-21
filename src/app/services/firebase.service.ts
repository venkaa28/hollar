import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {UserProfile} from "../../models/userProfile.model";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private snapshotChangesSubscription: any;

  constructor(private afAuth: AngularFireAuth, private afDB: AngularFireDatabase,
              private afStore: AngularFirestore) {

  }

  writeNewUser(user: UserProfile){
    // AFStore Code
    return new Promise<any>((resolve, reject) => {
      const currentUser = firebase.auth().currentUser;
      user.linkedAccounts = {...user.linkedAccounts};
      this.afStore.collection('users').doc(currentUser.uid).set({user})
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  getLoggedInUserProfile(){
    //const currentUser = firebase.auth().currentUser;
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.snapshotChangesSubscription = this.afStore.doc<UserProfile>('users/' + currentUser.uid).valueChanges()
            .subscribe(snapshots => {
              resolve(snapshots);
            }, err => {
              reject(err)
            });
        }
      });
    });
    //return this.afStore.collection<UserProfile>('users').doc(currentUser.uid).get();
    //const userData = this.afDB.list('accounts/'+currentUser.uid).valueChanges();
    //await firebase.database().ref('accounts/' + currentUser.uid).on('value', async (snapshot) => {
    //}
  }

}
