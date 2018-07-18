// directiva pasa el focus al siguiente control al presionar tecla enter
import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNextfocus]'
})
export class NextfocusDirective {

  private el: ElementRef;
  
  constructor(private _el: ElementRef) {
    this.el = this._el;
  }

  @HostListener('keyup.enter', ['$event']) onKeyDown(e: any) {      
      let index_activo: number;
      let next_control_focus: any;
      const controles = document.querySelectorAll('[appNextfocus]');
      const element_active = e.srcElement;
      e.preventDefault();

      Array.from(controles).forEach((element, index) => {
        if (element === element_active) { index_activo = index; return; }
      });

      next_control_focus = controles.item(index_activo + 1);
      if (next_control_focus) {
        next_control_focus.focus();
        return;
      } else {
        return;
      }    
  }


}
