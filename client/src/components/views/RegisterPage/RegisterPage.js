import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";

function RegisterPage(props) {
  //리덕스 객체 사용
  const dispatch = useDispatch();

  //state들 정의_Entity 정의
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  //Handler를 사용해서 메소드 정의
  //set메소드
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  // submit 메소드
  // axios를 바로 호출하지 않고 Redux를 사용한다.
  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    //Entity 정의 및 초기화
    let body = {
      email: Email,
      password: Password,
      Name: Name,
    };

    //../_actions/user_reducer.js로 연결
    //내보내는 파라미터는 Entity로 정의한 body
    //메소드 성공 실패에 대하 경우를 정의한다.
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push("/login");
      } else {
        alert("Failed to sign up");
      }
    });
  };

  // View단 return
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      {/* form 전송 */}
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        {/* 지정한 state를 매핑 한다. 
        onChange시 set동작을 작동하는 Handler에 연결 */}
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        <br />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />

        <label>ConfirmPassword</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <br />

        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}
export default withRouter(RegisterPage);
