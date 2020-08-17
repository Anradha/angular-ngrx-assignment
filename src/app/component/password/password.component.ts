import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from 'src/app/store/app.states';
import { Reset, GetUserDetail } from 'src/app/store/actions/auth.actions';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PasswordValidators, ConfirmedPasswordValidators } from 'src/app/util/validators';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  step = 1;
  getState: Observable<any>;
  errorMessage: string | null;
  isStep2FormValid: false;
  isEmailSent = false;
  user: User | null;
  answer1: string = null;
  answer2: string = null;
  form: FormGroup = new FormGroup({});

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
    this.getState = this.store.select(selectAuthState);
    this.form = formBuilder.group({
      password: ['', [Validators.required, PasswordValidators()]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: ConfirmedPasswordValidators('password', 'confirmPassword')
    }
    );
  }

  ngOnInit(): void {
    this.store.dispatch(new Reset());
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.user = state.user;
      if (!this.errorMessage && this.user) {
        this.step = 2;
      }
    });
    this.route.queryParamMap.subscribe(queryParams => {
      const token = queryParams.get('t');
      if (token) {
        this.store.dispatch(new GetUserDetail({token}));
      }
    });
  }

  recoverPassword() {
    this.isEmailSent = true;
  }

  recoverPasswordStep2() {
    this.step = 3;
  }

  get f() {
    return this.form.controls;
  }

  resetPassword() {
    console.log(this.form.get('password').value);
    // dispatch the state
  }

}
