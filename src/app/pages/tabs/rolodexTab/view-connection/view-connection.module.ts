import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewConnectionPageRoutingModule } from './view-connection-routing.module';

import { ViewConnectionPage } from './view-connection.page';
import {Tab3PageModule} from "../../profileTab/tab3.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ViewConnectionPageRoutingModule,
        Tab3PageModule
    ],
  declarations: [ViewConnectionPage]
})
export class ViewConnectionPageModule {}
