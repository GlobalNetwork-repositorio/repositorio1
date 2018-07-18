import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../../services/service.index';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { MSJ_SUCCESS } from '../../../config/config';
import { Cuenta } from '../cuenta.model';
// import { Usuario } from '../usuario.model';


@Component({
  selector: 'app-crud-cuentabancaria',
  templateUrl: './crud-cuentabancaria.component.html',
  animations: [routerTransition()]
})
export class CrudCuentaBancariaComponent implements OnInit {

  cuenta_model: Cuenta = new Cuenta;
  db_sucursal: any;
  db_area: any;
  form: FormGroup;
  procesando: boolean = false;
  id: number = null;

  private esEdicion: boolean = false; //si es nuevo registro limpia el formulario
  private httpModel: string = 'cuenta';  

  constructor(
    private crudService: CrudService,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute
  ) {
    this.activateRoute.params.subscribe(
      params => this.id = params['id']);
  }

  ngOnInit() {
    this.prepararFormulario();
    if (this.id) { this.editar(); this.esEdicion = true; }
  }

  private prepararFormulario(): void {
    this.form = this.formBuilder.group({
      banco: [this.cuenta_model.banco, Validators.required],
      numeroCuenta: [this.cuenta_model.numeroCuenta, Validators.required],
      tipoCuenta: [this.cuenta_model.tipoCuenta, Validators.required],
      titularCuenta: this.cuenta_model.titularCuenta,      
      idCuenta: this.cuenta_model.idCuenta || 0
    });
  }

  editar() {
    this.crudService.edit(this.id, this.httpModel, 'edit').subscribe(res => {
      this.cuenta_model = res;
      this.prepararFormulario();
    });
  }

  guardarCambios() {
    if (!this.form.valid || this.procesando) { return; }
    this.procesando = true;
    console.log('formulario envia', this.form.value);
    this.crudService.create(this.form.value, this.httpModel, 'save').subscribe(res => {
      setTimeout(() => {
        if (!this.esEdicion) { this.prepararFormulario(); }
        swal(MSJ_SUCCESS); this.procesando = false;
      }, 800);
    });

  }
 

}
