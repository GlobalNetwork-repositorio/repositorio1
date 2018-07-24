import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Observable } from 'rxjs/Observable';
// import { Egreso } from './egreso.model';

@Injectable({
  providedIn: 'root'
})
export class EgresosService {

  url = URL_SERVICIOS;

  constructor(private http: HttpClient) { }

  createEgreso(datos: any): Observable<any>{    
    const url = `${this.url}/egreso/save`;
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    let parametros = new HttpParams().set("historial", JSON.stringify(datos.historial));

    localStorage.setItem('pintar', 'egreso'); // para actualizar las listas despues de modificar o guardar

    return this.http.post(url, JSON.stringify(datos.modelo), { params:parametros, headers: header });
  }

}
