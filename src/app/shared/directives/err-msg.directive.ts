import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[errDirectMsg]'
})
export class ErrMsgDirective implements OnInit{

  htmlElement: ElementRef<HTMLElement>;
  private _msg: string = '';

  @Input() set msg( message: string ) {
    this._msg = message;
    this.setMsg();
  }

  constructor( private elem: ElementRef<HTMLElement> ) {
    this.htmlElement = elem;
  }

  ngOnInit(): void {
    this.setMsg();
  }

  setMsg() {
    this.htmlElement.nativeElement.innerText = this._msg;
  }

}
