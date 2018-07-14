// import { EgresosComponent } from './egresos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../shared';

import { ListaEgresosComponent } from './lista-egresos/lista-egresos.component';
import { CrudEgresosComponent } from './crud-egresos/crud-egresos.component';

const routes: Routes = [
    { path: '', component: ListaEgresosComponent ,
        children: [
            { path: 'crud-egresos', component: CrudEgresosComponent }
        ]
    }    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]    
})
export class EgresosRoutingModule {}
