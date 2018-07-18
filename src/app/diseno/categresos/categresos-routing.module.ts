// import { CatEgresosComponent } from './categresos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaCatEgresosComponent } from './lista-categresos/lista-categresos.component';
import { CrudCatEgresosComponent } from './crud-categresos/crud-categresos.component';

const routes: Routes = [
    {
        path: '', component: ListaCatEgresosComponent,
        children: [
            { path: 'crud-categresos', component: CrudCatEgresosComponent }
        ]
    }    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CatEgresosRoutingModule {}
