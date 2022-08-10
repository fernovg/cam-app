import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Environments } from 'src/environments/env.constant';

import { userReg } from "../models/users.models";
import { ManagerService } from "../services/manager.service";

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private managerservice:ManagerService,private http: HttpClient) { }

  regUser(data:any){
    const body = new HttpParams()
            .set('Matricula',data.Matricula)
            .set('Nombre', data.Nombre)  
            .set('APaterno',data.APaterno)
            .set('AMaterno', data.AMaterno)
            .set('Telefono',data.Telefono)
            .set('Correo', data.Correo) 
            .set('Tutor',data.Tutor)
            .set('Usuario',data.Usuario)
            .set('Password', data.Password)    
      return this.http.post<any>(`${Environments.API_ENDPOINT}/registro.php`, body).pipe(
            map((userReg:userReg) => {
                console.log(userReg);
                return userReg;
            })
      )
  }
}
