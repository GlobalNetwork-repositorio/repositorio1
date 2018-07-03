import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { CrudService } from '../../services/crud.service';
import { Egreso } from '../egreso.model';
import { EgresosService } from '../egresos.service';


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
  constructor(private crudService: CrudService, private egresoService: EgresosService) { }

  ngOnInit() {
    this.getAll();
  }  

  ShowChild() { this.showChild = !this.showChild }

  getAll() {
    this.crudService.getAll('egreso','getall').subscribe(res => {      
      this.db_egresos = res;
      this.egresoSModel = <Egreso[]> res;      
      console.log('egresos', this.egresoSModel);
    })
  }

  buscar(parametro: string) {
    this.db_egresos = this.egresoService.buscar(this.egresoSModel, parametro);
  }

  onDeactivate() { this.ShowChild(); }
  onActivate() { this.showChild = true; }

}
