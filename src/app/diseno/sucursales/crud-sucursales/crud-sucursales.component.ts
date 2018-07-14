import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../../services/service.index';
import { MSJ_SUCCESS } from '../../../config/config';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Sucursal } from '../sucursal.model';

@Component({
  selector: 'app-crud-sucursales',
  templateUrl: './crud-sucursales.component.html',
  animations: [routerTransition()]
})
export class CrudSucursalesComponent implements OnInit {

  sucursal_model: Sucursal = new Sucursal;
  form: FormGroup;
  procesando: boolean = false;
  id: number = null;
  esEdicion: boolean = false; //si es nuevo registro limpia el formulario
  private httpModel: string = 'sucursal';

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
    if (this.id) { this.editar(); this.esEdicion = true;}
  }

  private prepararFormulario(): void {
    this.form = this.formBuilder.group({
      descripcion: [this.sucursal_model.descripcion, Validators.required],
      direccion: [this.sucursal_model.direccion, Validators.required],
      telefono: this.sucursal_model.telefono,
      correo: [this.sucursal_model.correo, Validators.email],
      idSucursal: this.sucursal_model.idSucursal || 0
    });
  }

  editar() {
    this.crudService.edit(this.id, this.httpModel, 'edit').subscribe(res => {
      this.sucursal_model = res;      
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
