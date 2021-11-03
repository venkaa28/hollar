import { Component } from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
// might need to downgrade to import { NFC, NDef } from '@ionic-native/nfc'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private nfc: NFC, private ndef: Ndef) {}

  onReadClick(nfc) {
    this.nfc.addNdefListener(() => {
      console.log('successfully attached ndef listener');
    }, (err) => {
      console.log('error attaching ndef listener', err);
    }).subscribe((event) => {
      console.log('received ndef message. data in tag is: ', event.tag);
      console.log('payload content is: ', this.nfc.bytesToString(event.tag.ndefMessage[0].payload));
      console.log('decoded tag id: ', this.nfc.bytesToHexString(event.tag.id));
      // const message = [this.ndef.textRecord('hello, world')];
      // this.nfc.share(message);
      // console.log(JSON.stringify(tag));
    }, (err) => console.log(err));


  }

  onWriteClick(nfc) {
    console.log(nfc.tag);

    const message = [ this.ndef.textRecord('hello world') ];

    nfc.write(
      message,
      success => console.log('wrote data to tag'),
      error => console.log(error)
    );
  }

  // this.nfc.addNdefListener(onWriteClick);

}
