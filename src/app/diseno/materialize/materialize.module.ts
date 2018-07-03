import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { 
    MatAutocompleteModule, 
    MatInputModule, 
    MatDatepickerModule,
    MatNativeDateModule, 
    MatSelectModule } from './materialize.index';


@NgModule({
    imports: [
      CommonModule
    ],
    providers: [
        MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule
    ],
    declarations: []
  })
  export class MaterializeModule { }