import { Directive, ElementRef,HostListener } from '@angular/core';

@Directive({
  selector: '[toggleonclick]'
})
export class ToggleonclickDirective {
  constructor(private el: ElementRef) {
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.breakWord(true);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.breakWord(false);
  }

  private breakWord(wrap: boolean) {
    if(wrap){
      this.el.nativeElement.style.overflow="none";
      this.el.nativeElement.style.textOverflow="none";
      this.el.nativeElement.style.whiteSpace  = 'normal';
      this.el.nativeElement.style.wordWrap= 'break-word';
    }else{
      this.el.nativeElement.style.overflow="hidden";
      this.el.nativeElement.style.textOverflow="ellipsis";
      this.el.nativeElement.style.whiteSpace  = 'nowrap';
      this.el.nativeElement.style.wordWrap= 'none';
    }
  }
}
