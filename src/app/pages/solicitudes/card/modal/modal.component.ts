import { Component, Input, OnInit } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { respuestaDis} from "../../../../models/users.models";

import { SolicitudesService } from '../../../solicitudes.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  respuestaDis:respuestaDis;

  @Input() Num_Cita: string;

  request = {
    Fecha: "",    
    Hora: "",
    Estado: "Pendiente",
    Cita: ""
  }
  
  constructor(private modalCtrl: ModalController, 
    private citas:SolicitudesService,
    private toastController: ToastController) { 
      this.cargarHoras();
    }

  ngOnInit() {
    this.request.Cita = this.Num_Cita;
  }

  cargarHoras(){
    this.citas.verHora().subscribe(data=>
      {
        this.respuestaDis=data;
      })
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

  async llenoToast(message) {
    const toast = await this.toastController.create({
      color: "primary",
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

  fechavalida= new Date().toISOString();

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    console.log(this.request);
    this.citas.reagCita(this.request).subscribe({
      next:(reagenCita)=>{
        if (!reagenCita.result) {
          this.presentToast(reagenCita.message);
          return
        }
        this.llenoToast(reagenCita.message);
        this.modalCtrl.dismiss(reagenCita.message,'confirm');
      }
    })    
  }

}