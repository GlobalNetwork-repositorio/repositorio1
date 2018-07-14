import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../../services/service.index';
import { MSJ_SUCCESS } from '../../../config/config';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-crud-areas',
  templateUrl: './crud-areas.component.html',
  animations: [routerTransition()]
})
export class CrudAreasComponent implements OnInit {

  form: FormGroup;
  procesando: boolean = false;
  id: number = null;

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
    if( this.id ) {
      this.editar();
    }
  }

  private prepararFormulario(): void {
    this.form = this.formBuilder.group({
      descripcion: ['', Validators.required],      
      idArea: 0
    });
  }

  editar() {
    this.crudService.edit(this.id,'area','edit').subscribe(res => {
      this.form = res;
      console.log('res',res);
      console.log('form', this.form);
    });
  }

  guardarCambios() {
    if (!this.form.valid || this.procesando) { return; }
    this.procesando = true;
      
    console.log(this.form.value);

    this.crudService.create(this.form.value, 'area', 'save').subscribe(res => {
      console.log('servidor', res);
      setTimeout(() => {
        this.prepararFormulario();
        swal(MSJ_SUCCESS); this.procesando = false;
      }, 800);
    });

  }
}