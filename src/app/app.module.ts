import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';

// import { CtrlAutocompleteDirective } from './directivas/ctrl-autocomplete.directive';

// directiva
// import { CtrlAutocompleteDirective } from './directivas/ctrl-autocomplete.directive';
// import { CtrlAutocompleteDirective } from './directivas/ctrl-autocomplete.directive';
// AoT requires an exported function for factories

@NgModule({
    imports: [
        BsDropdownModule.forRoot(),
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,        
        ReactiveFormsModule,
        HttpClientModule,     
        AppRoutingModule,
        SharedModule
    ],
    declarations: [AppComponent],
    providers: [AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {}
