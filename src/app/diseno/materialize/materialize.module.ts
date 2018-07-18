import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { 
    MatAutocompleteModule, 
    MatInputModule, 
    MatDatepickerModule,
    MatNativeDateModule, 
    MatSelectModule, 
    MatTabsModule,
    MatIconModule} from './materialize.index';


@NgModule({
    imports: [
      CommonModule
     // BrowserAnimationsModule
    ],
    providers: [
        MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule, MatTabsModule,
        MatIconModule
    ],
    declarations: []
  })
  export class MaterializeModule { }