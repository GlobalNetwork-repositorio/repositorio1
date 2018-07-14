import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SucursalesRoutingModule } from './sucursales-routing.module';
import { PageHeaderModule } from '../../shared';

import { ListaSucursalesComponent } from './lista-sucursales/lista-sucursales.component';
import { CrudSucursalesComponent } from './crud-sucursales/crud-sucursales.component';

import { DataTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';

import { DirectivasModule } from '../directivas/directivas.module';

import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule } from '../materialize/materialize.index';

@NgModule({
    imports: [CommonModule, SucursalesRoutingModule, DirectivasModule, PageHeaderModule, FormsModule, ReactiveFormsModule
        , DataTableModule, TableModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule],
    declarations: [ListaSucursalesComponent, CrudSucursalesComponent]
})
export class SucursalesModule { }
