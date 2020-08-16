import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from 'src/app/store/app.states';
import { Reset } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  getState: Observable<any>;
  errorMessage: string | null;
  isEmailSent = false;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.store.dispatch(new Reset());
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  recoverPassword() {
    this.isEmailSent = true;
  }

}
