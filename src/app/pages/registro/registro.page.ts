import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/domain/usuario';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsuariosService } from 'src/app/services/usuario/usuarios.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
   
  date:Date=new Date();	
  showLoginOps = false;
  showRegOps = false;
  showRegGulOps = false;

  cclave: string = ""

  usuariolog : any;

  usuario:Usuario=new Usuario();

  constructor(public afAuth: AngularFireAuth,
              public afstore: AngularFirestore,
              public alertController: AlertController,
              public user: UsuariosService,
              public router: Router,
			  public toastController: ToastController) { }

  ngOnInit() {
  }

  reg(){
    if (this.showRegOps == false){
      this.showLoginOps = false
      this.showRegOps = true
      this.showRegGulOps = false
    }
  }

  async presentToast(mensaje:any) {
    const toast = await this.toastController.create({
      message: ""+mensaje+"",
      duration: 2000
    });
    toast.present();
  }

  async register() {
		const {  usuario, cclave } = this
		if(this.usuario.clave !== cclave) {
			this.presentToast('Las contraseñas no coinciden')
		}
		else{
			try {
				const res = await this.afAuth.createUserWithEmailAndPassword(usuario.correo , usuario.clave)
	
				this.afstore.doc(`usuarios/${res.user.uid}`).set({
					correo: usuario.correo,
					clave: usuario.clave,
					activo: true,
					uid: res.user.uid
				})
	
				this.user.setUser({
					correo: usuario.correo,
					clave: usuario.clave,
					activo: true,
					uid: res.user.uid
				})
	
				this.presentToast('Usuario creado. Iniciando sesion con su cuenta')
				this.router.navigate(['/inscripcion'])
				this.showRegOps = false
	
			} catch(error) {
				console.dir(error)
				if(error.code === "auth/invalid-email") {
					this.presentToast( 'Email no valido')
				}
				if(error.code === "auth/email-already-in-use") {
					this.presentToast('Email ya usado')
				}
				if(error.code == "auth/weak-password"){
					this.presentToast('La contraseña es menor a 6 caracteres')
				}
			}
		}
	}

  async verificar() {
	  
		const { usuario } = this
		try {
			
			const res = await this.afAuth.signInWithEmailAndPassword(usuario.correo , usuario.clave)
			
			if(res.user) {


				this.usuariolog = this.user.getData(res.user.uid);
				
				

				this.usuariolog.forEach((element) => {
					
					
					console.log(element[0]);

					if(element[0].activo == false){
						this.presentToast('Usuario eliminado')
					}
					else{
						this.user.setUser({
	
							correo: element[0].email,
							clave: element[0].clave,
							activo:  element[0].activo,
							uid: element[0].uid
						})
						this.router.navigate(['/inscripcion'])
						this.showLoginOps = false
					}

				});

			}
		
		} catch(err) {
			console.dir(err)
			if(err.code === "auth/user-not-found") {
				this.presentToast('Usuario no encontrado')
			}
			if(err.code === "auth/wrong-password") {
				this.presentToast('Contraseña Incorrecta')
			}
			if(err.code == "auth/invalid-email"){
				this.presentToast('Email invalido')
			}
		}
	}

  login(){
    if (this.showLoginOps == false){
      this.showLoginOps = true
      this.showRegOps = false
      this.showRegGulOps = false
    }
  }

}
