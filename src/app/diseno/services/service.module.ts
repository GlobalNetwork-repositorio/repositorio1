import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {    
    CrudService,    
} from './service.index';

@NgModule({
    imports: [
      CommonModule
    ],
    providers: [
      CrudService
    ],
    declarations: []
  })
  export class ServiceModule { }