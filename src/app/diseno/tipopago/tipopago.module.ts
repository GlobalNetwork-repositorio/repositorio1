import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TipoPagoRoutingModule } from './tipopago-routing.module';
import { PageHeaderModule } from '../../shared';

import { ListaTipoPagoComponent } from './lista-tipopago/lista-tipopago.component';
import { CrudTipoPagoComponent } from './crud-tipo-pago/crud-tipo-pago.component';

import { DataTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';

import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule } from '../materialize/materialize.index';
import { DirectivasModule } from '../directivas/directivas.module';

@NgModule({
    imports: [CommonModule, TipoPagoRoutingModule, PageHeaderModule, FormsModule, ReactiveFormsModule, DirectivasModule
        , DataTableModule, TableModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule],
    declarations: [ListaTipoPagoComponent, CrudTipoPagoComponent]
})
export class TipoPagoModule { }
