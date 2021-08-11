import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ParticipantesService } from 'src/app/services/participante/participantes.service';
import { ModalInfoPage } from '../modal-info/modal-info.page';

@Component({
  selector: 'app-llegada',
  templateUrl: './llegada.page.html',
  styleUrls: ['./llegada.page.scss'],
})
export class LlegadaPage implements OnInit {

  participantes:any;
  

  constructor( private participanteService: ParticipantesService, 
                private modalCtrl:ModalController) { }

  ngOnInit() {
    this.participantes=this.participanteService.getParticipantes();
  }

  async abrirModal(participante:any){
      const modal = await this.modalCtrl.create({
        component: ModalInfoPage,
        componentProps:{
          id:participante.id
        }
      })
      await modal.present();
  }

  


}
