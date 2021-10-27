import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from "@angular/fire/firestore";
import {UserProfile} from "../../models/userProfile.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public connectionsObservable: Observable<Array<UserProfile>> | null = null;
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
              reject(err);
            });
        }
      });
    });
    //return this.afStore.collection<UserProfile>('users').doc(currentUser.uid).get();
    //const userData = this.afDB.list('accounts/'+currentUser.uid).valueChanges();
    //await firebase.database().ref('accounts/' + currentUser.uid).on('value', async (snapshot) => {
    //}
  }

  getConnections(connections: []){
    console.log(connections);
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.snapshotChangesSubscription = this.afStore
            .collection('users', ref => ref.where(firebase.firestore.FieldPath.documentId(), 'in', connections))
            .snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      });
    });
  }

  unsubscribeOnLogOut(){
    //remember to unsubscribe from the snapshotChanges
    this.snapshotChangesSubscription.unsubscribe();
  }

}
