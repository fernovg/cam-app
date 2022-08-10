import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgenDocenPageRoutingModule } from './agen-docen-routing.module';

import { AgenDocenPage } from './agen-docen.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgenDocenPageRoutingModule,
    ComponentsModule

  ],
  declarations: [AgenDocenPage]
})
export class AgenDocenPageModule {}
