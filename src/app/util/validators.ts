import { FormGroup, AbstractControl } from '@angular/forms';

export function ConfirmedPasswordValidators(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.ConfirmedPasswordValidators) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ConfirmedPasswordValidators: true});
    } else {
      matchingControl.setErrors(null);
    }
  };
}

export function PasswordValidators() {
  return (passwordControl: AbstractControl): {[key: string]: any} | null => {
    if (passwordControl.errors && !passwordControl.errors.PasswordValidators) {
      return;
    }
    /**
     * (?=.*[a-z]) - The string must contain at least 1 lowercase alphabetical character
     * (?=.*[A-Z]) - The string must contain at least 1 uppercase alphabetical character
     * (?=.*[0-9]) - The string must contain at least 1 numeric character
     * (?=.*[!@#$%^&*]) - The string must contain at least one special character
     * (?=.{8,}) - The string must be eight characters or longer
     */
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    return !strongRegex.test(passwordControl.value) ? {PasswordValidators: {}} : null;
  };
}
