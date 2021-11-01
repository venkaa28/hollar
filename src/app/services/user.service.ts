import { Injectable } from '@angular/core';
import {FirebaseService} from "./firebase.service";
import {StoreService} from "./store.service";
import {map, tap} from "rxjs/operators";
import {UserProfile} from "../../models/userProfile.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: FirebaseService,
              private store: StoreService) {
    this.firestore.user$().pipe(
      tap(user => {
        this.store.patchUser({
          user['user'],
        }, `user document subscription`);
      })
    ).subscribe();
  }

  get user$(): Observable<UserProfile> {
    return this.store.userState$.pipe(map(state => state.uid
      ? new UserProfile()
      : state))
  }
}
