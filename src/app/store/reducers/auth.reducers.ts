import { User } from 'src/app/models/user';
import { AuthActionTypes, All } from '../actions/auth.actions';

// Structure of the Store
export interface State {
  // is a user authenticated
  isAuthenticated: boolean;
  // If authenticated there should be user object
  user: User | null;
  // error message
  errorMessage: string | null;
}

// Initial state
export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          username: action.payload.username
        },
        errorMessage: null
      };
    }

    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload.errormessage
      };
    }

    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          username: action.payload.username
        },
        errorMessage: null
      };
    }

    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload.errormessage
      };
    }

    case AuthActionTypes.PROFILE_SETUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        errorMessage: null
      };
    }

    case AuthActionTypes.PROFILE_SETUP_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload.errormessage
      };
    }

    case AuthActionTypes.LOGOUT: {
      return initialState;
    }

    case AuthActionTypes.RESET: {
      return initialState;
    }

    case AuthActionTypes.USER_DETAIL: {
      return {
        ...state,
        user: action.payload.user
      };
    }

    case AuthActionTypes.USER_NOT_FOUND: {
      return {
        ...state,
        errorMessage: action.payload.errormessage
      };
    }

    default:
      return state;
  }
}
