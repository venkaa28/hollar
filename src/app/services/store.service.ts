import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UserProfile} from "../../models/userProfile.model";
import firebase from "firebase";
import User = firebase.User;
import {Action, Store} from '@ngrx/store'

@Injectable({
  providedIn: 'root'
})
export class StoreService implements Action{


  constructor() {

  }


}
