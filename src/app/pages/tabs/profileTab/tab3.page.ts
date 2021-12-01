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
import {IOSFilePicker} from "@ionic-native/file-picker/ngx";
import { Platform } from '@ionic/angular';
import {AlertController} from "@ionic/angular";
import {ToastController} from "@ionic/angular";
import { File } from '@ionic-native/file/ngx';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

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
              private firebaseService: FirebaseService,
              private filePicker: IOSFilePicker,
              public platform: Platform,
              private alertController: AlertController,
              private toastController: ToastController,
              private file: File) {}

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
      window.alert('error getting photo');
    });

  };

  async getDocument(){

    if(this.platform.is('ios')) {
      this.filePicker.pickFile()
        .then(async uri => {
          const alert = await this.alertController.create({
            header: 'Confirm!',
            message: 'Enter Name for file',
            inputs: [
              {
                name: 'file_name',
                type: 'text',
                placeholder: 'Enter File Name'
              }
              ],
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  console.log('Confirm Cancel: blah');
                }
              }, {
                text: 'Okay',
                handler: async (data) => {
                  if (data['file_name'].length > 0) {
                    const correctPath = uri.substr(0, uri.lastIndexOf('/') + 1);
                    const currentName = uri.substring(uri.lastIndexOf('/') + 1);
                    console.log('correctPath:', 'file:///' + correctPath);
                    console.log('currentName:', currentName);
                    console.log('file:///' + uri);
                    Filesystem.readFile(
                      {path: 'file:///' + uri}
                    ).then( async (result) => {
                      await this.firebaseService.uploadDocument(
                        'documents/' + this.currentUser.uid + '/' + data['file_name'], result['data'], this.currentUser.documents);
                    })

                    // this.file.readAsDataURL('file:///' + correctPath, currentName)
                    //   .then(async dataURL => {
                    //     console.log("printing something");
                    //       console.log(dataURL);
                    //       await this.firebaseService.uploadDocument(
                    //         'documents/' + this.currentUser.uid + '/' + data['file_name'], dataURL);
                    //     }
                    //   )

                    // this.file.resolveDirectoryUrl(uri).then( (resolvedURI) => {
                    //   this.file.getFile(resolvedURI, currentName, { create: false }).then(async fileData => {
                    //       console.log(resolvedURI);
                    //       console.log(fileData);
                    //       await this.firebaseService.uploadDocument(
                    //         'documents/' + this.currentUser.uid + '/' + data['file_name'], fileData);
                    //     });
                    //   })
                      .catch(e => {
                        //window.alert("File Names with no spaces please, try again");
                        console.log('error read:', e);
                      });
                    return true;
                  } else {
                    const toast = await this.toastController.create({
                      header: 'Invalid File Name',
                      message: 'Try again',
                      color: 'warning',
                      duration: 2000
                    });
                    await toast.present();
                    return false;
                  }
                }
              }
            ]
          });

          await alert.present();
        })
        .catch(err => console.log("Error", err));
    }
  }
}
