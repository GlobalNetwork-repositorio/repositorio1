import { Directive, Input, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFormatInput]'
})
export class FormatInputDirective implements OnInit{  

  @Input('appFormatInput') formato: string;
  constructor(public el: ElementRef) {}

  ngOnInit() {
    console.log('inicio directiva: ', this.formato);
    this.format_money();
  }

  format_money() {    
    this.el.nativeElement.value="00";
  }

}
