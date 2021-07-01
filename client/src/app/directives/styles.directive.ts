import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appStyles]'
})
export class StylesDirective {

  @Input() dirStyles: { color?: string };

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}


  @HostListener('mouseenter') onEnter(){
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', this.dirStyles.color);
  }


  @HostListener('mouseleave') onLeave(){
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', null)
  }

}
