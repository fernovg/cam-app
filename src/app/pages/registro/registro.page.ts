import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
    Password: "",
    Foto: ""
  }

  @ViewChild('filepicker') uploader: ElementRef;

  base: string = "";


  constructor(private reg:RegistroService,private navcontroller:NavController, public toastController: ToastController) { }

  ngOnInit() {
  }

  loading:boolean = false;

  addFile() {
    this.uploader.nativeElement.click();
  }

  async fileSelected($event) {
    const selected = $event.target.files[0];
    var reader = new FileReader();

      if (selected.size < 1000000) {
        
        var ext = selected.type.split('/').pop();
        if (ext == "jpg" || ext == "jpeg") {
          reader.readAsDataURL(selected);
          reader.onload = (_event)=>{
            this.llenoToast("Foto Correcta")
            this.base = reader.result.toString();
          
        }       
      }else{
        this.presentToast("Tipo no adecuado");
      }
      }else{
        this.presentToast("Limite de imagen tiene que ser 1mb");
      }
      
  }

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

    this.request.Foto = this.base;

    this.loading = true;
      this.reg.regUser(this.request).subscribe({
        next:(userReg)=> {
          this.loading = false;
          if (!userReg.result) {
            this.presentToast(userReg.message);
            return
          }
          console.log(this.request);
          
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
            Password: "",
            Foto: ""
          }   
          this.navcontroller.navigateRoot("/login")
        },error: error=> {
          console.log(error);
        }
      })
      
    
    
  }

}
