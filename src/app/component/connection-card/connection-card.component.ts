import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs";
import {UserProfile} from '../../../models/userProfile.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-connection-card',
  templateUrl: './connection-card.component.html',
  styleUrls: ['./connection-card.component.scss'],
})
export class ConnectionCardComponent implements OnInit {

  @Input() user: UserProfile;
  @Input() index: number;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  viewConnection() {
    this.router.navigate(['/tabs/tab2/view-connection', {index: this.index}], );
  }

}
