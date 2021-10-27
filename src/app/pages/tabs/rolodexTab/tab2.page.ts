import {Component, OnInit} from '@angular/core';
import {FirebaseService} from "../../../services/firebase.service";
import {AuthService} from "../../../services/auth.service";
import {UserProfile} from "../../../../models/userProfile.model";
import {user} from "rxfire/auth";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  //connections: Array<UserProfile>;

  constructor(private firebaseService: FirebaseService, private authService: AuthService) {}

  async ngOnInit() {
    this.authService.getUser().subscribe(async (userData) => {
      console.log(userData);
      this.firebaseService.getConnections(userData.connections).then((data) => {
        //return a subscription or observable from getConnections and assign it to connections
        //this.connections = data;
      });
    });
    //console.log(this.authService.getUser().subscribe((user) => user.connections));
    //
    //console.log(this.connections);
  }

}
