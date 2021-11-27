import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Store} from '@ngrx/store';
import {UserProfile} from "../../../../models/userProfile.model";
import {Observable} from "rxjs";
import * as UserActions from "../../../stores/userStore/userActions";
import {selectUserObs} from "../../../stores/userStore/userReducer";
import {Router} from "@angular/router";
import {Camera, CameraOptions, CameraPermissionType, CameraResultType} from "@capacitor/camera";
import {FirebaseService} from "../../../services/firebase.service";


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  currentUser: UserProfile;
  currentUserObs: Observable<any>;
  imageURL: string;


  constructor(private authService: AuthService,
              private store: Store<any>,
              private route: Router,
              private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.store.dispatch(new UserActions.FetchUser());
    this.currentUserObs = this.store.select(selectUserObs);
    this.currentUserObs.subscribe( (value: UserProfile) => {
      this.currentUser = value;
    });

    //await this.firebaseService.uploadPicture(this.currentUser.uid+'_profilePic', this.imageURL);

  }

  logout(){
    this.authService.doLogout();
  }
  customizePage(){
    this.route.navigate(['tabs/tab3/customize-profile']);
  }

  async getProfilePicture(){
    const options: CameraOptions = {
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
    };

    Camera.getPhoto(options).then(async (imageData) => {
      this.imageURL = imageData.dataUrl;
      //console.log(this.imageURL);
      await this.firebaseService.uploadPicture('profile_pictures/' + this.currentUser.uid, this.imageURL);
    }, (err) => {
      window.alert("error getting photo");
    });

    // this.imageURL = image.dataUrl;
    // console.log('url: ' + this.imageURL);

  };

}
