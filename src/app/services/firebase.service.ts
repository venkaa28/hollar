import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from "@angular/fire/firestore";
import {UserProfile} from "../../models/userProfile.model";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import * as UserActions from "../stores/userStore/userActions";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public connectionsObservable: Observable<UserProfile[]>;
  public userObservable: Observable<UserProfile>;

  constructor(private afAuth: AngularFireAuth, private afDB: AngularFireDatabase,
              private afStore: AngularFirestore) {

  }

  user$(): Observable<any> {
    return this.afStore.doc<UserProfile>(`users/${firebase.auth().currentUser.uid}`).valueChanges().pipe(
      tap(r => {
        console.groupCollapsed(`Firestore Streaming users/${firebase.auth().currentUser.uid}`);
        console.log(r['user']);
        console.groupEnd();
      }),
    );
  }

  connections$(connections: []): Observable<any[]> {
    return this.afStore.collection<UserProfile>('users', ref => ref.where(firebase.firestore.FieldPath.documentId(), 'in', connections))
      .valueChanges().pipe(
      tap(r => {
        console.groupCollapsed(`Firestore Streaming [current users connections] [collection$]`);
        console.table(r);
        console.groupEnd();
      }),
    );
}

  // writeUser$(user: UserProfile) {
  //   const id = firebase.auth().currentUser.uid;
  //   user.linkedAccounts = {...user.linkedAccounts};
  //   return  this.afStore.collection('users').doc(id).set({user}).then(_ => {
  //       console.groupCollapsed(`Firestore Service user [create]`);
  //       console.log('[Id]', id, user);
  //       console.groupEnd();
  //   });
  // }

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

}
