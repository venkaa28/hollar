import { Component } from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { Platform } from '@ionic/angular';
// might need to downgrade to import { NFC, NDef } from '@ionic-native/nfc/ngx'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private nfc: NFC, private ndef: Ndef, public platform: Platform) {
    nfc.showSettings().then(r => console.log(r));
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
      console.log("this is an ios device");
      this.nfc.scanTag().then(
        tag => {
          console.log("reader session started");
          console.log(JSON.stringify(tag));
          if (tag.id) {
            const message = tag.ndefMessage;
            console.log(message);
            alert(this.nfc.bytesToString(message[0].payload).substring(3));
            console.log(this.nfc.bytesToString(message[0].payload).substring(3));
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
      const message = [this.ndef.textRecord('insert UID here')];
      console.log(message);
      this.nfc.write(message).then(r => console.log(r));
    }, (err) => {
      console.log('error attaching ndef listener', err);
    });
  }
}
