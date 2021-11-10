import {Component, Input, OnInit} from '@angular/core';
import {UserProfile} from '../../../models/userProfile.model';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit {

  @Input() user: UserProfile;
  constructor() { }

  ngOnInit() {}

  onNavigate(url) {
    window.open(url, '_blank');
  }

}
