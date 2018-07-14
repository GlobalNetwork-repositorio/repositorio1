import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatIngresosRoutingModule } from './catingresos-routing.module';
import { PageHeaderModule } from '../../shared';

import { ListaCatIngresosComponent } from './lista-catingresos/lista-catingresos.component';
import { CrudCatIngresosComponent } from './crud-catingresos/crud-catingresos.component';

import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule } from '../materialize/materialize.index';

import { DataTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';

@NgModule({
    imports: [CommonModule, CatIngresosRoutingModule, PageHeaderModule
        , DataTableModule, TableModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule],
    declarations: [ListaCatIngresosComponent, CrudCatIngresosComponent]
})
export class CatIngresosModule { }
