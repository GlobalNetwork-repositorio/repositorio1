import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { CrudService } from '../../services/service.index';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Egreso } from '../../egresos/egreso.model';
import { Cuenta } from '../../cuentabancaria/cuenta.model';
import { MedioPago } from '../../tipopago/medio.pago.model';
import { conceptoEgreso } from '../../categresos/concepto.egreso.model';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { Usuario } from '../../usuarios/usuario.model';
import swal from 'sweetalert2';
import { MSJ_SUCCESS } from '../../../config/config';
import { debounceTime, map } from 'rxjs/operators';


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
  // MedioPago_model: MedioPago;
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

  ngAfterViewInit() {
    // buscar en motivo, concepto de ingreso es un autcomplete
    // captura cambios en el control y los mapea por descripcion y busca sus conicidencias // muestra solo los primeros 5 resultados        
    this.form.controls.conceptoEgreso.valueChanges
      .pipe(debounceTime(200), map(value => typeof value === 'string' ? value : value.descripcion))
      .subscribe((val: string) => {
        val = val.toLocaleLowerCase();
        this.db_concepto_egreso_filter = this.db_concepto_egreso.filter((x: any) => x.descripcion.toLocaleLowerCase().indexOf(val) !== -1).slice(0, 5)
      });
  }
  
  // muestra en el input la descripcion del objeto Concepto se utiliza con [displayWith]="displayFn" en mat-autocomplete // sino obtendriamos [Object, Object]
  displayFn(concepto?: any): string | undefined { return concepto ? concepto.descripcion : undefined; }


  // valida lo escrito en el autocomplete, si no selecciona ningun opcion de la lista
  // devuelve string que no es valido.
  private autocompleteSelectionValidator(control: FormControl) {
    return typeof control.value === 'string' ? { incorrect: {} } : null
  }
  prepararFormulario() {
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
    // console.log('egreso model ', this.Egreso_model);   
    if (!this.form.valid || this.procesando) { return; }
    this.procesando = true;

    this.form.value.fecha = Date.parse(this.form.value.fecha);
    this.form.value.usuario = this.usuarioModel;
    // this.form.value.sucursal = JSON.parse(this.form.value.sucursal)
    // this.form.value.cuenta = JSON.parse(this.form.value.cuenta)
    // this.form.value.medioPago = JSON.parse(this.form.value.medioPago)
    // this.form.value.sucursal = this.usuarioModel.sucursal;

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
