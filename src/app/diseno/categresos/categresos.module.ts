import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CatEgresosRoutingModule } from './categresos-routing.module';
// import { CatEgresosComponent } from './categresos.component';
import { PageHeaderModule } from '../../shared';


import { CrudCatEgresosComponent } from './crud-categresos/crud-categresos.component';
import { ListaCatEgresosComponent } from './lista-categresos/lista-categresos.component';

import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule, MatTabsModule, MatIconModule } from '../materialize/materialize.index';

import { DataTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { MainComponent } from './main/main.component';
import { DirectivasModule } from '../directivas/directivas.module';


@NgModule({
    imports: [CommonModule, CatEgresosRoutingModule, PageHeaderModule, DirectivasModule, FormsModule, ReactiveFormsModule
        , DataTableModule, TableModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule, MatTabsModule, MatIconModule],
    declarations: [CrudCatEgresosComponent, ListaCatEgresosComponent, MainComponent]
})
export class CatEgresosModule { }
