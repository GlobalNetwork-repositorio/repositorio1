import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { CrudService } from '../../services/service.index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Egreso } from '../../egresos/egreso.model';
import { Cuenta } from '../../cuentabancaria/cuenta.model';
import { MedioPago } from '../../tipopago/medio.pago.model';
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
  db_concepto_egreso:any;
  db_sucursal: any;

  
  Egreso_model: Egreso;
  usuarioModel: Usuario;
  Cuenta_model: Cuenta;  
  // MedioPago_model: MedioPago;
  MedioPago_model: any;
  ConceptoEgreso_model: conceptoEgreso;  

  form: FormGroup;
  date: Date = new Date();

  constructor( 
      private crudService: CrudService, 
      private usuarioService: UsuariosService,
      private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.crudService.getAll('mediopago', 'getall').subscribe( res => this.MedioPago_model = res );
    this.crudService.getAll('cuenta', 'getall').subscribe( res => {this.db_cuenta_origen = res;});    
    this.crudService.getAll('conceptoegreso', 'getall').subscribe( res => this.db_concepto_egreso = res);
    this.crudService.getAll('sucursal', 'getall').subscribe( res => this.db_sucursal = res);
    this.usuarioModel = this.usuarioService.getUsuario();    
    this.prepararFormulario();
  }

  prepararFormulario() {
    this.form = this.formBuilder.group({      
      imagen:'',
      monto:150.0,
      conceptoEgreso:this.db_concepto_egreso,
      cuenta:this.db_cuenta_origen,
      medioPago:this.MedioPago_model,      
      fecha: null,
      sucursal:null,
      usuario: this.usuarioModel.nombreApellido,      
      detalles: '',
      idEgreso:0
    });
  }

  aaa(){    
    console.log(this.usuarioModel);
  }

  guardarCambios() {        
    // console.log('egreso model ', this.Egreso_model);    
    this.form.value.fecha = Date.parse(this.form.value.fecha);
    this.form.value.sucursal = JSON.parse(this.form.value.sucursal)
    this.form.value.cuenta = JSON.parse(this.form.value.cuenta)
    this.form.value.medioPago = JSON.parse(this.form.value.medioPago)
    this.form.value.usuario = this.usuarioModel;
    this.form.value.sucursal = this.usuarioModel.sucursal;

    this.Egreso_model = <Egreso> this.form.value;
    console.log(JSON.stringify(this.form.value));
    console.log(this.form.value);


    this.crudService.create(this.Egreso_model,'egreso','save').subscribe( res => {
      console.log('servidor', res);
      this.prepararFormulario();      
      swal(MSJ_SUCCESS);
   });
    
  }

}
