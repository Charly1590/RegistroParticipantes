import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/domain/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(public afs: AngularFirestore) { }

  private user:Usuario

  setUser(user:Usuario){
    this.user = user
  }
  
  save(usuario:Usuario){
      const refUsuarios = this.afs.collection("usuarios");
      
      if (usuario.uid == null){
        usuario.uid = this.afs.createId();
        usuario.activo = true;
      }
  
      refUsuarios.doc(usuario.uid).set(Object.assign({}, usuario));
  }

  getUser(){
    return this.user
  }

  getData(uid:string):Observable<any[]>{
    console.log(uid);
    
    return this.afs.collection("usuarios",
            ref=> ref.where("uid","==",uid)).valueChanges();
  }
  
}
