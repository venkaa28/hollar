import {Component, OnInit} from '@angular/core';
import {FirebaseService} from "../../../services/firebase.service";
import {AuthService} from "../../../services/auth.service";
import {UserProfile} from "../../../../models/userProfile.model";
import {user} from "rxfire/auth";
import {Observable} from "rxjs";
import {mergeMap, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  connectionsObservable: Observable<UserProfile[]> = null;
  connections: UserProfile[];
  currentUser: UserProfile;

  constructor(private firebaseService: FirebaseService, private authService: AuthService) {
    this.currentUser = this.authService.getUser();
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
          this.connections = data;
          console.log(this.connections);
      }
      );
    });
  }

}
