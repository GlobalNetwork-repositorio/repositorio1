import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AreasRoutingModule } from './areas-routing.module';
import { PageHeaderModule } from '../../shared';

import { ListaAreasComponent } from './lista-areas/lista-areas.component';
import { CrudAreasComponent } from './crud-areas/crud-areas.component';

import { DataTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';

import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule } from '../materialize/materialize.index';
import { DirectivasModule } from '../directivas/directivas.module';

@NgModule({
    imports: [CommonModule, AreasRoutingModule, PageHeaderModule, FormsModule, ReactiveFormsModule, DirectivasModule 
        , DataTableModule, TableModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule],
    declarations: [ListaAreasComponent, CrudAreasComponent]
})
export class AreasModule { }
