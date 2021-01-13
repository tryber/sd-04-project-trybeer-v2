/** USER REDUX */

import UserService from '../../services/trybeerAPI';

/** Actions Types */

export const Types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  SIGNUP: 'SIGNUP',
  ERROR: 'ERROR',
};

/** Reducers */

const initialState = {
  user: {
    id: '',
    name: '',
    email: '',
    role: '',
  },
  session: {
    isLoggedIn: false,
    token: '',
  },
  errors: [],
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.LOGIN:
      return {
        ...state,
        user: payload.data,
        session: { isLoggedIn: true, token: payload.token },
      };
    case Types.LOGOUT:
      return { ...initialState };
    case Types.ERROR:
      return { ...state, errors: [...state.errors, payload.error] };
    default:
      return state;
  }
};

/** Actions */

export const login = ({ token, data }) => ({
  type: Types.LOGIN,
  payload: {
    token,
    data,
  },
});

export const logout = () => ({
  type: Types.LOGOUT,
});

export const hasErrored = (error) => ({
  type: Types.ERROR,
  payload: error,
});

/** Actions Creators */

export const userLogin = (email, password) => (dispatch) => {
  UserService.userLogin({ email, password })
    .then((userLoginData) => dispatch(login(userLoginData.data)))
    .catch((error) => dispatch(hasErrored(error)));
};

const twoHundred = 200;

export const userSignup = (userData) => (dispatch) => {
  UserService.userSignup(userData)
    .then((response) => {
      /** Verifica se o recurso foi criado no BD e procede */
      /** Faz login se ok */
      if (response.status === twoHundred) {
        dispatch(login(response.data));
      }
    })
    .catch((error) => dispatch(hasErrored(error)));
};

export const userNameUpdate = (name, email) => (dispatch) => {
  UserService.userNameUpdate(name, email)
    .then((DATA) => {
      dispatch(login(DATA));
    })
    .catch((error) => dispatch(hasErrored(error)));
};

export default userReducer;
