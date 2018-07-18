import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CuentaBancariaRoutingModule } from './cuentabancaria-routing.module';

import { PageHeaderModule } from '../../shared';

import { ListaCuentaBancariaComponent } from './lista-cuentabancaria/lista-cuentabancaria.component';
import { CrudCuentaBancariaComponent } from './crud-cuentabancaria/crud-cuentabancaria.component';

import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule } from '../materialize/materialize.index';

import { DataTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';

import { DirectivasModule } from '../directivas/directivas.module';

@NgModule({
    imports: [CommonModule, CuentaBancariaRoutingModule, PageHeaderModule, FormsModule, ReactiveFormsModule, DirectivasModule
        , DataTableModule, TableModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule],
    declarations: [ListaCuentaBancariaComponent, CrudCuentaBancariaComponent]
})
export class CuentaBancariaModule { }
