import React, { useCallback, useRef } from "react";
import "./Auth.css";

const Auth = () => {
    const emailInput = useRef();
    const passwordInput = useRef();

    const submitHandler = useCallback((event) => {
        event.preventDefault();
        const email = emailInput.current.value;
        const password = passwordInput.current.value;

        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }
        console.log(email, password);
        
        emailInput.current.value = "";
        passwordInput.current.value = "";
    }, []);

    return (
        <form className="auth-form" onSubmit={submitHandler}>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" ref={emailInput} />
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" ref={passwordInput} />
            </div>
            <div className="form-actions">
                <button type="submit">Submit</button>
                <button type="button">Switch to Signup</button>
            </div>
        </form>
    );
}

export default Auth;
