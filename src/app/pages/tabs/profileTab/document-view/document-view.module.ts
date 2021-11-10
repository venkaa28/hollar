import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentViewPageRoutingModule } from './document-view-routing.module';

import { DocumentViewPage } from './document-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentViewPageRoutingModule
  ],
  declarations: [DocumentViewPage]
})
export class DocumentViewPageModule {}
