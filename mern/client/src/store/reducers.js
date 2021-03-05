import { combineReducers } from "redux";
//auth
import Login from "./auth/login/reducer";

const rootReducer = combineReducers({
  //auth
  Login,
});

export default rootReducer;
