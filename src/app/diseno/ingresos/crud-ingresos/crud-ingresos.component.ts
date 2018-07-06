import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { CrudService } from '../../services/service.index';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Usuario } from '../../usuarios/usuario.model';
import { Ingreso } from '../ingreso.model';
import { UsuariosService } from '../../usuarios/usuarios.service';
import swal from 'sweetalert2';
import { MSJ_SUCCESS } from '../../../config/config';
import { CtrlAutocompleteDirective } from '../../../directivas/ctrl-autocomplete.directive';



@Component({
  selector: 'app-crud-ingresos',
  templateUrl: './crud-ingresos.component.html',
  animations: [routerTransition()]  
})
export class CrudIngresosComponent implements OnInit {
   usuarioModel: Usuario = null;

  db_cuenta: any;
  db_concepto_ingreso: any [];
  db_medio_pago: any;  
  db_sucursal: any;
  concepto_ingreso_filter: any []; // obtiene los valores filtrado del autocomplete

  form: FormGroup;
  procesando: boolean = false;

  constructor(
      private crudService: CrudService, 
      private usuarioService: UsuariosService,
      private formBuilder: FormBuilder) { }

  ngOnInit() {    
    this.obtenerMaestros();       
  }

  setAutoCompleteDatosFiltrados(event: any): void { this.concepto_ingreso_filter = event; }
  // muestra en el input la descripcion del objeto Concepto se utiliza con [displayWith]="displayFn" en mat-autocomplete // sino obtendriamos [Object, Object]
  displayFnAutoComplete(concepto?: any): string | undefined { return concepto ? concepto.descripcion : undefined; }
  // Validators.required // valida lo escrito en el autocomplete, si no selecciona ningun opcion de la lista // devuelve string que no es valido.
  private autocompleteSelectionValidator(control: FormControl) { return typeof control.value === 'string' ? { incorrect: {} } : null }

  private obtenerMaestros(): void {
    this.crudService.getAll('conceptoingreso', 'getall').subscribe(res => { this.db_concepto_ingreso = res; this.concepto_ingreso_filter=res;});
    this.crudService.getAll('cuenta', 'getall').subscribe(res => this.db_cuenta = res);      
    this.crudService.getAll('mediopago', 'getall').subscribe(res => this.db_medio_pago = res);
    this.crudService.getAll('sucursal', 'getall').subscribe(res => this.db_sucursal = res);
    this.usuarioModel = this.usuarioService.getUsuario();
    
    this.prepararFormulario();
  }

  private prepararFormulario(): void {
    this.concepto_ingreso_filter = this.db_concepto_ingreso;
    this.form = this.formBuilder.group({      
        idIngreso: 0,
        fecha: ['', Validators.required],
        hora: '',
        montoIngresado: ['', Validators.required],
        conceptoIngreso: ['', this.autocompleteSelectionValidator],
        cuenta: [this.db_cuenta, Validators.required],
        medioPago: [this.db_medio_pago, Validators.required],        
        sucursal:[this.usuarioModel.sucursal, Validators.required],
        usuario: [this.usuarioModel.nombreApellido, Validators.required],      
        detalles: ''          
    });
  }

  guardarCambios(): void {
    if (!this.form.valid || this.procesando) { return; }    
    this.procesando = true;

    this.form.value.fecha = Date.parse(this.form.value.fecha);
    this.form.value.usuario = this.usuarioModel;    

    console.log(this.form.value);
    const Ingreso_model: Ingreso = <Ingreso> this.form.value;

    this.crudService.create(Ingreso_model, 'ingreso', 'save').subscribe( res => {
      setTimeout(() => {
        this.prepararFormulario();
        swal(MSJ_SUCCESS);
        this.procesando = false;
      }, 800);            
    })
  }

}
