import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgenAlumPageRoutingModule } from './agen-alum-routing.module';

import { AgenAlumPage } from './agen-alum.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgenAlumPageRoutingModule,
    ComponentsModule

  ],
  declarations: [AgenAlumPage]
})
export class AgenAlumPageModule {}
