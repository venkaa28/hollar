import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from "@angular/fire/firestore";
import {UserProfile} from "../../models/userProfile.model";
import {Observable} from "rxjs";
import {finalize, map, switchMap, take, tap} from "rxjs/operators";
import * as UserActions from "../stores/userStore/userActions";
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public connectionsObservable: Observable<UserProfile[]>;
  public userObservable: Observable<UserProfile>;

  constructor(private afAuth: AngularFireAuth, private afDB: AngularFireDatabase,
              private afStore: AngularFirestore, private storage: AngularFireStorage,
              private router: Router) {

  }

  user$(): Observable<any> {
    return this.afStore.doc<UserProfile>(`users/${firebase.auth().currentUser.uid}`).valueChanges().pipe(
      tap(r => {
        console.groupCollapsed(`Firestore Streaming users/${firebase.auth().currentUser.uid}`);
        //console.log(r['user']);
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

  writeNewUser(user: UserProfile){
    // AFStore Code
    return new Promise<any>((resolve, reject) => {
      const currentUser = firebase.auth().currentUser;
      user.linkedAccounts = {...user.linkedAccounts};
      this.afStore.collection('users').doc(currentUser.uid).set({...user})
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  //wrote an update user method, have not tested yet, not sure if it works yet
  updateUser(user: Partial<UserProfile>, uid: string){
    // AFStore Code
    return new Promise<any>((resolve, reject) => {
      if (user.linkedAccounts){
        user.linkedAccounts = {...user.linkedAccounts};
      }
      this.afStore.collection('users').doc(uid).update({...user})
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  async uploadPicture(filePath, fileDataUrl) {
    const task = this.storage.ref(filePath).putString(fileDataUrl, 'data_url');
    task.snapshotChanges().pipe(
      finalize(() => this.updateUser({profilePicture: filePath}, firebase.auth().currentUser.uid))
    ).subscribe();
  }

  async uploadDocument(filePath, fileURI, currentDocs, filename) {
    const task = this.storage.ref(filePath).putString(fileURI, 'base64', {contentType:'application/pdf'});
    task.snapshotChanges().pipe(
      finalize(() => {
        const copyDocs: string[] = [...currentDocs];
        (copyDocs as string[]).push(filename);
        this.updateUser({documents: copyDocs}, firebase.auth().currentUser.uid);
      })
    ).subscribe();
  }

  createConnection(current_uid, new_uid: string, current_connects){
      this.afStore.collection<UserProfile>('users').doc(new_uid).valueChanges().pipe(take(1))
        .subscribe( (data) => {
          if (data){
            const new_user_data = data;
            console.log(new_user_data);
            console.log(current_connects);
            const copy_of_current_connects: string[] = [...current_connects];
            copy_of_current_connects.push(new_uid);
            console.log(copy_of_current_connects);
            (new_user_data.connections as string[]).push(current_uid);
            console.log(new_user_data);
            this.afStore.collection<UserProfile>('users').doc<UserProfile>(current_uid)
              .update( {'connections': copy_of_current_connects as []})
              .then( r => {
                console.log('added new user to current users connections list');
                this.afStore.collection<UserProfile>('users').doc<UserProfile>(new_uid)
                  .update({'connections': new_user_data.connections})
                  .then(r2 => {
                    console.log('added current user to new users connections list');
                    this.router.navigate(['/tabs/tab2/view-connection', {index: new_uid}], );
                  });
            });

            //alert('Successfully connected with new user');
          }
      });
  }
}
