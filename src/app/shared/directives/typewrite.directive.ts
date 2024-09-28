import {
  ElementRef,
  Renderer2,
  Directive,
  OnDestroy,
  OnInit,
  inject,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appTypewrite]',
})
export class TypewriteDirective implements OnInit, OnDestroy {
  @Input() public delay: number = 30;
  @Input() public text: string = '';

  private _interval?: ReturnType<typeof setTimeout>;
  private _currentIndex: number = 0;

  private readonly _element = inject(ElementRef);
  private readonly _renderer = inject(Renderer2);

  public ngOnInit(): void {
    if (this.text) {
      this._interval = setInterval(() => {
        if (this._currentIndex < this.text.length) {
          const currentText = this.text.slice(0, this._currentIndex + 1);
          this._renderer.setProperty(
            this._element.nativeElement,
            'textContent',
            currentText,
          );
          this._currentIndex++;
        } else {
          this._clearInterval();
        }
      }, this.delay);
    }
  }

  public ngOnDestroy(): void {
    this._clearInterval();
  }

  private _clearInterval(): void {
    if (this._interval !== undefined) {
      clearInterval(this._interval);
      this._interval = undefined;
    }
  }
}
