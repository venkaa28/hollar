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
              private store: Store<any>) {
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



  connections: Array<UserProfile> = [
     {
       firstName: 'Nolan',
       lastName: 'Smith',
       uid: 'test1',
       email: 'test@test.com',
       phoneNumber: '1234567999',
       connections: [],
       inviteRequests: [],
       linkedAccounts: new LinkedAccountsModel(),
       company: '',
       industry: '',
       profilePicture: '',
       job: '',
       documents: [],
    },
    {
      firstName: 'Kush',
      lastName: 'Dani',
      uid: 'test1',
      email: 'test@test.com',
      phoneNumber: '1234567890',
      connections: [],
      inviteRequests: [],
      linkedAccounts: new LinkedAccountsModel(),
      company: '',
      industry: '',
      profilePicture: '',
      job: '',
      documents: [],
    },
    {
      firstName: 'Nathan',
      lastName: 'Zyck',
      uid: 'test1',
      email: 'zyck@wisc.edu',
      phoneNumber: '1234567890',
      connections: [],
      inviteRequests: [],
      linkedAccounts: new LinkedAccountsModel(),
      company: '',
      industry: '',
      profilePicture: '',
      job: '',
      documents: [],
    },
    {
      firstName: 'Ryan',
      lastName: 'Brum',
      uid: 'test1',
      email: 'ryan@wisc.edu',
      phoneNumber: '1234567890',
      connections: [],
      inviteRequests: [],
      linkedAccounts: new LinkedAccountsModel(),
      company: '',
      industry: '',
      profilePicture: '',
      job: '',
      documents: [],
    },
    {
      firstName: 'Ani',
      lastName: 'Venky',
      uid: 'test1',
      email: 'Ani@wisc.edu',
      phoneNumber: '1234567890',
      connections: [],
      inviteRequests: [],
      linkedAccounts: new LinkedAccountsModel(),
      company: '',
      industry: '',
      profilePicture: '',
      job: '',
      documents: [],
    },
    {
      firstName: 'Leonardo',
      lastName: 'Dicaprio',
      uid: 'test1',
      email: 'LeoD@hollywood.com',
      phoneNumber: '1234567890',
      connections: [],
      inviteRequests: [],
      linkedAccounts: new LinkedAccountsModel(),
      company: '',
      industry: '',
      profilePicture: '',
      job: '',
      documents: [],
    },
    {
      firstName: 'Lebron',
      lastName: 'James',
      uid: 'test1',
      email: 'Lebron@jordan.com',
      phoneNumber: '1234567890',
      connections: [],
      inviteRequests: [],
      linkedAccounts: new LinkedAccountsModel(),
      company: '',
      industry: '',
      profilePicture: '',
      job: '',
      documents: [],
    },
    {
      firstName: 'Kirill',
      lastName: 'Kaprizov',
      uid: 'test1',
      email: 'kirillthethrill@test.com',
      phoneNumber: '1234567890',
      connections: [],
      inviteRequests: [],
      linkedAccounts: new LinkedAccountsModel(),
      company: '',
      industry: '',
      profilePicture: '',
      job: '',
      documents: [],
    }
  ];

}
