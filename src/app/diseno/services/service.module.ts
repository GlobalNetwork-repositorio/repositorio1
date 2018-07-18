import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {    
    CrudService,
  Utilitarios
} from './service.index';

@NgModule({
    imports: [
      CommonModule
    ],
    providers: [
      CrudService,
      Utilitarios
    ],
    declarations: [
     // CtrlAutocompleteDirective
    ]
  })
  export class ServiceModule { }