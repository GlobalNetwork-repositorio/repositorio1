import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { 
    MatAutocompleteModule, 
    MatInputModule, 
    MatDatepickerModule,
    MatNativeDateModule, 
    MatSelectModule, 
    MatTabsModule} from './materialize.index';


@NgModule({
    imports: [
      CommonModule
    ],
    providers: [
        MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule, MatTabsModule
    ],
    declarations: []
  })
  export class MaterializeModule { }