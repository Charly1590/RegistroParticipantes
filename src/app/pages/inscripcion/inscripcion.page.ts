import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Participante } from 'src/app/domain/participante';
import { Usuario } from 'src/app/domain/usuario';
import { ParticipantesService } from 'src/app/services/participante/participantes.service';
import { UsuariosService } from 'src/app/services/usuario/usuarios.service';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.page.html',
  styleUrls: ['./inscripcion.page.scss'],
})
export class InscripcionPage implements OnInit {

  constructor(public userService: UsuariosService,
              public router: Router,
              public participaneService: ParticipantesService,
              public toastController: ToastController,
              public readonly auth: AngularFireAuth) { }
  
  participante:Participante=new Participante();

  ngOnInit() {  
    
  }

  ionViewWillEnter(){
    if(this.userService.getUser()==undefined){
      console.log(this.userService.getUser())
      this.router.navigate(['/registro'])
    }
  }

  async presentToast(mensaje:any) {
    const toast = await this.toastController.create({
      message: ""+mensaje+"",
      duration: 2000
    });
    toast.present();
  }

  guardar(){
    try{
      if(this.participante.nombre==null || this.participante.edad==null ||this.participante.cedula==null ||
        this.participante.sexo==null){
        this.presentToast("No se pudo ingresar el participante");
      }
      else{
        this.participante.llegada=null;
        this.participaneService.save(this.participante);
        this.participante.nombre=null;
        this.participante.edad=null;
        this.participante.cedula=null;
        this.participante.sexo=null;
        this.presentToast("Participante correctamente ingresado");
      }
    }catch(e){
      console.log(e);
      this.presentToast("No se pudo ingresar el participante");
    }
  }

  logout(){
    console.log("OUT");
    this.userService.setUser(null);
    this.auth.signOut;
    this.router.navigate(['']);
  }
  irARegistro(){
    this.router.navigate(['/registro']);
  }

}
