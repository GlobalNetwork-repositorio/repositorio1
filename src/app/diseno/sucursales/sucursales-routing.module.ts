// import { SucursalesComponent } from './sucursales.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../shared';

import { ListaSucursalesComponent } from './lista-sucursales/lista-sucursales.component';
import { CrudSucursalesComponent } from './crud-sucursales/crud-sucursales.component';


const routes: Routes = [
    { path: '', component: ListaSucursalesComponent,
        children: [{ path: 'crud-sucursales', component: CrudSucursalesComponent}]
    }    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SucursalesRoutingModule {}
