import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import { ModalPageRoutingModule } from './modal-routing.module';

import { ModalPage } from './modal.page';
import {PreviewAnyFile} from "@ionic-native/preview-any-file/ngx";
import {HTTP} from "@ionic-native/http/ngx";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPageRoutingModule
  ],
  declarations: [ModalPage],
  providers: [
    PreviewAnyFile,
    HTTP
  ],
})
export class ModalPageModule {}
