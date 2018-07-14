import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DisenoRoutingModule } from './diseno-routing.module';
import { DisenoComponent } from './diseno.component';
import { SidebarComponent } from './estructura_sistema/sidebar/sidebar.component';
import { HeaderComponent } from './estructura_sistema/header/header.component';
import { ServiceModule } from './services/service.module';


@NgModule({
    imports: [
        CommonModule,        
        DisenoRoutingModule,        
        TranslateModule,
        NgbDropdownModule.forRoot(),
        ServiceModule        
    ],    
    declarations: [DisenoComponent, SidebarComponent, HeaderComponent]
})
export class DisenoModule { }
