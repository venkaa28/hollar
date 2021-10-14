import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {

  }

  //change to accept a user model
  doRegister(email, password, userDict){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then(
          res => resolve(res),
          // create new user profile here and push to database
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

}
