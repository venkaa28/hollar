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
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-customize-profile',
  templateUrl: './customize-profile.page.html',
  styleUrls: ['./customize-profile.page.scss'],
})
export class CustomizeProfilePage implements OnInit {

  currentUser: UserProfile;
  currentUserObs: Observable<any>;
  customizeProfileForm: FormGroup;

  constructor(
    private authService: AuthService,
    private store: Store<any>,
    private route: Router,
    private fb: FormBuilder,
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
    const tempGithub = (this.currentUser.linkedAccounts.github.length > 0) ?
      this.currentUser.linkedAccounts.github.split('https://github.com/')[1] :
      this.currentUser.linkedAccounts.github;
    const tempInstagram = (this.currentUser.linkedAccounts.instagram.length > 0) ?
      this.currentUser.linkedAccounts.instagram.split('https://instagram.com/')[1] :
      this.currentUser.linkedAccounts.instagram;
    const tempTwitter = (this.currentUser.linkedAccounts.twitter.length > 0) ?
      this.currentUser.linkedAccounts.twitter.split('https://twitter.com/')[1] :
      this.currentUser.linkedAccounts.twitter;
    this.customizeProfileForm = this.fb.group({
      job: [this.currentUser.job, []],
      company:[this.currentUser.company, []],
      industry: [this.currentUser.industry, []],
      documents: [this.currentUser.documents, []],
      phonenumber:[this.currentUser.phoneNumber, []],
      github: [tempGithub, []],
      linkedin: [this.currentUser.linkedAccounts.linkedin, []],
      instagram: [tempInstagram, []],
      twitter: [tempTwitter, []],
      personalwebsite: [this.currentUser.linkedAccounts.personalWebsite, []],
      additionalURLs: [this.currentUser.linkedAccounts.additionalURLs, []]
      //insert custom matching validator above]]
    });
  }


  async saveUpdatedUserPage(){
    const loading = await this.loadingController.create();
    await loading.present();
      const updatedLinkedAccounts: LinkedAccountsModel = {
        twitter: 'https://twitter.com/' + this.customizeProfileForm.get('twitter').value,
        github: 'https://github.com/' + this.customizeProfileForm.get('github').value,
        linkedin: this.customizeProfileForm.get('linkedin').value,
        instagram: 'https://instagram.com/' + this.customizeProfileForm.get('instagram').value,
        personalWebsite: this.customizeProfileForm.get('personalwebsite').value,
        additionalURLs: this.customizeProfileForm.get('additionalURLs').value,
      };
      const updateUserDict: UserProfile = {
        uid: this.currentUser.uid,
        email: this.currentUser.email,
        firstName: this.currentUser.firstName,
        lastName: this.currentUser.lastName,
        phoneNumber: this.currentUser.phoneNumber,
        connections: this.currentUser.connections,
        inviteRequests: this.currentUser.inviteRequests,
        company: this.customizeProfileForm.get('company').value,
        linkedAccounts: updatedLinkedAccounts,
        job: this.customizeProfileForm.get('job').value,
        industry: this.customizeProfileForm.get('industry').value,
        documents: [],
        profilePicture: this.currentUser.profilePicture
    };
    this.firebaseService.updateUser(updateUserDict, this.currentUser.uid)
      .then(async res => {
        await loading.dismiss();
        await this.route.navigateByUrl('/tabs/tab3', {replaceUrl: true});
      }, async err => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Updating Customized Profile Fell',
          message: err.message,
          buttons: ['OK']
        });
        await alert.present();
      });

  }
  cancel() {
    this.route.navigate(['tabs/tab3']);
  }
}
