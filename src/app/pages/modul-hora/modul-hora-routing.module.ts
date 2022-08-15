import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModulHoraPage } from './modul-hora.page';

const routes: Routes = [
  {
    path: '',
    component: ModulHoraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulHoraPageRoutingModule {}
