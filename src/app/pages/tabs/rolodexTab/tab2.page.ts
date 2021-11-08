import {Component, OnInit} from '@angular/core';
import {FirebaseService} from "../../../services/firebase.service";
import {AuthService} from "../../../services/auth.service";
import {UserProfile} from "../../../../models/userProfile.model";
import {user} from "rxfire/auth";
import {Observable} from "rxjs";
import {mergeMap, switchMap, take} from "rxjs/operators";
import {LinkedAccountsModel} from "../../../../models/linkedAccounts.model";

import {select, State, Store} from '@ngrx/store';
import * as reducer from '../../../stores/userStore/userReducer';
import * as UserActions from '../../../stores/userStore/userActions';
import * as ConnectionActions from '../../../stores/connectionStore/connectionsActions';
import {selectConnectionsObs} from "../../../stores/connectionStore/connectionsReducer";
import {selectUserObs, selectUserState, UserState} from "../../../stores/userStore/userReducer";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  connectionsObservable: Observable<any[]>;
  connectionList: UserProfile[];
  currentUser: UserProfile;
  currentUserObs: Observable<any>;

  constructor(private firebaseService: FirebaseService, private authService: AuthService,
              private store: Store<any>, private router: Router) {
  }

  async ngOnInit() {
    this.store.dispatch(new UserActions.FetchUser());
    this.currentUserObs = this.store.select(selectUserObs);
    this.currentUserObs.subscribe( (value: UserProfile) => {
      this.currentUser = value;
      if(this.currentUser && this.currentUser.connections.length >0 ) {
        this.store.dispatch(new ConnectionActions.FetchConnections(this.currentUser.connections));
        this.connectionsObservable = this.store.select(selectConnectionsObs);
        this.connectionsObservable.subscribe((value) => {
          this.connectionList = value;
        });
      }
    });
  }

}
