import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreasRoutingModule } from './areas-routing.module';
// import { AreasComponent } from './areas.component';
import { PageHeaderModule } from '../../shared';
import { ListaAreasComponent } from './lista-areas/lista-areas.component';
import { CrudAreasComponent } from './crud-areas/crud-areas.component';

import { DataTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';

import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule } from '../materialize/materialize.index';

@NgModule({
    imports: [CommonModule, AreasRoutingModule, PageHeaderModule , DataTableModule, TableModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule],
    declarations: [ListaAreasComponent, CrudAreasComponent]
})
export class AreasModule { }
