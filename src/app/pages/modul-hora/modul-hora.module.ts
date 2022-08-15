import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModulHoraPageRoutingModule } from './modul-hora-routing.module';

import { ModulHoraPage } from './modul-hora.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModulHoraPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ModulHoraPage]
})
export class ModulHoraPageModule {}
