import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Environments } from 'src/environments/env.constant';
import { respuestaCitas, respuestaCitasD } from '../models/users.models';
import { ManagerService } from '../services/manager.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private managerservice:ManagerService,
    private http: HttpClient) { }

    verCitasD_A(data:any){
      const body = new HttpParams()
        .set('Matricula',data.Matricula)
        .set('Estado',data.Estado)
        return this.http.post<any>(`${Environments.API_ENDPOINT}/getDocente.php`, body).pipe(
          map((respuestaCitasD:respuestaCitasD) => {
              console.log(respuestaCitasD);
              return respuestaCitasD;
          })
        )
      }

      verCitasA_A(data:any){
        const body = new HttpParams()
          .set('Matricula',data.Matricula)
          .set('Estado',data.Estado)
          return this.http.post<any>(`${Environments.API_ENDPOINT}/getAlumno.php`, body).pipe(
            map((respuestaCitas:respuestaCitas) => {
                console.log(respuestaCitas);
                return respuestaCitas;
            })
          )
        }
}
