import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {    
    CrudService,
    Utilitarios, 
    UtilitariosFecha
} from './service.index';

@NgModule({
    imports: [
      CommonModule
    ],
    providers: [
      CrudService,
      Utilitarios, 
      UtilitariosFecha
    ],
    declarations: [
     // CtrlAutocompleteDirective
    ]
  })
  export class ServiceModule { }