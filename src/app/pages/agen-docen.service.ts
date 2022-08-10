import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ManagerService } from '../services/manager.service';

import { respuestaAreas, respuestaAlumno ,respuestaDis, citasRegD} from "../models/users.models";
import { Environments } from 'src/environments/env.constant';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgenDocenService {

  constructor(
    private managerservice:ManagerService,
    private http:HttpClient
  ) { }

  verAreas(){
    return this.http.get<respuestaAreas>(`${Environments.API_ENDPOINT}/area.php`);
  }

  verAlum(){
    return this.http.get<respuestaAlumno>(`${Environments.API_ENDPOINT}/alumno.php`);
  }

  verHora(){
    return this.http.get<respuestaDis>(`${Environments.API_ENDPOINT}/hora.php`);
  }

  regCita(data:any){
    const body = new HttpParams()
            .set('Matricula',data.Matricula)
            .set('Nombre', data.Nombre)  
            .set('Fecha',data.Fecha)
            .set('Area', data.Area)
            .set('Hora',data.Hora)    
      return this.http.post<any>(`${Environments.API_ENDPOINT}/addcitaD.php`, body).pipe(
            map((citasRegD:citasRegD) => {
                console.log("Servicios ",citasRegD);
                return citasRegD;
            })
      )
  }

}
