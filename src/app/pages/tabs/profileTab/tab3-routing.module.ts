import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
  },
  {
    path: 'customize-profile',
    loadChildren: () => import('./customize-profile/customize-profile.module').then( m => m.CustomizeProfilePageModule)
  },  {
    path: 'document-view',
    loadChildren: () => import('./document-view/document-view.module').then( m => m.DocumentViewPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
