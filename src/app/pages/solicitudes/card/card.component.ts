import { Component, Input, OnInit } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

import { ModalComponent } from '../../solicitudes/card/modal/modal.component';

import { SolicitudesService } from '../../solicitudes.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() cita;
  @Input() tipo;
  @Input() tipoUsuario;

  @Input() Num_Cita: string;

  procesado= false;

  loading = false;

  constructor(private citas:SolicitudesService,public toastController: ToastController,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.cita);
  }

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      color: color,
      mode: "ios",
      message: message,
      duration: 3000
    });
    toast.present();
  }

  aprobar(Num_Cita){
    this.loading = true;
    this.citas.aprobarC({
      Num_Cita: Num_Cita
    }).subscribe(data=>{
      this.loading = false;
      console.log(data); 
      if(data.result){
        this.procesado=true;
        this.presentToast(data.message,"primary")
      }
      else 
        this.presentToast(data.message,"warning")
      //this.cargarCitasD_P(); 
    })
  }

  rechazar(Num_Cita){
    this.loading = true;
    this.citas.rechazarC({
      Num_Cita: Num_Cita
    }).subscribe(data=>{
      this.loading = false;
      console.log(Num_Cita);
      if(data.result)
        this.procesado=true;
      //this.cargarCitasD_P(); 
    })
  }

  async openModal(Num_Cita) {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      //backdropDismiss: false,
      componentProps: {
        'Num_Cita': Num_Cita,
      },
    });
    //modal.present();
    modal.onDidDismiss().then(data => {
      if (data.data == "Reagendado") {
        //this.procesado=true;
        console.log(data);
      }
    });
    return await modal.present(); 
  }  

}
