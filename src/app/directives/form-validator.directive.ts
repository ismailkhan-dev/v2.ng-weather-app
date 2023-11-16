import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

// Direct prevents invalid alphanumeric characters from being input into the search bar. Emits error message if that happens.
@Directive({
  selector: '[appFormValidator]',
  standalone: true,
})
export class FormValidatorDirective {
  private regex: RegExp = new RegExp(/^[a-zA-Z0-9,.\s]*$/);
  private specialKeys: Array<string> = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    'ArrowLeft',
    'ArrowRight',
    'Delete',
  ];

  @Output() invalidCharEntered = new EventEmitter<boolean>();

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.includes(event.key)) {
      return;
    }

    const char = event.key;
    if (!char) return;

    if (!char.match(this.regex)) {
      event.preventDefault();
      setTimeout(() => this.invalidCharEntered.emit(true), 0);
    } else {
      setTimeout(() => this.invalidCharEntered.emit(false), 0);
    }
  }
}
