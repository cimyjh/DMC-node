import { LOGIN_USER } from "../_actions/types";
import { REGISTER_USER } from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
      break;

    //action에서 받은 return 값이 REGISTER_USER일 경우  실행
    case REGISTER_USER:
      return { ...state, register: action.payload };
      break;

    default:
      return state;
  }
}
