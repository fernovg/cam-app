import { Component, Input, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/autenticacion.service';
import { ModulHoraService } from '../modul-hora.service';

import { respuestaAreas, respuestaHorario} from "../../models/users.models";

@Component({
  selector: 'app-modul-hora',
  templateUrl: './modul-hora.page.html',
  styleUrls: ['./modul-hora.page.scss'],
})
export class ModulHoraPage implements OnInit {

  loading:boolean = false;

  respuestaAreas: respuestaAreas;

  respuestaHorario:respuestaHorario;

  @Input() IdHora: string;

  procesado = false;

  // request para ver horarios

  mihorario = {
    matricula: this.auth.currentUserValue.intMatricula
  }

  // request para el modeal de agAreas

  area = {
    Area: "",
    Matricula: this.auth.currentUserValue.intMatricula
  }

// request para el modal de agregarHorario

  // saca hora
  tiempo = {
    Ini: "",
    Fin: ""
  }

  // este se envia al php
  data = {
    Ini: "",
    minIni:"",
    Fin: "",    
    minFin: "",
    matricula: this.auth.currentUserValue.intMatricula
  }

// request para dar alta en agregarArea


  base: string = "";

  constructor(private auth:AuthenticationService,
    private navcontroller:NavController,
    public toastController: ToastController,
    private horarios: ModulHoraService) { 
      this.cargarAreas();
      this.verHorario();
    }

  ngOnInit() {}

  cargarAreas(){
    this.horarios.verAreas().subscribe(data=>
      {
        this.respuestaAreas=data;        
      })
  }

  verHorario(){
    this.loading = true;
    this.horarios.verHorario(this.mihorario).subscribe(data=>{
      this.loading = false;
      this.respuestaHorario = data;
    })
  }

  borrar(IdHora){
    this.loading = true;
    this.horarios.borrarHora({
      IdHora : IdHora
    }).subscribe(data=>{
      this.loading = false;
      console.log("1 data "+data);
      if (data.result) {
        this.procesado = true;  
        this.llenoToast(data.message);
        this.navcontroller.navigateRoot("/usuario")
      }
      else
        this.presentToast(data.message)

    })
  }

  // funcioones para abrir modales
  modalArea = false;

  setOpenArea(isOpen: boolean) {
    this.modalArea = isOpen;
  }
  
  modalHora = false;

  setOpenHora(isOpen: boolean) {
    this.loading = true;
    this.modalHora = isOpen;
    this.procesado=true;
    this.loading = false;
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

  // funciones modales

  agHora(){
    this.loading = true;
    // hora inicio
    
    var extIni = this.tiempo.Ini.split('T').pop();
    var horaIni = extIni.split(':');

    // hora fin
    var extFin = this.tiempo.Fin.split('T').pop();
    var horaFin = extFin.split(':');

    this.data.Ini = this.base = horaIni[0];
    this.data.Fin = this.base = horaFin[0];

    this.data.minIni = this.base = horaIni[1];
    this.data.minFin = this.base = horaFin[1];

    if (this.tiempo.Ini == "") {
      this.loading = false;
      this.presentToast("Selecione la hora de inicio");
      return;
    }if (this.tiempo.Fin == "") {
      this.loading = false;
      this.presentToast("Selecione la hora de finalizacion");
      return;
    }else{
      this.horarios.agregarH(this.data).subscribe({
        next:(horarios)=>{
          this.loading = false;
          if (!horarios.result) {
            this.presentToast(horarios.message);
            this.setOpenHora(false);
            this.procesado=true;
            return;
          }
          // this.navcontroller.navigateRoot("/usuario");
          this.llenoToast(horarios.message);
          this.setOpenHora(false);
        },error: error=>{
          console.log(error);
          this.presentToast("Vuelva a intentar, Reinicie el modulo");
          
        }
      })
    }

    console.log(extIni);
    
    console.log(this.data);
    
  }

  agArea(){
    this.loading = true;

    if (this.area.Area == "") {
      this.loading = false;
      this.presentToast("Selecione un Area");
      return;
    }else{
      this.horarios.agregarArea(this.area).subscribe({
        next:(agArea)=>{
          this.loading = false;
          if (!agArea.result) {
            this.presentToast(agArea.message);
            this.setOpenArea(false);
            return;
          }
          this.llenoToast(agArea.message);
          this.setOpenArea(false);
          this.procesado = true;  
        },error: error=>{
          this.presentToast("Vuelva a intentar, Reinicie el modulo");
        }
      })
    }
  }


  get validarHora(){
    
    if(this.tiempo.Ini == "" && this.tiempo.Fin == "")
      return true;

    return false;
  }


  cerrar() {
    this.auth.logout();
    this.navcontroller.navigateRoot("/inicio")
  }

}