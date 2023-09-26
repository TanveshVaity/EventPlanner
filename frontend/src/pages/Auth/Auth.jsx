import React, { useState, useRef ,useContext} from "react";
import axios from "axios";
import "./Auth.css";
import AuthContext from "../../context/auth-context";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailInput = useRef();
  const passwordInput = useRef();
  const authContext = useContext(AuthContext);

  const switchModeHandler = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
          }
        }
      `,
      variables: {
        email: email,
        password: password
      }
    };

    if (!isLogin) {
      requestBody = {
        query: `
          mutation CreateUser($email: String!, $password: String!) {
            createUser(userInput: {email: $email, password: $password}) {
              _id
              email
            }
          }
        `,
        variables: {
          email: email,
          password: password
        }
      };
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const resData = await response.data; 
      if (resData.data.login.token) {
        authContext.login(
          resData.data.login.token,
          resData.data.login.userId,
          resData.data.login.tokenExpiration
        );
      }

      emailInput.current.value = "";
      passwordInput.current.value = "";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={submitHandler}>
        <h2>{isLogin ? "Login" : "Signup"}</h2>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" ref={emailInput} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordInput} />
        </div>
        <button type="submit">{isLogin ? "Login" : "Signup"}</button>
        <div className="form-actions">
          <p>
            {isLogin
              ? "Don't you have an account? "
              : "Already have an account? "}
            <button type="button" onClick={switchModeHandler}>
              {isLogin ? "Signup" : "Login"}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Auth;