import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LlegadaPageRoutingModule } from './llegada-routing.module';

import { LlegadaPage } from './llegada.page';
import { ModalInfoPage } from '../modal-info/modal-info.page';
import { ModalInfoPageModule } from '../modal-info/modal-info.module';

@NgModule({
  entryComponents:[
      ModalInfoPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LlegadaPageRoutingModule,
    ModalInfoPageModule
  ],
  declarations: [LlegadaPage]
})
export class LlegadaPageModule {}
