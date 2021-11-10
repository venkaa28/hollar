import {Component, OnInit} from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { Platform } from '@ionic/angular';
import {UserProfile} from '../../../../models/userProfile.model';
import {Observable} from 'rxjs';
import * as UserActions from '../../../stores/userStore/userActions';
import {selectUserObs} from '../../../stores/userStore/userReducer';
import {Store} from '@ngrx/store';
// might need to downgrade to import { NFC, NDef } from '@ionic-native/nfc/ngx'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  currentUser: UserProfile;
  currentUserObs: Observable<any>;

  constructor(private nfc: NFC, private ndef: Ndef, public platform: Platform, private store: Store<any>) {
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
      // read tag using android device
      // this.nfc.addNdefListener(() => {
      //   console.log('successfully attached ndef listener');
      // }, (err) => {
      //   console.log('error attaching ndef listener', err);
      // }).subscribe((event) => {
      //   console.log('received ndef message. data in tag is: ', event.tag);
      //   console.log('payload content is: ', this.nfc.bytesToString(event.tag.ndefMessage[0].payload));
      //   console.log('decoded tag id: ', this.nfc.bytesToHexString(event.tag.id));
      //   // const message = [this.ndef.textRecord('hello, world')];
      //   // this.nfc.share(message);
      //   // console.log(JSON.stringify(tag));
      // }, (err) => console.log(err));
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
            alert(uid);
            console.log(this.nfc.bytesToString(message[0].payload).substring(3));
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
    });
  }

  handleRead(uid){
    if(uid === this.currentUser.uid){
      alert('You cannot connect with yourself!');
    } else if (uid in this.currentUser.connections){
      alert('You are already connected with this user');
    }else {
      alert('going to connect you with new user if this is a valid uid ');
      //call create connection here
    }
  }
}
