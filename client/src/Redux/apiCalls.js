import { loginFailure, loginStart, loginSuccess } from "./Reducers/userReducer";
import { publicRequest } from "../Request/Request";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    // console.log(user);
    const res = await publicRequest.post("/User/Login", user);
    dispatch(loginSuccess(res.data));
  } catch {
    dispatch(loginFailure());
  }
};
