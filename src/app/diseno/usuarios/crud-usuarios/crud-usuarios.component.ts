import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../../services/service.index';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { MSJ_SUCCESS } from '../../../config/config';
import { Usuario } from '../usuario.model';


@Component({
  selector: 'app-crud-usuarios',
  templateUrl: './crud-usuarios.component.html',  
  animations: [routerTransition()]
})
export class CrudUsuariosComponent implements OnInit {

  usuario_model: Usuario = new Usuario;
  db_sucursal: any;
  db_area: any;
  form: FormGroup;
  procesando: boolean = false;
  id: number = null;

  
  private esEdicion: boolean = false; //si es nuevo registro limpia el formulario
  private httpModel: string = 'usuario';  

  constructor(
    private crudService: CrudService,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute
  ) {
    this.activateRoute.params.subscribe(
      params => this.id = params['id']);
  }

  ngOnInit() {
    this.maestros();        
    if (this.id) { this.editar(); this.esEdicion = true; }

    this.prepararFormulario();
  }

  private maestros(): void {
    this.crudService.getAll('sucursal','getall').subscribe(res => this.db_sucursal = res);
    this.crudService.getAll('area', 'getall').subscribe(res => this.db_area = res);
  }

  private prepararFormulario(): void {
      

    this.form = this.formBuilder.group  ({
      nombreApellido: [this.usuario_model.nombreApellido, Validators.required],
      direccion: [this.usuario_model.direccion, Validators.required],
      telefono: [this.usuario_model.telefono, Validators.required],      
      fechaNacimiento: [this.usuario_model.fechaNacimiento],
      fechaIngreso: [this.usuario_model.fechaIngreso, Validators.required],
      sucursal: [this.usuario_model.sucursal, Validators.required],
      area: [this.usuario_model.area, Validators.required],
      usuario: [this.usuario_model.usuario, Validators.required],
      contrasena: [this.usuario_model.contrasena, Validators.required],
      idUsuario: this.usuario_model.idUsuario || 0
    });   
  }

  private editar(): void {
    this.crudService.edit(this.id, this.httpModel, 'edit').subscribe(res => {
      this.usuario_model = res;               
      this.usuario_model.fechaNacimiento = this.usuario_model.fechaNacimiento ? this.crudService.deStringToDate(this.usuario_model.fechaNacimiento.toString()) : null
      this.usuario_model.fechaIngreso = this.usuario_model.fechaIngreso ? this.crudService.deStringToDate(this.usuario_model.fechaIngreso.toString()) : null      
      this.prepararFormulario();
    });
  }

  // Se utiliza para obtener el valor incial. Ej: Al editar los valores obtenidos deben mostrarse en combo materialize
  compareSucursal(c1: any, c2: any): boolean { return c1 && c2 ? c1.idSucursal === c2.idSucursal : c1 === c2; }
  compareArea(c1: any, c2: any): boolean { return c1 && c2 ? c1.idArea === c2.idArea : c1 === c2; }

  guardarCambios(): void {
    if (!this.form.valid || this.procesando) { return; }
    this.procesando = true;
    
    this.form.value.fechaNacimiento = this.crudService.deStringToDate(this.form.value.fechaNacimiento,'dd/mm/yyyy'); // cambia el formato de la fecha el servicio espera "dd/mm/yyyy"
    this.form.value.fechaIngreso = this.crudService.deStringToDate(this.form.value.fechaIngreso, 'dd/mm/yyyy');    

    this.crudService.create(this.form.value, this.httpModel, 'save').subscribe(res => {
      setTimeout(() => {
        if (!this.esEdicion) { this.prepararFormulario(); }
        swal(MSJ_SUCCESS); this.procesando = false;
      }, 800);
    });

  }
}




 
