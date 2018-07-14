import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../../services/crud.service';
import swal from 'sweetalert2';
import { MSJ_SUCCESS } from '../../../config/config';

@Component({
  selector: 'app-crud-tipo-pago',
  templateUrl: './crud-tipo-pago.component.html',  
  animations: [routerTransition()]
})
export class CrudTipoPagoComponent implements OnInit {

  form: FormGroup;
  procesando: boolean = false;  

  constructor(
    private crudService: CrudService,
    private formBuilder: FormBuilder    
  ) {    
  }

  ngOnInit() {
    this.prepararFormulario();
  }

  private prepararFormulario(): void {
    this.form = this.formBuilder.group({
      descripcionMedioPago: ['', Validators.required],
      idMedioPago: 0
    });
  }

  
  guardarCambios() {
    if (!this.form.valid || this.procesando) { return; }
    this.procesando = true;

    console.log(this.form.value);

    this.crudService.create(this.form.value, 'mediopago', 'save').subscribe(res => {
      console.log('servidor', res);
      setTimeout(() => {
        this.prepararFormulario();
        swal(MSJ_SUCCESS); this.procesando = false;
      }, 800);
    });

  }
}
