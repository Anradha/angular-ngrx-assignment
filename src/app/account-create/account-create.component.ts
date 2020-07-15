import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../models/user';
import { AppState, selectAuthState } from '../store/app.states';
import { SignUp, Logout } from '../store/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.css']
})
export class AccountCreateComponent implements OnInit {

  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  addAccount() {
    const payload = {
      username: this.user.username,
      password: this.user.password
    };
    this.store.dispatch(new SignUp(payload));
  }

  onLogout() {
    this.store.dispatch(new Logout());
  }

  setUpProfile() {

  }
}
