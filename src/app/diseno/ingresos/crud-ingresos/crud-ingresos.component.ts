import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { CrudService } from '../../services/service.index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresosModule } from '../ingresos.module';
import { Usuario } from '../../usuarios/usuario.model';
import { Ingreso } from '../ingreso.model';
import { UsuariosService } from '../../usuarios/usuarios.service';
import swal from 'sweetalert2';
import { MSJ_SUCCESS } from '../../../config/config';


@Component({
  selector: 'app-crud-ingresos',
  templateUrl: './crud-ingresos.component.html',
  animations: [routerTransition()]
})
export class CrudIngresosComponent implements OnInit {
  form: FormGroup;
  
  conceptoIngresoModel: IngresosModule;
  usuarioModel: Usuario = null;

  db_concepto_ingreso: any;
  db_cuenta: any;
  db_medio_pago: any;  
  db_sucursal: any;

  constructor(
      private crudService: CrudService, 
      private usuarioService: UsuariosService,
      private formBuilder: FormBuilder) { }

  ngOnInit() {    
    this.obtenerMaestros();    
  }

  obtenerMaestros() {
    this.crudService.getAll('conceptoingreso', 'getall').subscribe(res => this.db_concepto_ingreso = res);      
    this.crudService.getAll('cuenta', 'getall').subscribe(res => this.db_cuenta = res);      
    this.crudService.getAll('mediopago', 'getall').subscribe(res => this.db_medio_pago = res);
    this.crudService.getAll('sucursal', 'getall').subscribe(res => this.db_sucursal = res);
    this.usuarioModel = this.usuarioService.getUsuario();

    this.prepararFormulario();
  }

  prepararFormulario() {
    this.form = this.formBuilder.group({      
        idIngreso: 0,
        fecha: ['', Validators.required],
        hora: '',
        montoIngresado: ['0.00', Validators.required],
        conceptoIngreso: [this.db_concepto_ingreso, Validators.required],
        cuenta: [this.db_cuenta, Validators.required],
        medioPago: [this.db_medio_pago, Validators.required],        
        sucursal:[this.usuarioModel.sucursal, Validators.required],
        usuario: [this.usuarioModel.nombreApellido, Validators.required],      
        detalles: ''          
    });
  }

  guardarCambios() {
    if ( !this.form.valid ) { return; }
    this.form.value.fecha = Date.parse(this.form.value.fecha);
    this.form.value.cuenta = JSON.parse(this.form.value.cuenta);
    this.form.value.medioPago = JSON.parse(this.form.value.medioPago);
    this.form.value.sucursal = JSON.parse(this.form.value.sucursal);

    const Ingreso_model: Ingreso = <Ingreso> this.form.value;

    this.crudService.create(Ingreso_model, 'ingreso', 'save').subscribe( res => {
      console.log(res);      
      this.prepararFormulario();
      swal(MSJ_SUCCESS);
    })
  }

}
