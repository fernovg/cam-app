import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from "../../services/autenticacion.service";

@Component({
  selector: 'app-logeado',
  templateUrl: './logeado.page.html',
  styleUrls: ['./logeado.page.scss'],
})
export class LogeadoPage implements OnInit {

  constructor(private auth:AuthenticationService, private navcontroller:NavController) { }

  ngOnInit() {
    if (this.auth.currentUserValue.result == true) {
      this.navcontroller.navigateRoot("/usuario")
    }else{
      this.navcontroller.navigateRoot("/inicio")
    }
  }

}
