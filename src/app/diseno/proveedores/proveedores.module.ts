import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { PageHeaderModule } from '../../shared';

import { ListaProveedoresComponent } from './lista-proveedores/lista-proveedores.component';
import { CrudProveedoresComponent } from './crud-proveedores/crud-proveedores.component';

import { DataTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';

import { DirectivasModule } from '../directivas/directivas.module';

import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule } from '../materialize/materialize.index';

@NgModule({
    imports: [CommonModule, ProveedoresRoutingModule, DirectivasModule, PageHeaderModule, FormsModule, ReactiveFormsModule
        , DataTableModule, TableModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule],
    declarations: [ListaProveedoresComponent, CrudProveedoresComponent]
})
export class ProveedoresModule { }
