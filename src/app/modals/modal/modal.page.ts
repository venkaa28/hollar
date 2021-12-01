import { Component, OnInit } from '@angular/core';
import {
  ModalController,
  NavParams
} from '@ionic/angular';

@Component({
  selector: 'modal-page',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {


  docs: [];

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    console.table(this.navParams);
    this.docs = this.navParams.data.docs;
    console.log(this.docs);
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

}
