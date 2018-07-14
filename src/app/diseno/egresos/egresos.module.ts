import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { PageHeaderModule } from '../../shared';
import { EgresosRoutingModule } from './egresos-routing.module';

import { ListaEgresosComponent } from './lista-egresos/lista-egresos.component';
import { CrudEgresosComponent } from './crud-egresos/crud-egresos.component';

import { DataTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';

import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule, MatTabsModule } from '../materialize/materialize.index';
import { DirectivasModule } from '../directivas/directivas.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, EgresosRoutingModule, PageHeaderModule, NgSelectModule, DataTableModule, TableModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, 
        MatSelectModule, MatAutocompleteModule, MatTabsModule, DirectivasModule],
    declarations: [ListaEgresosComponent, CrudEgresosComponent]
})
export class EgresosModule { }
