import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { CrudService } from '../../services/service.index';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IngresosModule } from '../ingresos.module';
import { Usuario } from '../../usuarios/usuario.model';
import { Ingreso } from '../ingreso.model';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { debounceTime, startWith, map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { MSJ_SUCCESS } from '../../../config/config';
import { Observable } from 'rxjs';
import { conceptoIngreso } from '../../catingresos/concepto.ingreso.model';


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

  ngAfterViewInit() {
    // buscar en motivo, concepto de ingreso es un autcomplete
    // captura cambios en el control y los mapea por descripcion y busca sus conicidencias // muestra solo los primeros 5 resultados        
    this.form.controls.conceptoIngreso.valueChanges
      .pipe( debounceTime(200), map(value => typeof value === 'string' ? value : value.descripcion))
      .subscribe((val: string) => {
        val = val.toLocaleLowerCase();
        this.concepto_ingreso_filter = this.db_concepto_ingreso.filter((x: any) => x.descripcion.toLocaleLowerCase().indexOf(val) !== -1).slice(0, 5)
      });
  }
  
  // muestra en el input la descripcion del objeto Concepto se utiliza con [displayWith]="displayFn" en mat-autocomplete // sino obtendriamos [Object, Object]
  displayFn(concepto?: any): string | undefined { return concepto ? concepto.descripcion : undefined;}
  
  
  // valida lo escrito en el autocomplete, si no selecciona ningun opcion de la lista
  // devuelve string que no es valido.
  private autocompleteSelectionValidator(control: FormControl) {
    return typeof control.value === 'string' ? { incorrect: {} } : null
  }


  obtenerMaestros() {
    this.crudService.getAll('conceptoingreso', 'getall').subscribe(res => { this.db_concepto_ingreso = res; this.concepto_ingreso_filter=res;});
    this.crudService.getAll('cuenta', 'getall').subscribe(res => this.db_cuenta = res);      
    this.crudService.getAll('mediopago', 'getall').subscribe(res => this.db_medio_pago = res);
    this.crudService.getAll('sucursal', 'getall').subscribe(res => this.db_sucursal = res);
    this.usuarioModel = this.usuarioService.getUsuario();
    
    this.prepararFormulario();
  }

  prepararFormulario() {
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

  guardarCambios() {
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
