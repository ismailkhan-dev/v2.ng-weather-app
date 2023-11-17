import { FormValidatorDirective } from './form-validator.directive';
import { ElementRef } from '@angular/core';

describe('FormValidatorDirective', () => {
  let directive: FormValidatorDirective;
  let elRefMock: ElementRef;
  let eventMock: KeyboardEvent;

  beforeEach(() => {
    elRefMock = new ElementRef(document.createElement('div'));
    directive = new FormValidatorDirective(elRefMock);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should allow valid characters', () => {
    const validCharacters = ['a', 'Z', '0', '9', ',', '.', ' '];
    const emitSpy = spyOn(directive.invalidCharEntered, 'emit');

    validCharacters.forEach((char) => {
      directive.onKeyDown(new KeyboardEvent('keydown', { key: char }));
      expect(emitSpy).not.toHaveBeenCalledWith(true);
    });
  });

  it('should block invalid characters and emit an event', () => {
    const invalidCharacters = ['@', '#', '$', '%', '^', '&', '*'];
    const emitSpy = spyOn(directive.invalidCharEntered, 'emit');

    invalidCharacters.forEach((char) => {
      directive.onKeyDown(new KeyboardEvent('keydown', { key: char }));
      expect(emitSpy).toHaveBeenCalledWith(true);
    });
  });

  it('should allow special keys', () => {
    const specialKeys = [
      'Backspace',
      'Tab',
      'End',
      'Home',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
    ];
    const emitSpy = spyOn(directive.invalidCharEntered, 'emit');

    specialKeys.forEach((key) => {
      directive.onKeyDown(new KeyboardEvent('keydown', { key: key }));
      expect(emitSpy).not.toHaveBeenCalled();
    });
  });

  it('should handle null or undefined input gracefully', () => {
    const emitSpy = spyOn(directive.invalidCharEntered, 'emit');

    // Simulate a keydown event where the key property is missing
    directive.onKeyDown(new KeyboardEvent('keydown', {}));
    expect(emitSpy).not.toHaveBeenCalled();

    // Simulate a keydown event with key property as undefined
    directive.onKeyDown(new KeyboardEvent('keydown', { key: undefined }));
    expect(emitSpy).not.toHaveBeenCalled();
  });
});
