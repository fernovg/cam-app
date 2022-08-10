import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { RegistroService } from '../registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  request = {
    Matricula: "",
    Nombre: "",
    APaterno: "",
    AMaterno: "",
    Telefono: "",
    Correo: "",
    Tutor: "",
    Usuario: "",
    Password: ""
  }

  constructor(private reg:RegistroService,private navcontroller:NavController, public toastController: ToastController) { }

  ngOnInit() {
  }

  loading:boolean = false;

  async llenoToast(message) {
    const toast = await this.toastController.create({
      color: "primary",
      mode: "ios",
      message: message,
      duration: 3000
    });
    toast.present();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      color: "warning",
      mode: "ios",
      message: message,
      duration: 3000
    });
    toast.present();
  }

  get validaCampos(){

    if(this.request.Nombre == "" || this.request.APaterno == "" || this.request.AMaterno == "")
      return true;

    return false;
  }
  regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  registro(){    
   
    
    if(!this.request.Matricula || this.request.Matricula == ""){
      this.presentToast("Matricula es un campo obligatorio");
      return;
    }

    let lenghtMatricula = this.request.Matricula.toString().length;
    if(lenghtMatricula > 8 ||  lenghtMatricula < 8){
      this.presentToast("Matricula debe ser de 8 caracteres");
      return;
    }

    if(this.request.Nombre == "" || this.request.APaterno == ""){
      this.presentToast("Nombre y apellidos son campos obligatorios");
      return;
    }
    if(this.request.Correo == ""){
      this.presentToast("Correo electronico es obligatorio");
      return;
    }
    if(!RegExp(this.regexEmail).test(this.request.Correo)){
      this.presentToast("Formato de correo invalido");
      return;
    }

  

    this.loading = true;
      this.reg.regUser(this.request).subscribe({
        next:(userReg)=> {
          this.loading = false;
          if (!userReg.result) {
            this.presentToast(userReg.message);
            return
          }
          this.llenoToast(userReg.message);
          this.request = {
            Matricula: "",
            Nombre: "",
            APaterno: "",
            AMaterno: "",
            Telefono: "",
            Correo: "",
            Tutor: "",
            Usuario: "",
            Password: ""
          }   
          this.navcontroller.navigateRoot("/login")
        },error: error=> {
          console.log(error);
        }
      })
      
    
    
  }

}
