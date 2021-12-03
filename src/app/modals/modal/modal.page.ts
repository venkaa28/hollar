import { Component, OnInit } from '@angular/core';
import {
  LoadingController,
  ModalController,
  NavParams
} from '@ionic/angular';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import {AngularFireStorage} from '@angular/fire/storage';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'modal-page',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {


  docs: [];
  uid: string;

  docURL: string;

  blob;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private previewAnyFile: PreviewAnyFile,
    private storage: AngularFireStorage,
    private loadingController: LoadingController,
    private http: HTTP
  ) { }

  ngOnInit() {
    console.table(this.navParams);
    this.docs = this.navParams.data.docs;
    this.uid = this.navParams.data.uid;
    console.log(this.docs);
  }

  async downloadAndPreviewFile(doc) {
    const docPath = 'documents/' + this.uid + '/' + doc;
    console.log(docPath);

    this.docURL = await this.storage.ref(docPath).getDownloadURL().toPromise();
    console.log('original url: ', this.docURL);

    window.open(this.docURL, '_blank');

    // const loading = await this.loadingController.create({
    //   message: 'Loading document...',
    // });
    // loading.present().then(() => {
    //   this.previewAnyFile.preview(this.docURL).then((res) => {
    //     loading.dismiss();
    //   }).catch((err) => {
    //     loading.dismiss();
    //     console.log('Error previewing the document try later', err);
    //   });
    // });

  }

  async closeModal() {
    const onClosedData = 'Wrapped Up!';
    await this.modalController.dismiss(onClosedData);
  }

}
