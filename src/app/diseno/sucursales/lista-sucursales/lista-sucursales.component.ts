import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { CrudService } from '../../services/service.index';

@Component({
  selector: 'app-lista-sucursales',
  templateUrl: './lista-sucursales.component.html',  
  animations: [routerTransition()]
})
export class ListaSucursalesComponent implements OnInit {

  db_sucursal: any;
  showChild: boolean = false;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.maestros();
  }

  maestros() {
    this.crudService.getAll('sucursal','getall').subscribe(res => this.db_sucursal = res);
  }

  ShowChild() { this.showChild = true; } 
  onActivateChild() { this.showChild = true; }
  onDeactivateChild() { this.showChild = false; }

}
