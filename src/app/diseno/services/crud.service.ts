import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private url = URL_SERVICIOS;
  constructor(private http: HttpClient) { }

  getAll (controller: string, evento: string) {
    const url = `${this.url}/${controller}/${evento}`;
    return this.http.get<any[]>(url);
  }

  create (model:any,controller:string,evento:string): Observable<any> {
    const url = `${this.url}/${controller}/${evento}`;
    const header = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post(url, JSON.stringify(model), {headers: header});
  }

  getPagination(pagenumber, rows, sortdireccion, sortcolumn, controller, evento, filters): Observable<any> {
    const url = `${this.url}/${controller}/${evento}?pagenumber=${pagenumber}&rows=${rows}&sortdireccion=${sortdireccion}&sortcolumn=${sortcolumn}`;
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    const filtros = this.jsonFilterTablePrime(filters);

    return this.http.post(url, filtros, { headers: header });    
  }    


  ///// recibe los filtros del table primeng y los pasa a un formato del back-end paginacion
  /// ejemplo: {"field": "cuenta.banco", "operator": "startswith", "value": "BANCO"}
  jsonFilterTablePrime(obj: any): string {
    const filtros = JSON.stringify(obj);
    obj = JSON.parse(filtros);

    let rpt: any = [];
    let arr_filtros: any[] = [];
    var result = Object.keys(obj).map(function (key, index) {
        if (index === 0) {
          arr_filtros.push({ "field": key, "operator": "startswith", "value": obj[key].value });
        }
        else {
          arr_filtros.push({ "logic": 'or', "field": { key, "operator": "startswith", "value": obj[key].value } });
        }
    });

    rpt = { "logic": 'and', "filters": arr_filtros };

    console.log('stringify', JSON.stringify(rpt));
    return JSON.stringify(rpt);
  }
}
