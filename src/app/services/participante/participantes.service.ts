import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Participante } from 'src/app/domain/participante';

@Injectable({
  providedIn: 'root'
})
export class ParticipantesService {

  constructor(public afs: AngularFirestore) { }
  
  save(participante:Participante){
      const refParticipantes = this.afs.collection("participantes");
      
      if (participante.id == null){
        participante.id = this.afs.createId();
        participante.activo = true;
      }
  
      refParticipantes.doc(participante.id).set(Object.assign({}, participante));
  }
  
  getParticipantes():Observable<any[]>{
    return this.afs.collection("participantes",
            ref=> ref.where("tInscrito","!=",null).orderBy("tInscrito","asc")).valueChanges();
  }

  findParticipante(id:any):Observable<any[]>{
    return this.afs.collection("participantes",
            ref=> ref.where("id","==",id)).valueChanges();
  }tInscrito

  participantesOrdenados():Observable<any[]>{
    return this.afs.collection("participantes",
    ref=> ref.where("llegada","!=",null).orderBy("llegada","desc")).valueChanges();
  }

}
