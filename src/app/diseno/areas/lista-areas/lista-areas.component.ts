import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { CrudService } from '../../services/service.index';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import swal from 'sweetalert2';
import { MSJ_ALERT_BORRAR, MSJ_SUCCESS } from '../../../config/config';
import { rootRenderNodes } from '@angular/core/src/view';

@Component({
  selector: 'app-lista-areas',
  templateUrl: './lista-areas.component.html',  
  animations: [routerTransition()]
})
export class ListaAreasComponent implements OnInit {
  // mostrarLista: boolean = true;

  db_area: any;
  showChild: boolean = false;
  
  @ViewChild('dt') dataTable: Table;
  Typeahead = new Subject<string>();
  filterPage: any;
  filtrosActivos: any;
  totalRecords: number;  
  http_controller='area';

  rowEdit: boolean = false;
  valorInicialInputEdit: string;

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

  edit(area: any): void {
    this.rowEdit = true;
    this.valorInicialInputEdit = area.descripcion;      
    setTimeout(() => {
      const nomRow = 'row' + area.idArea;
      let row: HTMLElement = document.getElementById(nomRow);      
      row.click();
    }, 300);    
  }

  guardarEdit(area: any): void {
    this.rowEdit = false;
    if (this.valorInicialInputEdit !== area.descripcion) {      
      this.crudService.create(area, this.http_controller,'update').subscribe(res =>console.log(res));
    }
  }
  // cunado son pocos registro conviene [lazy]="false" == consultas en el template;
  // (onLazyLoad)="filter($event)" tambien controla la paginacion cuando  [lazy]="true" 
  // si es falso lo ignora todas estas funciones: (onLazyLoad, filter, refreshModel)
  
  // // solo cuando [lazy]="true"
  // filter(e) {
  //   console.log("1");
  //   this.filtrosActivos = e;    
  //   this.refreshModel(e);
  // }
  
    // // solo cuando [lazy]="true"
  // refreshModel(e?: any) {    
  //   const pageMostar =  e ? e.first / e.rows : null;
  //   const rows = e ? e.rows : null;
  //   const filtros = e ? JSON.stringify(JSON.stringify(e.filters)) : "{}"; // si no existe filtros devuelve "{}" = todos
    
  //   this.crudService.getPagination(pageMostar === null ? 0 : pageMostar, rows === null ? 10 : e.rows, 'asc', 'idArea', 'area', 'paginacion', filtros)
  //     .subscribe((res: any) => {        
  //       this.db_area = res.data;
  //       this.totalRecords = res.totalCount;        
  //     });
  // }

  maestros() {
    this.crudService.getAll(this.http_controller, 'getall').subscribe((res: any) => { this.db_area = res; this.totalRecords = res.totalCount;});
  }

  borrarRegistro(data: any) {
    swal(MSJ_ALERT_BORRAR).then((res: any) => {
      if (res.value) {
        this.crudService.delete(data.idArea, this.http_controller, 'delete').subscribe(res => {
          swal(MSJ_SUCCESS);           
          // this.refreshModel(this.filtrosActivos); // cuando [lazy]="true"
          this.maestros();
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
