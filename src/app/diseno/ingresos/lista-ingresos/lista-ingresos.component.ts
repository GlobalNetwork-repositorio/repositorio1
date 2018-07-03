import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { CrudService } from '../../services/crud.service';
import { Ingreso } from '../ingreso.model';
import { IngresosService } from '../ingresos.service';

@Component({
  selector: 'app-lista-ingresos',
  templateUrl: './lista-ingresos.component.html',
  animations: [routerTransition()]
})
export class ListaIngresosComponent implements OnInit {

  ingresoSModel: Ingreso[];
  db_ingreso: any;
  filtros: any = [{filtro: '', tag: true}];
  constructor(private crudService: CrudService, private ingresoService: IngresosService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.crudService.getAll('ingreso','getall').subscribe(res => {
      this.db_ingreso = res;
      this.ingresoSModel = <Ingreso[]> res;
      console.log('ingresos', this.ingresoSModel);
    })
  }

  buscar(parametro: string) {
    this.db_ingreso = this.ingresoService.buscar(this.ingresoSModel, parametro);
  }

}
