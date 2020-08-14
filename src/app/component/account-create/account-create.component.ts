import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../store/app.states';
import { SignUp, Logout, Reset } from '../../store/actions/auth.actions';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmedPasswordValidators, PasswordValidators } from '../../util/validators';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.css']
})
export class AccountCreateComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(private store: Store<AppState>,
              private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, PasswordValidators()]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: ConfirmedPasswordValidators('password', 'confirmPassword')
    }
    );
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.store.dispatch(new Reset());
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  get f() {
    return this.form.controls;
  }

  addAccount() {
    this.errorMessage = '';
    const payload = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    };
    this.store.dispatch(new SignUp(payload));
  }
}
