import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisenoComponent } from './diseno.component';
// import { CtrlAutocompleteDirective } from './directivas/ctrl-autocomplete.directive';


const routes: Routes = [
    {
        path: '',
        component: DisenoComponent,
        children: [
            { path: '', redirectTo: 'inicio' },
            { path: 'inicio', loadChildren: './inicio/inicio.module#InicioModule' },
            { path: 'ingresos', loadChildren: './ingresos/ingresos.module#IngresosModule' },
            { path: 'egresos', loadChildren: './egresos/egresos.module#EgresosModule' },
            { path: 'areas', loadChildren: './areas/areas.module#AreasModule' },
            { path: 'categresos', loadChildren: './categresos/categresos.module#CatEgresosModule' },
            { path: 'catingresos', loadChildren: './catingresos/catingresos.module#CatIngresosModule' },
            { path: 'sucursales', loadChildren: './sucursales/sucursales.module#SucursalesModule' },
            { path: 'proveedores', loadChildren: './proveedores/proveedores.module#ProveedoresModule' },
            { path: 'usuarios', loadChildren: './usuarios/usuarios.module#UsuariosModule' },
            { path: 'tipopago', loadChildren: './tipopago/tipopago.module#TipoPagoModule' },
            { path: 'cuentabancaria', loadChildren: './cuentabancaria/cuentabancaria.module#CuentaBancariaModule' }
         
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DisenoRoutingModule { }
