import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Ingreso } from '../ingreso.model';
import swal from 'sweetalert2';
import { MSJ_ALERT_BORRAR, MSJ_SUCCESS } from '../../../config/config';
import { Usuario } from '../../usuarios/usuario.model';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Table } from 'primeng/table';
import { Utilitarios, CrudService } from '../../services/service.index';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-lista-ingresos',
  templateUrl: './lista-ingresos.component.html',
  animations: [routerTransition()]
})
export class ListaIngresosComponent implements OnInit {

  ingresoSModel: Ingreso[];
  usuario: Usuario;
  
  db_ingreso: any;
  ShowBuqueda: boolean = false;
  showChild: boolean = false;
  totalRecords: number = 0;
  filtrosActivos: any;

  @ViewChild('dt') dataTable: Table;

  filtros: any = [{filtro: '', tag: true}];
  Typeahead = new Subject<string>();
  sumaColumnas: any = null;

  constructor(
    private crudService: CrudService,     
    private usuarioService: UsuariosService,
    private utilitario: Utilitarios) { }

  ngOnInit() {
    // this.getAll();
    this.initObservable();
    this.usuario = this.usuarioService.getUsuario();
  }

  initObservable() {
    this.Typeahead.pipe(distinctUntilChanged(), debounceTime(500))
      .subscribe((res: any) => {
        const value = res[0]; const field = res[1]; const operator = res[2];
        this.dataTable.filter(value, field, operator);
      });
  }

  // filter(e) {
  //   this.filtrosActivos = e;     
  //   this.refreshModel(this.filtrosActivos);    
  // }

  filter(e): void {
    this.filtrosActivos = e;
    this.refreshModel(e);
  }

  // refreshModel(e) {
  //   const pageMostar = e.first / e.rows;

  //   console.log('valores del e:', e);
  //   this.crudService.getPagination(pageMostar == null ? 0 : pageMostar, e.rows == null ? 10 : e.rows, 'asc', 'idIngreso', 'ingreso', 'paginacion', e.filters)
  //     .subscribe((res: any) => {
  //       console.log(res);
  //       this.db_ingreso = res.data;
  //       this.totalRecords = res.totalCount;
  //     });
  // }

  // solo cuando [lazy]="true"
  refreshModel(e?: any): void {
    const pageMostar = e ? e.first / e.rows : null;
    const rows = e ? e.rows : null;
    const filtros = e ? JSON.stringify(JSON.stringify(e.filters)) : "{}"; // si no existe filtros devuelve "{}" = todos

    this.crudService.getPagination(pageMostar === null ? 0 : pageMostar, rows === null ? 10 : e.rows, 'asc', 'idIngreso', 'ingreso', 'paginacion', filtros)
      .subscribe((res: any) => {
        this.db_ingreso = res.data;
        this.totalRecords = res.totalCount;
        this.sumaColumnas = this.utilitario.sumarColumdaData(res.data, ['montoIngresado']);
        console.log(this.sumaColumnas);
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
  onActivate() { this.showChild = true;  }
  onDeactivate() {     
    this.ShowChild();
    if (this.crudService.refreshByStorage('ingreso')) { this.refreshModel(this.filtrosActivos);}
  }
}
