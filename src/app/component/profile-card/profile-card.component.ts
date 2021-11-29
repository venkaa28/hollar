import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserProfile} from '../../../models/userProfile.model';
import {Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/storage";

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit, OnChanges {

  profileUrl: Observable<string | null>;

  @Input() user: UserProfile;
  constructor(private storage: AngularFireStorage) {

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

}
