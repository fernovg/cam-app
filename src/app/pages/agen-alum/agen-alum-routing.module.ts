import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgenAlumPage } from './agen-alum.page';

const routes: Routes = [
  {
    path: '',
    component: AgenAlumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgenAlumPageRoutingModule {}
