import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CtrlAutocompleteDirective } from './ctrl-autocomplete.directive';
import { NextfocusDirective } from './nextfocus.directive';
import { KeyclickDirective } from './keyclick.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [CtrlAutocompleteDirective, NextfocusDirective, KeyclickDirective],
  declarations: [CtrlAutocompleteDirective, NextfocusDirective, KeyclickDirective]
})
export class DirectivasModule { }
