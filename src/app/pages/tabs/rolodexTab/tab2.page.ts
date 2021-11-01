import {Component, OnInit} from '@angular/core';
import {FirebaseService} from "../../../services/firebase.service";
import {AuthService} from "../../../services/auth.service";
import {UserProfile} from "../../../../models/userProfile.model";
import {user} from "rxfire/auth";
import {Observable} from "rxjs";
import {mergeMap, switchMap} from "rxjs/operators";
import {LinkedAccountsModel} from "../../../../models/linkedAccounts.model";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  connectionsObservable: Observable<UserProfile[]> = null;
  connectionList: UserProfile[];
  currentUser: UserProfile;

  constructor(private firebaseService: FirebaseService, private authService: AuthService) {
    //this.currentUser = this.authService.getUser();
  }

  async ngOnInit() {
    //fully working code
    this.authService.getUserObservable().pipe(
      mergeMap( async userData => {
        console.log(userData);
        this.currentUser = userData['user'];
        const connects = userData['user'].connections;
        console.log(connects);
        console.log(userData['user'].connections);
        return this.firebaseService.getConnections(connects);
      })
    ).subscribe( (connections) => {
      this.connectionsObservable = connections;
      connections.subscribe( (data) => {
          this.connectionList = data;
          console.log(this.connectionList);
      }
      );
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
