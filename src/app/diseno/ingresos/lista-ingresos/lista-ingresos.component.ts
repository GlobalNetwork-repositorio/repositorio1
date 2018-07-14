import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { CrudService } from '../../services/crud.service';
import { Ingreso } from '../ingreso.model';
import { IngresosService } from '../ingresos.service';
import swal from 'sweetalert2';
import { MSJ_ALERT_BORRAR, MSJ_SUCCESS } from '../../../config/config';

@Component({
  selector: 'app-lista-ingresos',
  templateUrl: './lista-ingresos.component.html',
  animations: [routerTransition()]
})
export class ListaIngresosComponent implements OnInit {

  ingresoSModel: Ingreso[];
  db_ingreso: any;
  ShowBuqueda: boolean = false;
  showChild: boolean = false;
  totalRecords: number = 0;
  filtrosActivos: any;

  filtros: any = [{filtro: '', tag: true}];
  constructor(private crudService: CrudService, private ingresoService: IngresosService) { }

  ngOnInit() {
    // this.getAll();
  }

  filter(e) {
    this.filtrosActivos = e;     
    this.refreshModel(this.filtrosActivos);    
  }

  refreshModel(e) {
    const pageMostar = e.first / e.rows;

    console.log('valores del e:', e);
    this.crudService.getPagination(pageMostar == null ? 0 : pageMostar, e.rows == null ? 10 : e.rows, 'asc', 'idIngreso', 'ingreso', 'paginacion', e.filters)
      .subscribe((res: any) => {
        console.log(res);
        this.db_ingreso = res.data;
        this.totalRecords = res.totalCount;
      });
  }

  borrarRegistro(data: any) {    
    swal(MSJ_ALERT_BORRAR).then((res: any) => {
      if (res.value) {
        this.crudService.delete(data.idIngreso, 'ingreso', 'delete').subscribe(res => {
          swal(MSJ_SUCCESS); this.refreshModel(this.filtrosActivos);
        });
      }
    });
  }

  ShowChild() { this.showChild = !this.showChild }
  onDeactivate() { this.ShowChild(); }
  onActivate() { this.showChild = true; }
}
