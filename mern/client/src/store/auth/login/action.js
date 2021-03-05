import { LOGIN, LOGOUT } from "./actionTypes";

export const loginUser = (isLogin) => {
  console.log("isLogin", isLogin);
  return {
    type: LOGIN,
    payload: isLogin,
  };
};
export const logoutUser = (isLogout) => {
  console.log("logoutUser", isLogout);
  return {
    type: LOGOUT,
    payload: isLogout,
  };
};
