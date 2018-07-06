import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { CrudService } from '../../services/crud.service';
import { Egreso } from '../egreso.model';
import { EgresosService } from '../egresos.service';
// import { CrudHttpClientServiceShared } from '../../../shared/servicio/crudHttpClient.service.shared';


@Component({
  selector: 'app-lista-egresos',
  templateUrl: './lista-egresos.component.html',  
  animations: [routerTransition()]
  // providers: [ CrudHttpClientServiceShared ]
})
export class ListaEgresosComponent implements OnInit {

  egresoSModel: Egreso[];
  db_egresos: any;
  ShowBuqueda: boolean = false;
  showChild: boolean = false;
  filterPage: string;
  constructor(private crudService: CrudService, private egresoService: EgresosService) { }

  ngOnInit() {
    this.getAll();

    console.log('aaaaaaaaaaaaaa');
    this.pagination();
  }

  filter(e) {
    this.filterPage = JSON.stringify(e.filters);
    // console.log('e', e);
    // console.log('filtro', e.filters);
    
    // console.log('json spring', this.filterPage);
    // console.log('json spring convert', JSON.parse(this.filterPage));

    this.jsonFilterTablePrime(e.filters);
    //this.refreshModel(this.dataPagination, true);
  }
  
  jsonFilterTablePrime(obj: any): string {
    const filtros = JSON.stringify(obj);
    obj = JSON.parse(filtros)

    let rpt: any = [];    
    let arr_filtros: any [] = [];
    var result = Object.keys(obj).map(function (key,index) {
      if (index === 0) {
        arr_filtros.push({ "field": key, "operator": "startswith", "value": obj[key].value});
      }
      else {
        arr_filtros.push({ "logic": 'or', "field": {key, "operator": "startswith", "value": obj[key].value }});
      }      
    });
    
    rpt = { "logic": 'and', "filters": arr_filtros };

    console.log('stringify', JSON.stringify(rpt));
    return JSON.stringify(rpt);
  }

  pagination() {
    // {"detalles":{"value":""}}
    this.paginar(10, 5, 'ASC', 'descripcion', '{"detalles":{"value":"envi"}}','egreso','pagination','');
  }

  paginar(pagenumber, rows, sortdireccion, sortcolumn, filters, controller, evento, paramsExtra) {
    let obj = { 'pagenumber': pagenumber, 'rows': rows, 'sortdireccion': sortdireccion, 'sortcolumn': sortcolumn, 'filters': filters, 'paramsExtra': paramsExtra };
    let objser = this.serialize(obj);

    console.log('paginacion', objser);

  }

  serialize(obj) {
    var p = [];
    for (var key in obj) {

      if (encodeURIComponent(obj[key]) == "null") {
        console.log("null");

      } else {
        p.push(key + '=' + encodeURIComponent(obj[key]));
      }
    }
    return p.join('&');

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
