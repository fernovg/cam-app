import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ManagerService } from '../services/manager.service';

import { resDocA, respuestaAlumno ,respuestaDis, citasRegD,respuestaHora} from "../models/users.models";
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

  verAlum(){
    return this.http.get<respuestaAlumno>(`${Environments.API_ENDPOINT}/alumno.php`);
  }

  verHora(){
    return this.http.get<respuestaDis>(`${Environments.API_ENDPOINT}/hora.php`);
  }

  buscador(data:any){
    const body = new HttpParams()
      .set('Nombre',data.Nombre)
    return this.http.post<any>(`${Environments.API_ENDPOINT}/pruebalista.php`,body).pipe(
      map((respuestaAlumno:respuestaAlumno)=>{
        return respuestaAlumno;
      })
    )
  }

  verAreas(data:any){
    const body = new HttpParams()
    .set('Matricula',data.Matricula)
    return this.http.post<any>(`${Environments.API_ENDPOINT}/docarea.php`,body).pipe(
      map((resDocA:resDocA)=>{
        console.log(resDocA);        
        return resDocA;
      })
    )
  }

  verHorario(data:any){
    const body = new HttpParams()
    .set('Matricula',data.Matricula)
    return this.http.post<any>(`${Environments.API_ENDPOINT}/dochorar.php`,body).pipe(
      map((respuestaHora:respuestaHora)=>{
        console.log(respuestaHora);        
        return respuestaHora;
      })
    )
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
