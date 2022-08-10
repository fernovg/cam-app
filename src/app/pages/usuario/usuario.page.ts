import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/autenticacion.service';

import { respuestaCitas, respuestaCitasD } from "../../models/users.models";
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  respuestaCitasD: respuestaCitasD;
  respuestaCitas: respuestaCitas;

  requestD = {
    Matricula: this.auth.currentUserValue.intMatricula,
    Estado: "Aprobado"
  }

  requestA = {
    Matricula: this.auth.currentUserValue.intMatricula,
    Estado: "Aprobado"
  }

  nombre: string = "";
  usuario: string = "";

  loading: boolean = false;

  constructor(private auth: AuthenticationService,
    private navcontroller: NavController,
    private citas: UsuarioService) {
  }

  ngOnInit() {
    this.nombre = this.auth.currentUserValue.nombre;
    this.usuario = this.auth.currentUserValue.tipo;
    if (this.auth.currentUserValue.tipoId == "3") {
      this.cargarCitasA_A();
    } else {
      this.cargarCitasD_A();
    }
  }
  tabSeleccionado = "";
  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail.value);
    this.tabSeleccionado =ev.detail.value;
    switch (ev.detail.value) {
      case 'aprobadas':        
        this.requestA.Estado = "Aprobado";
        this.requestD.Estado = "Aprobado";
        break;
      case 'canceladas':
        this.requestA.Estado = "Cancelado";
        this.requestD.Estado = "Cancelado";
        break;
      case 'pendientes':
        this.requestA.Estado = "Pendiente";
        this.requestD.Estado = "Pendiente";
        break;

      default:
        break;


    }
    if (this.auth.currentUserValue.tipoId == "3") {
      this.cargarCitasA_A();
    } else {
      this.cargarCitasD_A();
    }
  }
  cerrar() {
    this.auth.logout();
    this.navcontroller.navigateRoot("/inicio")
  }

  cargarCitasD_A() {
    this.loading = true;
    this.citas.verCitasD_A(this.requestD).subscribe(data => {
      this.loading = false;
      this.respuestaCitasD = data;
    })
  }

  cargarCitasA_A() {
    this.loading = true;
    this.citas.verCitasA_A(this.requestA).subscribe(data => {
      this.loading = false;
      this.respuestaCitas = data;
    })
  }

}
