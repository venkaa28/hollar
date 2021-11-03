import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as UserActions from "../../stores/userStore/userActions";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.dispatch(new UserActions.FetchUser());
  }

}
