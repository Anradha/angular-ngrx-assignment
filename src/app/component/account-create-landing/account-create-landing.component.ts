import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../store/app.states';
import { Logout } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-account-create-landing',
  templateUrl: './account-create-landing.component.html',
  styleUrls: ['./account-create-landing.component.css']
})
export class AccountCreateLandingComponent implements OnInit {

  getState: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
  }

  onLogout() {
    this.store.dispatch(new Logout());
  }

  setUpProfile() {
    // TODO
  }

}
