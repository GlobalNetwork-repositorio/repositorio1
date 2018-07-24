import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { CrudService, UtilitariosFecha, Utilitarios } from '../../services/service.index';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Usuario } from '../../usuarios/usuario.model';
import { Ingreso } from '../ingreso.model';
import { UsuariosService } from '../../usuarios/usuarios.service';
import swal from 'sweetalert2';
import { MSJ_SUCCESS } from '../../../config/config';
import { Concepto } from '../../categresos/concepto.model';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-crud-ingresos',
  templateUrl: './crud-ingresos.component.html',
  animations: [routerTransition()]  
})
export class CrudIngresosComponent implements OnInit {
  

  db_cuenta: any;  
  db_medio_pago: any;  
  db_sucursal: any;

  db_concepto_ingreso: any[];
  db_concepto_registro: any[];
  db_concepto_ingreso_filter: any[]; // obtiene los valores filtrado del autocomplete
  db_concepto_registro_filter: any[]; // obtiene los valores filtrado del autocomplete

  datos_enviar: any = [];// datos que se envian al servicio

  ingreso_model: Ingreso = new Ingreso;
  usuario_model: Usuario;
  concepto_model: Concepto = new Concepto;

  form: FormGroup;
  procesando: boolean = false;

  fecha: string | Date = new Date;
  id: number = null;
  private esEdicion: boolean = false; //si es nuevo registro limpia el formulario
  private httpController: string = 'ingreso';  

  constructor(
      private crudService: CrudService, 
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


  setAutoCompleteDatosFiltradosRegistro(event: any): void { this.db_concepto_registro_filter = event; }
  setAutoCompleteDatosFiltrados(event: any): void { this.db_concepto_ingreso_filter = event; }
  // muestra en el input la descripcion del objeto Concepto se utiliza con [displayWith]="displayFn" en mat-autocomplete // sino obtendriamos [Object, Object]
  displayFnAutoComplete(concepto?: any): string | undefined { return concepto ? concepto.descripcion : undefined; }
  // Validators.required // valida lo escrito en el autocomplete, si no selecciona ningun opcion de la lista // devuelve string que no es valido.
  private autocompleteSelectionValidator(control: FormControl) { return typeof control.value === 'string' ? { incorrect: {} } : null }

  displayFnAutoCompleteRegistro(concepto?: any): string | undefined { return concepto ? concepto.descripcion : undefined; }

  // Se utiliza para obtener el valor incial. Ej: Al editar los valores obtenidos deben mostrarse en combo materialize
  compareMedio(c1: any, c2: any): boolean { return c1 && c2 ? c1.idMedioPago === c2.idMedioPago : c1 === c2; }
  compareCuenta(c1: any, c2: any): boolean { return c1 && c2 ? c1.idCuenta === c2.idCuenta : c1 === c2; }

  // carga el detalle en autocomplete concepto registro -> segun concepto seleccionado
  getConceptoRegistroByIdConcepto(id: number) {
    this.form.controls.conceptoRegistro.setValue('');
    this.crudService.getAllBy('conceptoregistro', 'getFindByIdConcepto', id).subscribe(res => { this.db_concepto_registro = res; this.db_concepto_registro_filter = res; });
  }
  
  
  private maestros(): void {
    //this.crudService.getAll('conceptoingreso', 'getall').subscribe(res => { this.db_concepto_ingreso = res; this.db_concepto_ingreso_filter=res;});
    // this.crudService.getAll('sucursal', 'getall').subscribe(res => this.db_sucursal = res);
    this.crudService.getAll('cuenta', 'getall').subscribe(res => this.db_cuenta = res);
    this.crudService.getAll('mediopago', 'getall').subscribe(res => this.db_medio_pago = res);
    this.crudService.getAllBy('concepto', 'getFindByTipoRubro', 1).subscribe(res => { this.db_concepto_ingreso = res; this.db_concepto_ingreso_filter = res;});
    this.usuario_model = this.usuarioService.getUsuario();    
    // this.prepararFormulario();
  }

  editar() {
    this.crudService.edit(this.id, this.httpController, 'edit').subscribe(res => {
      this.ingreso_model = res;
      this.fecha = this.crudService.deStringToDate(this.ingreso_model.fecha.toString());
      this.usuario_model = this.ingreso_model.usuario;
      this.concepto_model = this.ingreso_model.conceptoRegistro.concepto;

      this.prepararFormulario();
    });
  }

  private prepararFormulario(): void {
    this.db_concepto_ingreso_filter = this.db_concepto_ingreso;
    this.form = this.formBuilder.group({      
        idIngreso: this.ingreso_model.idIngreso || 0,
        fecha: [this.fecha, Validators.required],        
        montoIngresado: [this.ingreso_model.montoIngresado, Validators.required],
        conceptoIngreso: [this.concepto_model, this.autocompleteSelectionValidator],
        conceptoRegistro: [this.ingreso_model.conceptoRegistro, this.autocompleteSelectionValidator],
      cuenta: [this.ingreso_model.cuenta, Validators.required],
        medioPago: [this.ingreso_model.medioPago, Validators.required],        
        sucursal: [this.usuario_model.sucursal.descripcion, Validators.required],
        usuario: [this.usuario_model.nombreApellido, Validators.required],      
        detalles: this.ingreso_model.detalles          
    });
  }

  guardarCambios(): void {
    if (!this.form.valid || this.procesando) { return; }    
    this.procesando = true;

    // evalua controles historial de modificacioness
    let historial: any = null;
    if (this.esEdicion) { historial = this.utilitarios.soloControlesModificados(this.ingreso_model, this.form); }
    //this.datos_enviar = { 'modelo': this.ingreso_model, 'historial': historial };

    // mantiene la fecha en el formulario
    this.fecha = this.utilitarioFecha.convertir_fecha_mostrar_input(<Date>this.form.value.fecha);

    this.form.value.fecha = this.utilitarioFecha.preparar_fecha_enviar_servicio(this.form.value.fecha);
    this.form.value.usuario = this.usuario_model;
    this.form.value.sucursal = this.usuario_model.sucursal;    
    this.ingreso_model = <Ingreso> this.form.value;    

    this.crudService.editar(this.ingreso_model, historial , this.httpController, 'save').subscribe( res => {
      setTimeout(() => {
        if (!this.esEdicion) { this.ingreso_model = new Ingreso; this.prepararFormulario(); }
        swal(MSJ_SUCCESS);
        this.procesando = false;
      }, 800);            
    })
  }

}
