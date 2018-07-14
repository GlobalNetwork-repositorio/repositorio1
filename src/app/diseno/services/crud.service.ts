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
    
    localStorage.setItem('pintar',controller); // para actualizar las listas despues de modificar o guardar
    
    return this.http.post(url, JSON.stringify(model), {headers: header});
  }

  delete(id: any, controller: string, evento: string): Observable<any> {
    const url = `${this.url}/${controller}/${evento}/${id}`;        
    return this.http.delete<any>(url);
  }
  
  edit(id: any, controller: string, evento: string): Observable<any> {
    const url = `${this.url}/${controller}/${evento}/${id}`;
    return this.http.get<any>(url);
  }

  getPagination(pagenumber, rows, sortdireccion, sortcolumn, controller, evento, filters): Observable<any> {
    const url = `${this.url}/${controller}/${evento}?pagenumber=${pagenumber}&rows=${rows}&sortdireccion=${sortdireccion}&sortcolumn=${sortcolumn}`;
    console.log('url', url);
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });    
    const filtros = typeof filters !== 'string' ? this.jsonFilterTablePrime(filters) : filters;

    //console.log('filtros desde servicio crud', filtros);

    return this.http.post(url, filtros, { headers: header });
  }    

  // para refrescar las listas despues de agregar o modificar registros por el crud
  refreshByStorage (controller: string): boolean {
    const valorPintarStorage = localStorage.getItem('pintar') || '';
    const rpt = valorPintarStorage === controller ? true : false;
    if ( rpt ) { localStorage.removeItem('pintar'); }
    return rpt;
  }


  ///// recibe los filtros del table primeng y los pasa a un formato del back-end paginacion
  /// ejemplo: {"field": "cuenta.banco", "operator": "startswith", "value": "BANCO"}
  jsonFilterTablePrime(obj: any): string {
    const filtros = JSON.stringify(obj);
    obj = JSON.parse(filtros);
    
    let rpt: any = [];
    let arr_filtros: any[] = [];
    let arr_filtro_varios: any[] = [];
    let operador = 'startswith';

    Object.keys(obj).map(function (key, index) {        
        operador = obj[key].matchMode ? obj[key].matchMode : 'startswith';

        if (index === 0) {
          arr_filtros.push({ "field": key, "operator": operador, "value": obj[key].value });
        }
        else {                              
          arr_filtro_varios.push({ "field": key, "operator": operador, "value": obj[key].value });
        }
    });
    if ( arr_filtro_varios.length > 0) { arr_filtros.push({ "logic": 'and', "filters": arr_filtro_varios}) }
        
    if (obj === '{}' || Object.keys(obj).length === 0) { rpt = {} } else { rpt = { "logic": 'and', "filters": arr_filtros }; }
    

    console.log('stringify', JSON.stringify(rpt));
    return JSON.stringify(rpt);
  }

  // convierte fecha string dd/mm/yyyy  a date // se utiliza para mostrar la fecha en input type="date" que acepta "yyyy-MM-dd"
  deStringToDate(fecha: string, format?: string): string {    
    let rpt: string;    
    if (format === "dd/mm/yyyy") { 
      rpt = fecha.replace(/(\d+)[-/](\d{2})[-/](\d{2})/, "$3/$2/$1");
    } else {
      rpt = fecha.replace(/(\d{2})[-/](\d{2})[-/](\d+)/, "$3-$2-$1"); 
    }    
    return rpt;   
  }
}
