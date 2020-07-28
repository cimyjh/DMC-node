import axios from "axios";
import { LOGIN_USER } from "./types";
import { REGISTER_USER } from "./types";
import { AUTH_USER } from "./types";

export function loginUser(dataToSubmit) {
  const requst = axios
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: requst,
  };
}

//RegisterPage.js에서 넘겨 받은 Entity 값을 axios를 사용해서 REST방식으로 전송
//서버에서 받은 값은 response 값으로 저장
export function registerUser(dataToSubmit) {
  const requst = axios
    .post("/api/users/register", dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: requst,
  };
}

export function auth() {
  const requst = axios.get("/api/users/auth").then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: requst,
  };
}
