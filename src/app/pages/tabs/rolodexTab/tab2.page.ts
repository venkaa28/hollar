import {Component, OnInit} from '@angular/core';
import {FirebaseService} from "../../../services/firebase.service";
import {AuthService} from "../../../services/auth.service";
import {UserProfile} from "../../../../models/userProfile.model";
import {user} from "rxfire/auth";
import {Observable} from "rxjs";
import {mergeMap, switchMap, take} from "rxjs/operators";
import {LinkedAccountsModel} from "../../../../models/linkedAccounts.model";

import { Store } from '@ngrx/store';
import * as reducer from '../../../store/reducer';
import * as UserActions from '../../../store/actions';
import {UserState} from "../../../store/reducer";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  connectionsObservable: Observable<UserProfile[]> = null;
  connectionList: UserProfile[];
  currentUser: UserProfile;
  currentUserObs: Observable<UserProfile>;

  constructor(private firebaseService: FirebaseService, private authService: AuthService,
              private store: Store<reducer.UserState>) {
  }

  async ngOnInit() {
    this.store.dispatch(new UserActions.FetchUser());
    // setTimeout(()=>{
    //   console.log(this.currentUserObs);
    // }, 3000);

    this.currentUserObs = this.store.select(reducer.userStateSelector);
    console.log(this.currentUserObs);
    this.store.pipe(take(2)).subscribe( (data) => {
      console.log(data.user);
      console.log(JSON.stringify(data));
    });
    this.currentUserObs.subscribe((data) => {
      console.log(data);
    });
    // console.log(this.currentUserObs.subscribe( (data) => {
    //   console.log(data);
    // }));
    //console.log(this.store);


    //fully working code
    // (await this.authService.getUserObservable()).pipe(
    //   mergeMap( async userData => {
    //     console.log(userData);
    //     this.currentUser = userData['user'];
    //     console.log(this.currentUser);
    //     const connects = userData['user'].connections;
    //     //console.log(connects);
    //     //console.log(userData['user'].connections);
    //     return this.firebaseService.getConnections(connects);
    //   })
    // ).subscribe( (connections) => {
    //   this.connectionsObservable = connections;
    //   connections.subscribe( (data) => {
    //       this.connectionList = data;
    //       //console.log(this.connectionList);
    //   }
    //   );
    // });
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
