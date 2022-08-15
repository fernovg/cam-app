import { HttpClient ,HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Environments } from 'src/environments/env.constant';
import { horarios , agArea , respuestaAreas, respuestaHorario ,borrarHorario } from "../models/users.models";

@Injectable({
  providedIn: 'root'
})
export class ModulHoraService {

  constructor(private http:HttpClient) { }

  verAreas(){
    return this.http.get<respuestaAreas>(`${Environments.API_ENDPOINT}/area.php`);
  }

  verHorario(data:any){
    const body = new HttpParams()
      .set('matricula',data.matricula)
    return this.http.post<any>(`${Environments.API_ENDPOINT}/horario/verHorario.php`,body).pipe(
      map((respuestaHorario:respuestaHorario)=>{
        console.log(respuestaHorario);        
        return respuestaHorario;
      })
    )
  }

  borrarHora(data:any){
    const body = new HttpParams()
      .set('IdHora',data.IdHora)
    return this.http.post<any>(`${Environments.API_ENDPOINT}/horario/borrar.php`, body).pipe(
      map((borrarHorario:borrarHorario)=>{
        return borrarHorario;
      })
    )
  }

  agregarH(data:any){
    const body = new HttpParams()
      .set('Ini',data.Ini)
      .set('minIni',data.minIni)
      .set('Fin',data.Fin)      
      .set('minFin',data.minFin)
      .set('matricula',data.matricula)
    return this.http.post<any>(`${Environments.API_ENDPOINT}/horario/agregarHorario.php`, body).pipe(
      map((horarios:horarios)=>{
        console.log("service ",horarios);
        
        return horarios;
      })
    )
  }

  agregarArea(data:any){
    const body = new HttpParams()
      .set('Area',data.Area)
      .set('Matricula',data.Matricula)
    return this.http.post<any>(`${Environments.API_ENDPOINT}/horario/agregarArea.php`, body).pipe(
      map((agArea:agArea)=>{
        console.log("service ",agArea);
        return agArea;        
      })
    )
  }

}
