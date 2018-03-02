import { ChangeDetectionStrategy, Component, Directive, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../reducers';
import { RegisterRequest } from '../auth.actions';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {

  username: string;
  email: string;
  password: string;
  passwordRepeat: string;

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
  }

  submit() {
    this.store.dispatch(new RegisterRequest({
      username: this.username,
      email: this.email,
      password: this.password
    }));
  }
}


@Directive({
  selector: '[appMatchingPasswords]',
  providers: [{provide: NG_VALIDATORS, useExisting: MatchingPasswordDirective, multi: true}]
})
export class MatchingPasswordDirective implements Validator {
  @Input() get appMatchingPasswords(): string {
    return this.passwordToBeMatched;
  }

  set appMatchingPasswords(value: string) {
    this.passwordToBeMatched = value;
    if (this.onChange) {
      // Validation needs to be triggered, when input changes.
      this.onChange();
    }
  }

  private passwordToBeMatched: string;
  private onChange: () => void;

  registerOnValidatorChange(fn: () => void) {
    this.onChange = fn;
  }

  validate(control: AbstractControl): { [key: string]: any } {
    if (this.passwordToBeMatched !== control.value) {
      return {matchingPasswords: {value: control.value}};
    } else {
      return null;
    }
  }
}
