import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { IngresosRoutingModule } from './ingresos-routing.module';
import { PageHeaderModule } from '../../shared';

import { ListaIngresosComponent } from './lista-ingresos/lista-ingresos.component';
import { CrudIngresosComponent } from './crud-ingresos/crud-ingresos.component';

import { DataTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';

import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule } from '../materialize/materialize.index';
import { CtrlAutocompleteDirective } from '../../directivas/ctrl-autocomplete.directive';

@NgModule({
    imports: [CommonModule, IngresosRoutingModule, PageHeaderModule, FormsModule, ReactiveFormsModule, NgSelectModule, DataTableModule, TableModule
        ,MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule],
    declarations: [ListaIngresosComponent, CrudIngresosComponent, CtrlAutocompleteDirective]
})
export class IngresosModule { }
