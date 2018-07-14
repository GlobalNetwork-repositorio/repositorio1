import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatEgresosRoutingModule } from './categresos-routing.module';
// import { CatEgresosComponent } from './categresos.component';
import { PageHeaderModule } from '../../shared';


import { CrudCatEgresosComponent } from './crud-categresos/crud-categresos.component';
import { ListaCatEgresosComponent } from './lista-categresos/lista-categresos.component';

import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule } from '../materialize/materialize.index';

import { DataTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';


@NgModule({
    imports: [CommonModule, CatEgresosRoutingModule, PageHeaderModule
        , DataTableModule, TableModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule],
    declarations: [CrudCatEgresosComponent, ListaCatEgresosComponent]
})
export class CatEgresosModule { }
