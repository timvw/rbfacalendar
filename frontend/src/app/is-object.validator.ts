import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function isObjectValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

    const value = control.value;
    const isObject = value instanceof Object;

    console.log("validating control value " + JSON.stringify(value) + " isobject: " + isObject);

    return !isObject ? { isObject:true} : null;
  }
}
