import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { respuestaCitas, respuestaCitasD } from 'src/app/models/users.models';
import { AuthenticationService } from 'src/app/services/autenticacion.service';
import { SolicitudesService } from '../solicitudes.service';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.page.html',
  styleUrls: ['./solicitudes.page.scss'],
})
export class SolicitudesPage implements OnInit {

  respuestaCitasD: respuestaCitasD;
  respuestaCitas: respuestaCitas;

  requestD = {
    Matricula: this.auth.currentUserValue.intMatricula,
    Estado: "Pendiente"
  }

  requestA = {
    Matricula: this.auth.currentUserValue.intMatricula,
    Estado: "Pendiente"
  }
  
  loading:boolean = false;

  constructor(private auth:AuthenticationService,private navcontroller:NavController,
    private citas:SolicitudesService) {   
    }

  ngOnInit() {
    console.log(this.auth.currentUserValue);
    if (this.auth.currentUserValue.tipoId == "3") {
      this.cargarCitasA_P();
    }else{
      this.cargarCitasD_P();
    }
  }


  cargarCitasD_P(){
    this.loading = true;
    this.citas.verCitasD_P(this.requestD).subscribe(data=>
    {
      this.loading = false;
      this.respuestaCitasD=data;
    })
  }

  cargarCitasA_P(){
    this.loading = true;
    this.citas.verCitasA_P(this.requestA).subscribe(data=>
    {
      this.loading = false;
      this.respuestaCitas=data;           
    })
  }

  


}
