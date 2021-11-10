import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomizeProfilePage } from './customize-profile.page';

const routes: Routes = [
  {
    path: '',
    component: CustomizeProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomizeProfilePageRoutingModule {}
