import { Component, OnInit } from '@angular/core';
import {UserProfile} from "../../../../../models/userProfile.model";
import {Observable} from "rxjs";
import * as UserActions from "../../../../stores/userStore/userActions";
import {selectUserObs} from "../../../../stores/userStore/userReducer";
import {AuthService} from "../../../../services/auth.service";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customize-profile',
  templateUrl: './customize-profile.page.html',
  styleUrls: ['./customize-profile.page.scss'],
})
export class CustomizeProfilePage implements OnInit {

  currentUser: UserProfile;
  currentUserObs: Observable<any>;

  constructor(
    private authService: AuthService,
    private store: Store<any>,
    private route: Router
  ) { }

  ngOnInit() {
    this.store.dispatch(new UserActions.FetchUser());
    this.currentUserObs = this.store.select(selectUserObs);
    this.currentUserObs.subscribe( (value: UserProfile) => {
      this.currentUser = value;
    });
  }

}
