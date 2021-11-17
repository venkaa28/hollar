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
import {ViewChild} from "@angular/core";
import {IonSearchbar} from "@ionic/angular";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  connectionsObservable: Observable<any[]>;
  connectionList: UserProfile[];
  connectionListCopy: UserProfile[];
  currentUser: UserProfile;
  currentUserObs: Observable<any>;

  @ViewChild('userSearchBar') searchbar: IonSearchbar;

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
          this.connectionListCopy = value;
          if (this.connectionList.length > 1) {
            this.connectionList.sort((a,b) => a.lastName.localeCompare(b.lastName));
            this.connectionListCopy = this.connectionList;
          }
        });
      }
    });
    // this.searchText = '';
  }
  searchRolodex(searchText) {
    this.connectionListCopy = this.connectionList.filter(s =>
      s.firstName.toLowerCase().includes(searchText.target.value.toLowerCase()) ||
      s.lastName.toLowerCase().includes(searchText.target.value.toLowerCase()) ||
      s.company.toLowerCase().includes(searchText.target.value.toLowerCase()) ||
      s.email.toLowerCase().includes(searchText.target.value.toLowerCase()) ||
      s.phoneNumber.toLowerCase().includes(searchText.target.value.toLowerCase()) ||
      s.industry.toLowerCase().includes(searchText.target.value.toLowerCase()) ||
      s.job.toLowerCase().includes(searchText.target.value.toLowerCase()));
    this.connectionListCopy.sort((a,b) => a.lastName.localeCompare(b.lastName));
  }

  onCancel(event) {
    event.target.value = '';
    this.connectionListCopy = this.connectionList;
  }
}
