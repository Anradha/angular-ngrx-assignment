import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType} from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { AuthActionTypes, LogInSuccess, LogIn, LogInFailure, SignUp, SignUpSuccess, SignUpFailure } from '../actions/auth.actions';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  @Effect()
  logIn$: Observable<Action> = this.actions$.pipe(
    ofType<LogIn>(AuthActionTypes.LOGIN),
    switchMap((action) => {
      return this.authService.get(action.payload.username, action.payload.password)
      .pipe (
        map((user: any) => {
          if (user.length > 0) {
            return new LogInSuccess({token: user[0].token, email: action.payload.username});
          }else {
            return new LogInFailure({error: 'Invalid credentials'});
          }
        }),
        catchError((error) => {
          return of(new LogInFailure({error}));
        })
      );
    })
  );

  @Effect({dispatch: false})
  LogInSuccess$: Observable<any> = this.actions$.pipe(
    ofType<LogInSuccess>(AuthActionTypes.LOGIN_SUCCESS),
    tap((action) => {
      localStorage.setItem('token', action.payload.token);
      this.router.navigate(['/']);
    })
  );

  @Effect({dispatch: false})
  LogInFailuer$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect()
  SignUp$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.SIGNUP),
    switchMap((action: SignUp) => {
      return this.authService.getUserByName(action.payload.username).pipe (
        switchMap((user: any) => {
          if (!user || user.length === 0) {
            return this.authService.signUp(action.payload.username, action.payload.password).pipe(
              map((signupUser) => {
                return new SignUpSuccess({token: signupUser.token, email: action.payload.email});
              }),
              catchError((error) => {
                return of(new SignUpFailure({error}));
              })
            );
          } else {
            return of(new SignUpFailure({errormessage: 'User already exists.'}));
          }
        }),
        catchError((error) => {
          return of(new SignUpFailure({error}));
        })
      );
    })
  );

  @Effect({dispatch: false})
  SignUpSuccess$: Observable<any> = this.actions$.pipe(
    ofType<SignUpSuccess>(AuthActionTypes.SIGNUP_SUCCESS),
    tap((action) => {
      localStorage.setItem('token', action.payload.token);
      this.router.navigate(['/account/create/landing']);
    })
  );

  @Effect({dispatch: false})
  SignUpFailuer$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE)
  );

  @Effect({dispatch: false})
  Logout$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((action) => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    })
  );

}
