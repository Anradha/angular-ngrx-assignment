import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup Success',
  SIGNUP_FAILURE = '[Auth] Signup Failure',
  PROFILE_SETUP = '[Auth] Profile Setup',
  PROFILE_SETUP_SUCCESS = '[Auth] Profile Setup Success',
  PROFILE_SETUP_FAILURE = '[Auth] Profile Setup Failure',
  LOGOUT = '[Auth] Logout',
  RESET = '[Auth] Reset'
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any) {}
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class SignUp implements Action {
  readonly type = AuthActionTypes.SIGNUP;
  constructor(public payload: any) {}
}

export class SignUpSuccess implements Action {
  readonly type = AuthActionTypes.SIGNUP_SUCCESS;
  constructor(public payload: any) {}
}

export class SignUpFailure implements Action {
  readonly type = AuthActionTypes.SIGNUP_FAILURE;
  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class Reset implements Action {
  readonly type = AuthActionTypes.RESET;
}

export class ProfileSetup implements Action {
  readonly type = AuthActionTypes.PROFILE_SETUP;
  constructor(public payload: any) {}
}

export class ProfileSetupSuccess implements Action {
  readonly type = AuthActionTypes.PROFILE_SETUP_SUCCESS;
  constructor(public payload: any) {}
}

export class ProfileSetupFailure implements Action {
  readonly type = AuthActionTypes.PROFILE_SETUP_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | SignUp
  | SignUpSuccess
  | SignUpFailure
  | Logout
  | Reset
  | ProfileSetup
  | ProfileSetupSuccess
  | ProfileSetupFailure;
