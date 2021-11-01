import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UserProfile} from "../../models/userProfile.model";
import firebase from "firebase";
import User = firebase.User;

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  userState$: Observable<UserProfile>;
  userState: UserProfile;
  previousUserState: UserProfile;

  connectionsState$: Observable<UserProfile[]>;
  connectionsState: UserProfile[];
  previousConnectionsState: UserProfile[];

  protected userBS: BehaviorSubject<UserProfile>;
  protected connectionsBS: BehaviorSubject<UserProfile[]>;

  constructor() {
    this.userBS = new BehaviorSubject<UserProfile>(new UserProfile());
    this.userState$ = this.userBS.asObservable();

    this.userState = new UserProfile();
    this.userState$.subscribe(s => {
      this.userState = s;
    });

    this.connectionsBS = new BehaviorSubject<UserProfile[]>([]);
    this.connectionsState$ = this.connectionsBS.asObservable();

    this.connectionsState = [];
    this.connectionsState$.subscribe(s => {
      this.connectionsState = s;
    });
  }

  patchUser(newValue: Partial<UserProfile>, event: string = 'Not specified') {
    this.previousUserState = this.userState;
    const newState = Object.assign({}, this.userState, newValue);
    console.groupCollapsed(`[user store] [patch] [event: ${event}]`);
    console.log('change', newValue);
    console.log('prev', this.previousUserState);
    console.log('next', newState);
    console.groupEnd();
    this.userBS.next(newState);
  }

  setUser(newValue: Partial<UserProfile>, event: string = 'Not specified') {
    this.previousUserState = this.userState;
    const newState = Object.assign({}, newValue) as UserProfile;
    console.groupCollapsed(`[user store] [set] [event: ${event}]`);
    console.log("change", newValue);
    console.log("prev", this.previousUserState);
    console.log("next", newState);
    console.groupEnd();
    this.userBS.next(newState);
  }

}
