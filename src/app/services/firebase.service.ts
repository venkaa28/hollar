import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afAuth: AngularFireAuth, private afDB: AngularFireDatabase) { }

  writeNewUser(user){

    const userDict = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };

    return new Promise<any>((resolve, reject) => {
      const currentUser = firebase.auth().currentUser;
      this.afDB.database.ref('accounts').child(currentUser.uid).set(userDict)
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  getLoggedInUserProfile(){
    // const currentUser = firebase.auth().currentUser;
    //await firebase.database().ref('accounts/' + currentUser.uid).on('value', async (snapshot) => {
    //}
  }

}
