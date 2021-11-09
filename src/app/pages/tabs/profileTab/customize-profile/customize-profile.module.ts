import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomizeProfilePageRoutingModule } from './customize-profile-routing.module';

import { CustomizeProfilePage } from './customize-profile.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CustomizeProfilePageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [CustomizeProfilePage]
})
export class CustomizeProfilePageModule {}
