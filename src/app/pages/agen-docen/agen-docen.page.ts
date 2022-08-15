import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { resDocA, respuestaAlumno, respuestaDis,respuestaHora } from 'src/app/models/users.models';
import { AuthenticationService } from 'src/app/services/autenticacion.service';
import { AgenDocenService } from '../agen-docen.service';

@Component({
  selector: 'app-agen-docen',
  templateUrl: './agen-docen.page.html',
  styleUrls: ['./agen-docen.page.scss'],
})
export class AgenDocenPage implements OnInit {

  respuestaAlumno: respuestaAlumno;

  respuestaDis:respuestaDis;

  respuestaHora:respuestaHora;

  resDocA:resDocA;

  fechavalida= new Date().toISOString();

  horario = {
    Matricula: this.auth.currentUserValue.intMatricula
  }

  request = {
    Matricula: "",
    Nombre: this.auth.currentUserValue.intMatricula,
    Fecha: "",
    Area: "",
    Hora: ""
  }

  buscador = {
    Nombre: ""
  }

  constructor(private auth:AuthenticationService, 
    private navcontroller:NavController,
    private listas:AgenDocenService,private user:AuthenticationService,
    public toastController: ToastController,
    private citas: AgenDocenService) { 
      this.cargarAlumnos();
      this.verArea();
      this.verHorario();
    }

  ngOnInit() {    
  }

  cargarAlumnos(){
    this.listas.verAlum().subscribe(data=>
      {        
        this.respuestaAlumno=data;       
      })
  }  

  buscar(){
    this.loading = true;
    this.listas.buscador(this.buscador).subscribe(data=>{
      this.loading = false;
      this.respuestaAlumno=data;
    })    
  }

  async vacioToast() {
    const toast = await this.toastController.create({
      color: "warning",
      mode: "ios",
      message: "Campio Vacio",
      duration: 3000
    });
    toast.present();
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

  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    
    return utcDay !== 0 && utcDay !== 6;
  } 

  loading:boolean = false;

  verArea(){
    this.loading = true;
    this.listas.verAreas(this.horario).subscribe(data=>
    {
      this.loading = false;
      this.resDocA = data;
    })
  }

  verHorario(){
    this.loading = true;
    this.listas.verHorario(this.horario).subscribe(data=>
    {
      this.loading = false;
      this.respuestaHora = data;
    })
  }

  registrar(){
    this.loading = true;
    if (this.request.Matricula == "") {      
      this.loading = false;
      this.vacioToast();
      return;
    }if (this.request.Fecha == "") {      
      this.loading = false;
      this.vacioToast();
      return;
    }if (this.request.Area == "") {      
      this.loading = false;
      this.vacioToast();
      return;
    }if (this.request.Hora == "") {      
      this.loading = false;
      this.vacioToast();
      return;
    }else{      
      this.citas.regCita(this.request).subscribe({
        next:(citasRegD)=>{
          this.loading = false;
          if (!citasRegD.result) {
            this.presentToast(citasRegD.message);
            return;
          }
          this.request = {
            Matricula: "",
            Nombre: "",
            Fecha: "",
            Area: "",
            Hora: ""
          }     
          this.navcontroller.navigateRoot("/usuario")
          this.llenoToast(citasRegD.message);
        },error: error=>{
          console.log(error);        
        }
      })
    }
  }

  get validaArea(){

    if(this.request.Nombre == "")
      return false;

    return true;
  }
}
