import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../../router.animations';

import { Subject } from 'rxjs';
import { Table } from 'primeng/table';
import { CrudService } from '../../services/service.index';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import swal from 'sweetalert2';
import { MSJ_ALERT_BORRAR, MSJ_SUCCESS } from '../../../config/config';

@Component({
  selector: 'app-lista-cuentabancaria',
  templateUrl: './lista-cuentabancaria.component.html',
  animations: [routerTransition()]
})
export class ListaCuentaBancariaComponent implements OnInit {

  db_data: any;

  showChild: boolean = false;
  @ViewChild('dt') dataTable: Table;
  Typeahead = new Subject<string>();
  filterPage: any;
  filtrosActivos: any;
  totalRecords: number;
  http_controller: string = 'cuenta';

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.maestros();
    this.initObservable();
  }

  initObservable() {
    this.Typeahead.pipe(distinctUntilChanged(), debounceTime(500))
      .subscribe((res: any) => {
        const value = res[0]; const field = res[1]; const operator = res[2];        
        this.dataTable.filter(value, field, operator);
      });
  }

  maestros() {
    this.crudService.getAll(this.http_controller, 'getall').subscribe((res: any) => { this.db_data = res; this.totalRecords = res.totalCount; });
  }

  borrarRegistro(data: any) {
    swal(MSJ_ALERT_BORRAR).then((res: any) => {
      if (res.value) {
        this.crudService.delete(data.idCuenta, this.http_controller, 'delete').subscribe(res => {
          swal(MSJ_SUCCESS); this.maestros();
        });
      }
    });
  }

  ShowChild() { this.showChild = this.showChild; }
  onActivateChild() { this.showChild = true; }
  onDeactivateChild() { 
    this.showChild = false; 
    if (this.crudService.refreshByStorage(this.http_controller)) { this.maestros() }
  }

}
