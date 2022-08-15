import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthenticationService } from '../services/autenticacion.service';
import { ManagerService } from '../services/manager.service';

import { respuestaAreas, respuestaDocentes,respuestaDis, citasSoliA,respuestaDocA,respuestaHora} from "../models/users.models";
import { Environments } from 'src/environments/env.constant';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgenAlumService {

  constructor(
    private managerservice:ManagerService,
    private http:HttpClient
  ) { }

  verAreas(){
    return this.http.get<respuestaAreas>(`${Environments.API_ENDPOINT}/area.php`);
  }

  verDocen(){
    return this.http.get<respuestaDocentes>(`${Environments.API_ENDPOINT}/docentes.php`);
  }

  verDetalles(data:any){
    const body = new HttpParams()
    .set('Area',data.Area)
    return this.http.post<any>(`${Environments.API_ENDPOINT}/encar.php`,body).pipe(
      map((respuestaDocA:respuestaDocA)=>{
        console.log(respuestaDocA);        
        return respuestaDocA;
      })
    )
  }

  verHorario(data:any){
    const body = new HttpParams()
    .set('Matricula',data.Matricula)
    return this.http.post<any>(`${Environments.API_ENDPOINT}/horario.php`,body).pipe(
      map((respuestaHora:respuestaHora)=>{
        console.log(respuestaHora);        
        return respuestaHora;
      })
    )
  }

  soliCita(data:any){
    const body = new HttpParams()
            .set('Matricula',data.Matricula)
            .set('Docente', data.Docente)  
            .set('Fecha',data.Fecha)
            .set('Area', data.Area)
            .set('Hora',data.Hora)    
      return this.http.post<any>(`${Environments.API_ENDPOINT}/soliCita.php`, body).pipe(
            map((citasSoliA:citasSoliA) => {
                console.log("Servicios ",citasSoliA);
                return citasSoliA;
            })
      )
  }


}
