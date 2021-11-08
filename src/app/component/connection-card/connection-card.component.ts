import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs";
import {UserProfile} from '../../../models/userProfile.model';

@Component({
  selector: 'app-connection-card',
  templateUrl: './connection-card.component.html',
  styleUrls: ['./connection-card.component.scss'],
})
export class ConnectionCardComponent implements OnInit {

  @Input() user: UserProfile;
  constructor() { }

  ngOnInit() {
  }

}
