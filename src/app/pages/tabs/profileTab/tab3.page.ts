import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Store} from '@ngrx/store';
import {UserProfile} from "../../../../models/userProfile.model";
import {Observable} from "rxjs";
import * as UserActions from "../../../stores/userStore/userActions";
import {selectUserObs} from "../../../stores/userStore/userReducer";
import * as ConnectionActions from "../../../stores/connectionStore/connectionsActions";
import {selectConnectionsObs} from "../../../stores/connectionStore/connectionsReducer";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  currentUser: UserProfile;
  currentUserObs: Observable<any>;

  constructor(private authService: AuthService,
              private store: Store<any>,
              private route: Router) {}

  ngOnInit(): void {
    this.store.dispatch(new UserActions.FetchUser());
    this.currentUserObs = this.store.select(selectUserObs);
    this.currentUserObs.subscribe( (value: UserProfile) => {
      this.currentUser = value;
    });
  }

  logout(){
    this.authService.doLogout();
  }
  customizePage(){
    this.route.navigate(['tabs/tab3/customize-profile']);
  }
}
