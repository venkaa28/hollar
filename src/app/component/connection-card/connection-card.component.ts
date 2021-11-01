import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs";
import {UserProfile} from "../../../models/userProfile.model";

@Component({
  selector: 'app-connection-card',
  templateUrl: './connection-card.component.html',
  styleUrls: ['./connection-card.component.scss'],
})
export class ConnectionCardComponent implements OnInit, OnChanges {
  @Input() name: string;
  @Input() email: string;
  @Input() phoneNumber: string;
  @Input() user: Observable<UserProfile>;
  userData: UserProfile;
  // @Input() company: string;
  // @Input() job: string;
  // Add more inputs

  constructor() { }

  ngOnInit() {
    // this.user.subscribe((data) => {
    //   this.userData =data;
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.firstName) {
    //   // deal with asynchronous Observable result
    //   this.name = changes.firstName.currentValue;
    // }
  }

}
