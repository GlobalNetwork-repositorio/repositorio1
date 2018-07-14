import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { CrudService } from '../../services/crud.service';
import { Egreso } from '../egreso.model';
import { EgresosService } from '../egresos.service';
import swal from 'sweetalert2';
import { MSJ_ALERT_BORRAR, MSJ_SUCCESS } from '../../../config/config';
// import { CrudHttpClientServiceShared } from '../../../shared/servicio/crudHttpClient.service.shared';


@Component({
  selector: 'app-lista-egresos',
  templateUrl: './lista-egresos.component.html',  
  animations: [routerTransition()]  
})

export class ListaEgresosComponent implements OnInit {
  egresoSModel: Egreso[];
  db_egresos: any;
  ShowBuqueda: boolean = false;
  showChild: boolean = false;    
  totalRecords: number = 0;
  filtrosActivos: any;
  constructor(private crudService: CrudService, private egresoService: EgresosService) { }

  ngOnInit() {
    // this.getAll();        
  }

  filter(e) {   
    console.log(JSON.stringify(e.filters));
    this.filtrosActivos = e;
    this.refreshModel(this.filtrosActivos);
  }

  refreshModel(e) {
    const pageMostar = e.first / e.rows;

    console.log('valores del e:' , e);
    this.crudService.getPagination(pageMostar == null ? 0 : pageMostar, e.rows == null ? 10 : e.rows, 'asc', 'idEgreso', 'egreso', 'paginacion', e.filters)
      .subscribe((res: any) => {
        console.log(res);
        this.db_egresos = res.data;
        this.totalRecords = res.totalCount;
      });
  }

  borrarRegistro( data: any ) {    
    swal(MSJ_ALERT_BORRAR).then((res: any) => {
      if(res.value) {
        this.crudService.delete(data.idEgreso, 'egreso', 'delete').subscribe(res => { 
          swal(MSJ_SUCCESS); this.refreshModel(this.filtrosActivos);
        });
      }
    });    
  }

  ShowChild() { this.showChild = !this.showChild }
  onDeactivate() { this.ShowChild(); }
  onActivate() { this.showChild = true; }

}
