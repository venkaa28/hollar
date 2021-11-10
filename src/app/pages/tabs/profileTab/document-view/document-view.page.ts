import { Component, OnInit } from '@angular/core';
import {UserProfile} from '../../../../../models/userProfile.model';
import {Observable} from 'rxjs';
import * as UserActions from '../../../../stores/userStore/userActions';
import {selectUserObs} from '../../../../stores/userStore/userReducer';
import {AuthService} from '../../../../services/auth.service';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController} from '@ionic/angular';
import {LinkedAccountsModel} from '../../../../../models/linkedAccounts.model';
import {FirebaseService} from '../../../../services/firebase.service';
import {stringify} from 'querystring';

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.page.html',
  styleUrls: ['./document-view.page.scss'],
})
export class DocumentViewPage implements OnInit {

  currentUser: UserProfile;
  currentUserObs: Observable<any>;

  constructor(
    private authService: AuthService,
    private store: Store<any>,
    private route: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
    this.store.dispatch(new UserActions.FetchUser());
    this.currentUserObs = this.store.select(selectUserObs);
    this.currentUserObs.subscribe( (value: UserProfile) => {
      this.currentUser = value;
      console.log('Getting the user from the dispatch');
      console.log(this.currentUser);
    });
    console.log('Consoling the current user: ' + this.currentUser.firstName);
  }

  cancel() {
    this.route.navigate(['tabs/tab3']);
  }

}
