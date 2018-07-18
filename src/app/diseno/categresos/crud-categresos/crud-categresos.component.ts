import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../../router.animations';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Concepto } from '../concepto.model';
import { Rubro } from '../rubro.model';
import { CrudService } from '../../services/service.index';
import { MSJ_SUCCESS, MSJ_ALERT_BORRAR } from '../../../config/config';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-crud-categresos',
  templateUrl: './crud-categresos.component.html',  
  animations: [routerTransition()]
})
export class CrudCatEgresosComponent implements OnInit {

  rubro_model: Rubro = new Rubro;
  concepto_model: Concepto = new Concepto;
  db_concepto_registro: any [];

  form: FormGroup;
  formRegistro: FormGroup;
  procesando: boolean = false;
  procesando_concepto_registro: boolean = false; // para los iconos de carga
  id: number = null;
  db_rubro: any;

  private esEdicion: boolean = false; //si es nuevo registro limpia el formulario
  private httpModel: string = 'concepto';  

  // listado de ConceptoRegistros
  @ViewChild('dt') dataTable: Table;
  Typeahead = new Subject<string>();
  rowEdit: boolean = false;
  valorInicialInputEdit: string;
  totalRecords: number = null;

  constructor(
    private crudService: CrudService,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute
  ) {
    this.activateRoute.params.subscribe(
      params => this.id = params['id']);
  }

  ngOnInit() {
    this.maestros();
    if (this.id) { this.editar(); this.esEdicion = true; }
    this.prepararFormulario();
    this.prepararFormularioRegistro();
    this.initObservable();
  }


  private maestros(): void {
    this.crudService.getAll('rubro', 'getall').subscribe(res => this.db_rubro = res);    
  }

  private prepararFormulario(): void {
    this.form = this.formBuilder.group({
      descripcion: [this.concepto_model.descripcion, Validators.required],
      rubro: [this.concepto_model.rubro, Validators.required],
      idConcepto: this.concepto_model.idConcepto || 0
    });    
  }

  private prepararFormularioRegistro(): void {
    // formulario de los registros
    this.formRegistro = this.formBuilder.group({
      descripcion: ['', Validators.required],
      concepto: [this.concepto_model, Validators.required],
      idConceptoRegistro: 0
    });
  }

  editar() {
    this.crudService.edit(this.id, this.httpModel, 'edit').subscribe(res => {
      this.concepto_model = res;      
      this.prepararFormulario();      
      this.prepararFormularioRegistro();      
      this.actualizarListaConceptoRegistro();      
    });
  }

  // Se utiliza para obtener el valor incial. Ej: Al editar los valores obtenidos deben mostrarse en combo materialize
  compareRubro(c1: any, c2: any): boolean { return c1 && c2 ? c1.idRubro === c2.idRubro : c1 === c2; }

  guardarCambios() {
    // concepto
    if (!this.form.valid || this.procesando) { return; }
    this.procesando = true;

    console.log(this.form.value);    

    this.crudService.create(this.form.value, this.httpModel, 'save').subscribe(res => {
      console.log('servidor', res);
      this.concepto_model = res;
      setTimeout(() => {
        if (!this.esEdicion) { this.prepararFormulario(); }
                
        // concepto registro
        this.guardarConceptoRegistro();

        swal(MSJ_SUCCESS); this.procesando = false;
      }, 800);
    });

  }

  private getConceptoRegistroByIdConcepto ( id: number) {
    this.crudService.getAllBy('conceptoregistro','getFindByIdConcepto',id).subscribe(res => {this.db_concepto_registro = res, console.log(res);});  
  }


  // para listado de ConceptoRegistros
  initObservable() {
    this.Typeahead.pipe(distinctUntilChanged(), debounceTime(500))
      .subscribe((res: any) => {
        const value = res[0]; const field = res[1]; const operator = res[2];
        this.dataTable.filter(value, field, operator);
      });
  }

  private guardarConceptoRegistro() {
    // this.procesando_concepto_registro = false;    
    if (!this.formRegistro.valid || this.procesando_concepto_registro) { return; }
    if (this.concepto_model.idConcepto === null) { this.guardarCambios(); return;} // si es nuevo guarda primero el concepto
    
    this.procesando_concepto_registro = true;
    this.formRegistro.value.concepto = this.concepto_model;
    this.crudService.create(this.formRegistro.value, 'conceptoregistro', 'save').subscribe(res => {          
      setTimeout(() => {
        this.prepararFormularioRegistro();
        this.actualizarListaConceptoRegistro();
        this.procesando_concepto_registro = false;
      }, 300);
    })    
  }

  private actualizarListaConceptoRegistro(): void { this.getConceptoRegistroByIdConcepto(this.concepto_model.idConcepto);}

  editConceptoRegistro(item: any): void {
    this.rowEdit = true;
    this.valorInicialInputEdit = item.descripcion;
    setTimeout(() => {
      const nomRow = 'row' + item.idConceptoRegistro;
      let row: HTMLElement = document.getElementById(nomRow);
      row.click();
    }, 300);
  }

  guardarEditConceptoRegistro(item: any): void {
    this.rowEdit = false;
    if (this.valorInicialInputEdit !== item.descripcion) {
      this.crudService.create(item, 'conceptoregistro', 'update').subscribe(res => console.log(res));
    }
  }

  borrarConceptoRegistro(data: any): void {
    swal(MSJ_ALERT_BORRAR).then((res: any) => {
      if (res.value) {
        this.crudService.delete(data.idConceptoRegistro, 'conceptoregistro', 'delete').subscribe(res => {
          swal(MSJ_SUCCESS);
          // this.refreshModel(this.filtrosActivos); // cuando [lazy]="true"
          this.actualizarListaConceptoRegistro();
        });
      }
    });
  }
  ////


}
