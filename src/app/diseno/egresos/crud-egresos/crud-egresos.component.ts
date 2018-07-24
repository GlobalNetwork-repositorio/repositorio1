import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { CrudService, UtilitariosFecha, Utilitarios } from '../../services/service.index';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// import { conceptoEgreso } from '../../categresos/concepto.egreso.model';
import { UsuariosService } from '../../usuarios/usuarios.service';
import swal from 'sweetalert2';
import { MSJ_SUCCESS } from '../../../config/config';
import { ActivatedRoute } from '@angular/router';

import { Egreso } from '../../egresos/egreso.model';
import { Usuario } from '../../usuarios/usuario.model';
import { Concepto } from '../../categresos/concepto.model';
// import { map } from 'rxjs/operators';
// import { EgresosService } from '../egresos.service';
// import { isDate } from '@angular/common/src/i18n/format_date';

@Component({
  selector: 'app-crud-egresos',
  templateUrl: './crud-egresos.component.html',  
  animations: [routerTransition()]  
})
export class CrudEgresosComponent implements OnInit {

  db_cuenta_origen: any;
  db_medio_pago: any;
  db_concepto_egreso:any [];
  db_concepto_registro: any[];
  // db_sucursal: any;  
  db_concepto_egreso_filter: any[]; // obtiene los valores filtrado del autocomplete
  db_concepto_registro_filter: any[]; // obtiene los valores filtrado del autocomplete
  datos_enviar: any = [];// datos que se envian al servicio
  
  Egreso_model: Egreso = new Egreso;
  usuarioModel: Usuario;   
  concepto_model: Concepto = new Concepto;

  form: FormGroup;  
  procesando: boolean = false;
  fecha: string | Date = new Date;
  id: number = null;
  private esEdicion: boolean = false; //si es nuevo registro limpia el formulario
  private httpController: string = 'egreso';  

  constructor( 
      private crudService: CrudService, 
      //private egresoService: EgresosService,
      private usuarioService: UsuariosService,
      private formBuilder: FormBuilder,
      private activateRoute: ActivatedRoute,
      private utilitarioFecha: UtilitariosFecha,
      private utilitarios: Utilitarios
    ) {
    this.activateRoute.params.subscribe(
      params => this.id = params['id']);      
    }

  ngOnInit() {
    this.maestros();             
    if (this.id) { this.editar(); this.esEdicion = true; }
    this.prepararFormulario();    

  }  

  maestros(): void {
    //this.crudService.getAll('sucursal', 'getall').subscribe(res => this.db_sucursal = res);
    this.crudService.getAll('mediopago', 'getall').subscribe(res => this.db_medio_pago = res);
    this.crudService.getAll('cuenta', 'getall').subscribe(res => this.db_cuenta_origen = res);
    this.crudService.getAllBy('concepto', 'getFindByTipoRubro', 0).subscribe(res => { this.db_concepto_egreso = res; this.db_concepto_egreso_filter = res; });
    this.usuarioModel = this.usuarioService.getUsuario();    
  }

  editar() {
    this.crudService.edit(this.id, this.httpController, 'edit').subscribe(res => {
      this.Egreso_model = res;
      this.fecha = this.crudService.deStringToDate(this.Egreso_model.fecha.toString());
      this.usuarioModel = this.Egreso_model.usuario;
      this.concepto_model = this.Egreso_model.conceptoRegistro.concepto;

      this.prepararFormulario();      
    });
  }

  setAutoCompleteDatosFiltradosRegistro(event: any): void { this.db_concepto_registro_filter = event; }
  setAutoCompleteDatosFiltrados( event: any ): void { this.db_concepto_egreso_filter = event; }  
  // muestra en el input la descripcion del objeto Concepto se utiliza con [displayWith]="displayFn" en mat-autocomplete // sino obtendriamos [Object, Object]
  displayFnAutoComplete(concepto?: any): string | undefined { return concepto ? concepto.descripcion : undefined; }
  // Validators.required // valida lo escrito en el autocomplete, si no selecciona ningun opcion de la lista // devuelve string que no es valido.
  private autocompleteSelectionValidator(control: FormControl) {return typeof control.value === 'string' ? { incorrect: {} } : null }  

  displayFnAutoCompleteRegistro(concepto?: any): string | undefined { return concepto ? concepto.descripcion : undefined; }

  // Se utiliza para obtener el valor incial. Ej: Al editar los valores obtenidos deben mostrarse en combo materialize
  compareMedio(c1: any, c2: any): boolean { return c1 && c2 ? c1.idMedioPago === c2.idMedioPago : c1 === c2; }
  compareCuenta(c1: any, c2: any): boolean { return c1 && c2 ? c1.idCuenta === c2.idCuenta : c1 === c2; }

  // carga el detalle en autocomplete concepto registro -> segun concepto seleccionado
  getConceptoRegistroByIdConcepto(id: number) {
    this.form.controls.conceptoRegistro.setValue('');
    this.crudService.getAllBy('conceptoregistro', 'getFindByIdConcepto', id).subscribe(res => { this.db_concepto_registro = res; this.db_concepto_egreso_filter = res; });
  }
      
  
  private prepararFormulario(): void {
    this.form = this.formBuilder.group({
      imagen:'',
      monto: [this.Egreso_model.monto, Validators.required ],
      conceptoEgreso: [this.concepto_model, this.autocompleteSelectionValidator],
      conceptoRegistro: [this.Egreso_model.conceptoRegistro, this.autocompleteSelectionValidator],
      cuenta: [this.Egreso_model.cuenta, Validators.required],
      medioPago: [this.Egreso_model.medioPago, Validators.required],
      fecha: [this.fecha, Validators.required],
      sucursal: [this.usuarioModel.sucursal.descripcion, Validators.required],
      usuario: [this.usuarioModel.nombreApellido, Validators.required],
      detalles: this.Egreso_model.detalles,
      idEgreso: this.Egreso_model.idEgreso || 0
    });
    
  }

  guardarCambios() {        
    if (!this.form.valid || this.procesando) { return; }
    this.procesando = true;
    
    // evalua controles historial de modificacioness
    let historial: any = null;    
    if (this.esEdicion) { historial = this.utilitarios.soloControlesModificados(this.Egreso_model, this.form);}
    // this.datos_enviar = { 'modelo': this.Egreso_model, 'historial': historial };

    // mantiene la fecha en el formulario
    this.fecha = this.utilitarioFecha.convertir_fecha_mostrar_input(<Date>this.form.value.fecha);
    
    this.form.value.fecha = this.utilitarioFecha.preparar_fecha_enviar_servicio(this.form.value.fecha);
    this.form.value.usuario = this.usuarioModel;  
    this.form.value.sucursal = this.usuarioModel.sucursal;    
    this.Egreso_model = <Egreso> this.form.value;        
        
    this.crudService.editar(this.Egreso_model, historial, this.httpController, 'save').subscribe(res => {
      setTimeout(() => {
        if (!this.esEdicion) { this.Egreso_model = new Egreso; this.prepararFormulario(); }   
        swal(MSJ_SUCCESS);
        this.procesando = false;
      }, 800);
   });
    
  }

}
