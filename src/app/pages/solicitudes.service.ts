import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Environments } from 'src/environments/env.constant';
import { respuestaCitas, respuestaCitasD, aprobarCita, rechazarCita, reagenCita, verHoraD } from '../models/users.models';
import { ManagerService } from '../services/manager.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(private managerservice:ManagerService,
    private http: HttpClient) { }

    verHorario(data:any){
      const body = new HttpParams()
      .set('Matricula',data.Matricula)
      return this.http.post<any>(`${Environments.API_ENDPOINT}/reagendar/verHoras.php`,body).pipe(
        map((verHoraD:verHoraD)=>{
          console.log("Servicios",verHoraD);        
          return verHoraD;
        })
      )
    }

    verCitasD_P(data:any){
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

      verCitasA_P(data:any){
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

        aprobarC(data:any){
          const body = new HttpParams()
            .set('Num_Cita',data.Num_Cita)
            return this.http.post<any>(`${Environments.API_ENDPOINT}/aprobar.php`, body).pipe(
              map((aprobarCita:aprobarCita) => {
                  console.log(aprobarCita);
                  return aprobarCita;
              })
            )
          }

        rechazarC(data:any){
          const body = new HttpParams()
            .set('Num_Cita',data.Num_Cita)
            return this.http.post<any>(`${Environments.API_ENDPOINT}/rechazar.php`, body).pipe(
              map((rechazarCita:rechazarCita) => {
                  console.log(rechazarCita);
                  return rechazarCita;
              })
            )
        }

        reagCita(data:any){
          const body = new HttpParams()
            .set('Fecha',data.Fecha)
            .set('Hora',data.Hora)
            .set('Estado',data.Estado)
            .set('Cita',data.Cita)
          return this.http.post<any>(`${Environments.API_ENDPOINT}/reagendar/reagendar.php`, body).pipe(
            map((reagenCita:reagenCita)=>{
              return reagenCita;
            })
          )
        }
}
