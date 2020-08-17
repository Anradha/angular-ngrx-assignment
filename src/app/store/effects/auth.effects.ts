import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType} from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import {
  AuthActionTypes,
  LogInSuccess,
  LogIn,
  LogInFailure,
  SignUp,
  SignUpSuccess,
  SignUpFailure,
  ProfileSetup,
  ProfileSetupFailure,
  ProfileSetupSuccess,
  GetUserDetail,
  UserDetail,
  UserNotFound,
} from '../actions/auth.actions';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

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
            return new LogInFailure({errormessage: 'Invalid credentials'});
          }
        }),
        catchError((error) => {
          return of(new LogInFailure({errormessage: JSON.stringify(error)}));
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
                return of(new SignUpFailure({errormessage: JSON.stringify(error)}));
              })
            );
          } else {
            return of(new SignUpFailure({errormessage: 'User already exists.'}));
          }
        }),
        catchError((error) => {
          return of(new SignUpFailure({errormessage: JSON.stringify(error)}));
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

  @Effect()
  ProfileSetup$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.PROFILE_SETUP),
    switchMap((action: ProfileSetup) => {
      return this.authService.getUserByToken(localStorage.getItem('token')).pipe (
        switchMap((user: User[]) => {
          if (user.length === 1) {
            const userToUpdate: User = user[0];
            userToUpdate.profile = action.payload;
            return this.authService.updateUser(userToUpdate).pipe(
              map((updatedUser) => {
                return new ProfileSetupSuccess(user);
              }),
              catchError((error) => {
                return of(new ProfileSetupFailure({errormessage: JSON.stringify(error)}));
              })
            );
          } else {
            return of(new ProfileSetupFailure({errormessage: 'User does not exist.'}));
          }
        }),
        catchError((error) => {
          return of(new SignUpFailure({error}));
        })
      );
    })
  );

  @Effect({dispatch: false})
  ProfileSetupSuccess$: Observable<any> = this.actions$.pipe(
    ofType<SignUpSuccess>(AuthActionTypes.PROFILE_SETUP_SUCCESS),
    tap((action) => {
      this.router.navigate(['/profile/setup/landing']);
    })
  );

  @Effect({dispatch: false})
  ProfileSetupFailure$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.PROFILE_SETUP_FAILURE)
  );

  @Effect({dispatch: false})
  Logout$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((action) => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    })
  );

  @Effect()
  GetUserDetail$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.GET_USER_DETAIL),
    switchMap((action: GetUserDetail) => {
      return this.authService.getUserByToken(action.payload.token)
      .pipe (
        map((users: User[]) => {
          if (users.length > 0) {
            return new UserDetail({user: users[0]});
          }else {
            return new UserNotFound({errormessage: 'User not found.'});
          }
        }),
        catchError((error) => {
          return of(new UserNotFound({errormessage: JSON.stringify(error)}));
        })
      );
    })
  );

}
