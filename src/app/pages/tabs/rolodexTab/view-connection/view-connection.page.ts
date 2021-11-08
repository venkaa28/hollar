import {Component, Input, OnInit} from '@angular/core';
import {UserProfile} from "../../../../../models/userProfile.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FirebaseService} from "../../../../services/firebase.service";
import {AuthService} from "../../../../services/auth.service";
import {Store} from "@ngrx/store";
import * as UserActions from "../../../../stores/userStore/userActions";
import {selectUserObs} from "../../../../stores/userStore/userReducer";
import * as ConnectionActions from "../../../../stores/connectionStore/connectionsActions";
import {selectConnectionsObs} from "../../../../stores/connectionStore/connectionsReducer";
import {Observable} from "rxjs";

@Component({
  selector: 'app-view-connection',
  templateUrl: './view-connection.page.html',
  styleUrls: ['./view-connection.page.scss'],
})
export class ViewConnectionPage implements OnInit {

  connectionsObservable: Observable<any[]>;
  connectionList: UserProfile[];
  currentUser: UserProfile;
  currentUserObs: Observable<any>;

  connectionToDisplay: UserProfile;

  user: UserProfile;
  constructor(private route: ActivatedRoute, private router: Router,
              private firebaseService: FirebaseService, private authService: AuthService,
              private store: Store<any>) { }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('index'));
    this.store.dispatch(new UserActions.FetchUser());
    this.currentUserObs = this.store.select(selectUserObs);
    this.currentUserObs.subscribe( (value: UserProfile) => {
      this.currentUser = value;
      if(this.currentUser && this.currentUser.connections.length >0 ) {
        this.store.dispatch(new ConnectionActions.FetchConnections(this.currentUser.connections));
        this.connectionsObservable = this.store.select(selectConnectionsObs);
        this.connectionsObservable.subscribe((value) => {
          this.connectionList = value;
          this.connectionToDisplay = this.connectionList[this.route.snapshot.paramMap.get('index')];
        });
      }
    });
  }

}
