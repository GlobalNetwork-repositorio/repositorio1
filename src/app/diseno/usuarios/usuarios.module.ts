import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { PageHeaderModule } from '../../shared';

import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { CrudUsuariosComponent } from './crud-usuarios/crud-usuarios.component';

import { DataTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';

import { DirectivasModule } from '../directivas/directivas.module';

import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule } from '../materialize/materialize.index';

// { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, 

@NgModule({
    imports: [CommonModule, UsuariosRoutingModule, DirectivasModule, PageHeaderModule, FormsModule, ReactiveFormsModule
        , DataTableModule, TableModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule],
    declarations: [ListaUsuariosComponent, CrudUsuariosComponent]    
})
export class UsuariosModule { }
