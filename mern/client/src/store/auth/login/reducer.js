import { LOGIN, LOGOUT } from "./actionTypes";

const initialState = {
  login: false,
  logout: false,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      state = {
        ...state,
        login: true,
      };
      break;
    case LOGOUT:
      state = {
        ...state,
        logout: true,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default login;
