import { Component, OnInit } from '@angular/core';
import { ParticipantesService } from 'src/app/services/participante/participantes.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage implements OnInit {

  participantes:any;
  constructor(private participanteService: ParticipantesService) { }

  ngOnInit() {
    this.participantes=this.participanteService.participantesOrdenados();
  }

}
