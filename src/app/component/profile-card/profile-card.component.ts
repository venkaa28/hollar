import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserProfile} from '../../../models/userProfile.model';
import {Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/storage";
import { ModalController } from '@ionic/angular';
import {ModalPage} from "../../modals/modal/modal.page";

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit, OnChanges {

  profileUrl: Observable<string | null>;
  dataReturned: any;

  @Input() user: UserProfile;
  constructor(private storage: AngularFireStorage, public modalController: ModalController) {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
     if(this.user?.profilePicture !== ''){
       this.profileUrl = this.storage.ref(this.user?.profilePicture).getDownloadURL();
     }
    }
  }

  ngOnInit() {
  }

  onNavigate(url) {
    window.open(url, '_blank');
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        'docs': this.user?.documents
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
    });
    return await modal.present();
  }

}
