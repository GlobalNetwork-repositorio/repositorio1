import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { CrudService } from '../../services/service.index';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Egreso } from '../../egresos/egreso.model';
import { conceptoEgreso } from '../../categresos/concepto.egreso.model';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { Usuario } from '../../usuarios/usuario.model';
import swal from 'sweetalert2';
import { MSJ_SUCCESS } from '../../../config/config';


@Component({
  selector: 'app-crud-egresos',
  templateUrl: './crud-egresos.component.html',  
  animations: [routerTransition()]  
})
export class CrudEgresosComponent implements OnInit {

  db_cuenta_origen: any;
  db_medio_pago: any;
  db_concepto_egreso:any [];
  db_sucursal: any;  
  db_concepto_egreso_filter: any[]; // obtiene los valores filtrado del autocomplete

  
  Egreso_model: Egreso;
  usuarioModel: Usuario;   
  MedioPago_model: any;
  ConceptoEgreso_model: conceptoEgreso;  

  form: FormGroup;  
  procesando: boolean = false;

  constructor( 
      private crudService: CrudService, 
      private usuarioService: UsuariosService,
      private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.crudService.getAll('mediopago', 'getall').subscribe( res => this.db_medio_pago = res );
    this.crudService.getAll('cuenta', 'getall').subscribe( res => {this.db_cuenta_origen = res;});    
    this.crudService.getAll('conceptoegreso', 'getall').subscribe(res => { this.db_concepto_egreso = res; this.db_concepto_egreso_filter = res});
    this.crudService.getAll('sucursal', 'getall').subscribe( res => this.db_sucursal = res);
    this.usuarioModel = this.usuarioService.getUsuario();    
    this.prepararFormulario();
  }

  setAutoCompleteDatosFiltrados( event: any ): void { this.db_concepto_egreso_filter = event; }
  // muestra en el input la descripcion del objeto Concepto se utiliza con [displayWith]="displayFn" en mat-autocomplete // sino obtendriamos [Object, Object]
  displayFnAutoComplete(concepto?: any): string | undefined { return concepto ? concepto.descripcion : undefined; }
  // Validators.required // valida lo escrito en el autocomplete, si no selecciona ningun opcion de la lista // devuelve string que no es valido.
  private autocompleteSelectionValidator(control: FormControl) {return typeof control.value === 'string' ? { incorrect: {} } : null }
    
  
  private prepararFormulario(): void {
    this.form = this.formBuilder.group({      
      imagen:'',
      monto:[ '', Validators.required ],
      conceptoEgreso: ['', this.autocompleteSelectionValidator],
      cuenta:[this.db_cuenta_origen, Validators.required],
      medioPago:[this.MedioPago_model, Validators.required],      
      fecha: [null, Validators.required],
      sucursal:[null, Validators.required],
      usuario: [this.usuarioModel.nombreApellido, Validators.required],
      detalles: '',
      idEgreso:0
    });
  }

  guardarCambios() {        
    if (!this.form.valid || this.procesando) { return; }
    this.procesando = true;

    this.form.value.fecha = Date.parse(this.form.value.fecha);
    this.form.value.usuario = this.usuarioModel;
  
    this.Egreso_model = <Egreso> this.form.value;
    console.log(JSON.stringify(this.form.value));
    console.log(this.form.value);


    this.crudService.create(this.Egreso_model,'egreso','save').subscribe( res => {
      console.log('servidor', res);
      setTimeout(() => {
        this.prepararFormulario();      
        swal(MSJ_SUCCESS);
        this.procesando = false;
      }, 800);
   });
    
  }

}
