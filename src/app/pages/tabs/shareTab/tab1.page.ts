import {Component, OnInit} from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { Platform } from '@ionic/angular';
import {UserProfile} from '../../../../models/userProfile.model';
import {Observable} from 'rxjs';
import * as UserActions from '../../../stores/userStore/userActions';
import {selectUserObs} from '../../../stores/userStore/userReducer';
import {Store} from '@ngrx/store';
import {FirebaseService} from "../../../services/firebase.service";
import {Router} from "@angular/router";

// might need to downgrade to import { NFC, NDef } from '@ionic-native/nfc/ngx'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  currentUser: UserProfile;
  currentUserObs: Observable<any>;

  constructor(private nfc: NFC, private ndef: Ndef, public platform: Platform, private store: Store<any>,
              private firebaseService: FirebaseService,
              private router: Router) {
    //nfc.showSettings().then(r => console.log(r));
  }

  ngOnInit(): void {
    this.store.dispatch(new UserActions.FetchUser());
    this.currentUserObs = this.store.select(selectUserObs);
    this.currentUserObs.subscribe( (value: UserProfile) => {
      this.currentUser = value;
    });

  }

  onReadClick() {
    // check if device is android or ios
    if (this.platform.is('android')) {

    } else if (this.platform.is('ios')) {
      // read tag using ios device
      console.log('this is an ios device');
      this.nfc.scanTag().then(
        tag => {
          console.log('reader session started');
          console.log(JSON.stringify(tag));
          if (tag.id) {
            const message = tag.ndefMessage;
            //console.log(message);
            const uid = this.nfc.bytesToString(message[0].payload).substring(3);
            console.log(this.nfc.bytesToString(message[0].payload).substring(3));
            //alert('uid: ' + uid);
            this.handleRead(uid);
          }
        },
        error => console.log(error)
      );
    }
  }

  onWriteClick() {
    this.nfc.addNdefListener(() => {
      console.log('successfully attached ndef listener');
      //only this works
      const message = [this.ndef.textRecord(this.currentUser.uid)];
      console.log(message);
      this.nfc.write(message).then(r => console.log(r));
    }, (err) => {
      console.log('error attaching ndef listener', err);
    }).subscribe((event) => {
      console.log('succesfully subscribed to ndef listener');
      // writing to tag using android device
      if (this.platform.is('android')) {

      } else if (this.platform.is('ios')) {

      }
      // this.nfc.write(message);
    }, (err) => console.log(err));
  }

  handleRead(uid){
    if(uid === this.currentUser.uid){
      alert('You cannot connect with yourself!');
    } else if ((this.currentUser.connections as string[]).includes(uid as string)){
      alert('You are already connected with this user');
      this.router.navigate(['/tabs/tab2/view-connection', {index: uid}], );
    }else {
      alert('attempting to connect you with user, if valid');
      this.firebaseService.createConnection(this.currentUser.uid as string, uid, this.currentUser.connections);
    }
  }
}
