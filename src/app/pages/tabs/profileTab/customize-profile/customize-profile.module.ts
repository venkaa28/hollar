import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomizeProfilePageRoutingModule } from './customize-profile-routing.module';

import { CustomizeProfilePage } from './customize-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomizeProfilePageRoutingModule
  ],
  declarations: [CustomizeProfilePage]
})
export class CustomizeProfilePageModule {}
