import { Component, OnInit } from '@angular/core';
import { Logout } from 'src/app/store/actions/auth.actions';
import { Observable } from 'rxjs';
import { selectAuthState, AppState } from 'src/app/store/app.states';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-profile-landing',
  templateUrl: './profile-landing.component.html',
  styleUrls: ['./profile-landing.component.css']
})
export class ProfileLandingComponent implements OnInit {

  getState: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
  }

  onLogout() {
    this.store.dispatch(new Logout());
  }

  setUpSchool() {
    // TODO
  }

}
