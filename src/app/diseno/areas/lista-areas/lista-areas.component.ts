import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { CrudService } from '../../services/service.index';


@Component({
  selector: 'app-lista-areas',
  templateUrl: './lista-areas.component.html',  
  animations: [routerTransition()]
})
export class ListaAreasComponent implements OnInit {
  // mostrarLista: boolean = true;

  db_area: any;
  showChild: boolean = false;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.maestros();
  }

  maestros() {
    this.crudService.getAll('area','getall').subscribe(res => this.db_area = res);
  }

  ShowChild() { this.showChild = this.showChild; } 
  onActivateChild() { this.showChild = true; }
  onDeactivateChild() { this.showChild = false; }

}
