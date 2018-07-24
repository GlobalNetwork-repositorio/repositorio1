import { Injectable } from '@angular/core';
import { Ingreso } from './ingreso.model';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {

  constructor() { }

  // buscar (Datos: Ingreso[], parametro: string): any {    
  //   parametro = parametro.toLocaleLowerCase();

  //   return Datos.map(x => {
  //     const cadena = `${x.montoIngresado} 
  //         ${x.fecha} ${x.sucursal.descripcion} ${x.cuenta.banco}
  //         ${x.conceptoIngreso.descripcion} ${x.medioPago.descripcionMedioPago}`.toLocaleLowerCase();
          
  //     return cadena.indexOf(parametro) !== -1 ? x : null;
  //   });
  // }
}
