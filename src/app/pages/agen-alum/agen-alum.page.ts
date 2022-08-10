import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/autenticacion.service';
import { AgenAlumService } from '../agen-alum.service';
import { respuestaAreas, respuestaDocentes, respuestaDis} from "../../models/users.models";



@Component({
  selector: 'app-agen-alum',
  templateUrl: './agen-alum.page.html',
  styleUrls: ['./agen-alum.page.scss'],
  //menu
})
export class AgenAlumPage implements OnInit {

  respuestaAreas: respuestaAreas;

  respuestaDocentes: respuestaDocentes;

  respuestaDis:respuestaDis;

  fechavalida= new Date().toISOString();

  request = {
    Matricula: this.auth.currentUserValue.intMatricula,
    Docente: "",
    Fecha: "",
    Area: "",
    Hora: ""
  }

  constructor(private auth:AuthenticationService, 
    private navcontroller:NavController,
    private listas:AgenAlumService,private user:AuthenticationService,
    public toastController: ToastController,
    private loadingCtrl: LoadingController) { 
      this.cargarAreas();
      this.cargarDocentes();
      this.cargarHoras();
    }

  ngOnInit() {
    
        
  }

  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    return utcDay !== 0 && utcDay !== 6;
  } 

  cargarAreas(){
    this.listas.verAreas().subscribe(data=>
      {
        this.respuestaAreas=data;        
      })
  }

  cargarDocentes(){
    this.listas.verDocen().subscribe(data=>
      {
        this.respuestaDocentes=data;       
      })
  }  

  cargarHoras(){
    this.listas.verHora().subscribe(data=>
      {
        this.respuestaDis=data;
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

  loading:boolean = false;

  solicitad(){
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
    this.listas.soliCita(this.request).subscribe({
      next:(citasSoliA)=>{
        this.loading = false;
        if (!citasSoliA.result) {
          this.presentToast(citasSoliA.message);
          return;
        }
        this.request = {
          Matricula: "",
          Docente: "",
          Fecha: "",
          Area: "",
          Hora: ""
        }         
        this.llenoToast(citasSoliA.message);
      }
    })
  }
  }

}
