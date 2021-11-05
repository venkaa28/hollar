import { Component } from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { Platform } from '@ionic/angular';
// might need to downgrade to import { NFC, NDef } from '@ionic-native/nfc'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private nfc: NFC, private ndef: Ndef, public platform: Platform) {}

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
      this.nfc.scanNdef().then(
        tag => console.log(JSON.stringify(tag)),
        error => console.log(error)
      );

    }

  }

  onWriteClick(nfc) {
    this.nfc.addNdefListener(() => {
      console.log('successfully attached ndef listener');
    }, (err) => {
      console.log('error attaching ndef listener', err);
    }).subscribe((event) => {
      // writing to tag using android device
      if (this.platform.is('android')) {
        // const message = [];
        // const tnf = this.ndef.TNF_WELL_KNOWN;
        // const recordType = 'android.com:pkg';
        // const payload = 'com.jwsoft.nfcactionlauncher'; // change to our Hollar AAR (android application record)
        // const record = this.ndef.record(tnf, recordType, [], payload);
        // message.push(record);
        // this.nfc.write(message).then(r => console.log(r));
      } else if (this.platform.is('ios')) {
        // writing to tag using ios device
        // same code as android because nfc.write automatically starts a new scanning session and writes to scanned tag
        const message = [this.ndef.textRecord('hello ryan brumm')];
        /*const tnf = this.ndef.TNF_EXTERNAL_TYPE;
        const recordType = 'android.com:pkg';
        const payload = 'com.jwsoft.nfcactionlauncher'; // change to our Hollar AAR (android application record)
        const record = this.ndef.record(tnf, recordType, [], payload);
        message.push(record);*/
        this.nfc.write(message).then(r => console.log(r));

      }


      // this.nfc.write(message);
    }, (err) => console.log(err));
  }

  // this.nfc.addNdefListener(onWriteClick);

}
