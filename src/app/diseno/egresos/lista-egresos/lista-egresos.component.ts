import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Egreso } from '../egreso.model';
import swal from 'sweetalert2';
import { MSJ_ALERT_BORRAR, MSJ_SUCCESS } from '../../../config/config';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs/internal/Subject';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { CrudService, Utilitarios } from '../../services/service.index';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { UsuariosModule } from '../../usuarios/usuarios.module';
import { Usuario } from '../../usuarios/usuario.model';
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

  usuario: Usuario;

  @ViewChild('dt') dataTable: Table;
  Typeahead = new Subject<string>();
  filterPage: any;
  totalRecords: number = 0;
  filtrosActivos: any;

  sumaColumnas: any = null;
  
  constructor(
    private crudService: CrudService,
    private usuarioService: UsuariosService,
    private utilitario: Utilitarios    
  ) { }

  ngOnInit() {
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
  //   console.log(JSON.stringify(e.filters));
  //   this.filtrosActivos = e;
  //   this.refreshModel(this.filtrosActivos);
  // }

  // refreshModel(e) {
  //   const pageMostar = e.first / e.rows;

  //   console.log('valores del e:' , e);
  //   this.crudService.getPagination(pageMostar == null ? 0 : pageMostar, e.rows == null ? 10 : e.rows, 'asc', 'idEgreso', 'egreso', 'paginacion', e.filters)
  //     .subscribe((res: any) => {
  //       console.log(res);
  //       this.db_egresos = res.data;
  //       this.totalRecords = res.totalCount;
  //     });
  // }

  ///////// lista //////////
  filter(e): void {    
    this.filtrosActivos = e;    
    this.refreshModel(e);
  }

  // solo cuando [lazy]="true"
  refreshModel(e?: any): void {    
    const pageMostar =  e ? e.first / e.rows : null;
    const rows = e ? e.rows : null;
    const filtros = e ? JSON.stringify(JSON.stringify(e.filters)) : "{}"; // si no existe filtros devuelve "{}" = todos

    this.crudService.getPagination(pageMostar === null ? 0 : pageMostar, rows === null ? 10 : e.rows, 'asc', 'idEgreso', 'egreso', 'paginacion', filtros)
      .subscribe((res: any) => {        
        this.db_egresos = res.data;
        this.totalRecords = res.totalCount;
        this.sumaColumnas = this.utilitario.sumarColumdaData(res.data,['monto']);
        console.log(this.sumaColumnas);
      });
  }
  ///////// lista //////////

  

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
  onActivate() { this.showChild = true; }
  onDeactivate() {
    this.ShowChild();
    if (this.crudService.refreshByStorage('egreso')) { this.refreshModel(this.filtrosActivos); }
  }

}
