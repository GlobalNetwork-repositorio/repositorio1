import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../../services/service.index';
import { MSJ_SUCCESS } from '../../../config/config';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Proveedor } from '../proveedor.model';

@Component({
  selector: 'app-crud-proveedores',
  templateUrl: './crud-proveedores.component.html',
  animations: [routerTransition()]
})
export class CrudProveedoresComponent implements OnInit {

  proveedor_model: Proveedor = new Proveedor;
  form: FormGroup;
  procesando: boolean = false;
  id: number = null;
  esEdicion: boolean = false; //si es nuevo registro limpia el formulario
  private httpModel: string = 'proveedor';

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
      razonSocial: [this.proveedor_model.razonSocial, Validators.required],
      ruc: [this.proveedor_model.ruc, Validators.required],
      direccion: [this.proveedor_model.direccion, Validators.required],
      telefono: this.proveedor_model.telefono,      
      rubroServicio: [this.proveedor_model.rubroServicio, Validators.required],
      correo: [this.proveedor_model.correo, Validators.email],
      idProveedor: this.proveedor_model.idProveedor || 0
    });
  }

  editar() {
    this.crudService.edit(this.id, this.httpModel, 'edit').subscribe(res => {
      this.proveedor_model = res;
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