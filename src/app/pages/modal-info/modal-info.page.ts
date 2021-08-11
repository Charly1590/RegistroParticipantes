import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Participante } from 'src/app/domain/participante';
import { ParticipantesService } from 'src/app/services/participante/participantes.service';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.page.html',
  styleUrls: ['./modal-info.page.scss'],
})
export class ModalInfoPage implements OnInit {

  @Input() id;
  agregarTiempo=false;
  fecha:Date;
  participantes:any;
  participante:Participante=new Participante();

  constructor( private modalCtrl:ModalController,
              private participanteService: ParticipantesService,) { }

  ngOnInit() {
    this.participantes=this.participanteService.findParticipante(this.id);
  }

  salir(){
    this.modalCtrl.dismiss();
  }

  agregarTiemp(participante:any){
    this.agregarTiempo=true;
    this.participante=participante;
  }

  guardar(){
    this.participanteService.save(this.participante)
    this.modalCtrl.dismiss();
  }

}
