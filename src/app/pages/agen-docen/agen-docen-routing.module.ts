import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgenDocenPage } from './agen-docen.page';

const routes: Routes = [
  {
    path: '',
    component: AgenDocenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgenDocenPageRoutingModule {}
