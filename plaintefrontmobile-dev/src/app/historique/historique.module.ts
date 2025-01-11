import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoriquePageRoutingModule } from './historique-routing.module';

import { HistoriquePage } from './historique.page';
import {CustomDatePipe} from '../shared/pipes/custom.datepipe'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoriquePageRoutingModule
  ],
  declarations: [HistoriquePage, CustomDatePipe]
})
export class HistoriquePageModule {}
