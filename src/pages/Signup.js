import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import { useNavigate } from "react-router";
import { useAuth } from "../hooks";
import styles from "../styles/login.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signingUp, setSigningUp] = useState("");
  const auth = useAuth();
  const history = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSigningUp(true);

    let error = false;
    if (!name || !email || !password || !confirmPassword) {
      toast("Please Enter Name,confirmPassword & password", {
        appearance: "error",
        autoDismiss: true,
      });
      // error = true;
    }

    if (password !== confirmPassword) {
      toast("Please Enter confirmPassword & password sem", {
        appearance: "error",
        autoDismiss: true,
      });
      error = true;
    }

    if (error) {
      return setSigningUp(false);
    }

    console.log(name);
    console.log(password);

    const response = await auth.signup(name, email, password, confirmPassword);
    console.log("I am response",response)

    if (response.success) {
      history("/login");
      setSigningUp(false);
      return toast("User registered successfully, please login now", {
        appearance: "success",
        autoDismiss: true,
      });
    } else {
      toast(response.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }

    setSigningUp(false);
  };

  if(auth.user){
   return <Navigate to="/" />;
  }

  return (
    <form className={styles.loginForm} onSubmit={handleFormSubmit}>
      <span className={styles.loginSignupHeader}> Signup</span>
      <div className={styles.field}>
        <input
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Confirm password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <button disabled={signingUp}>
          {signingUp ? "Signing up..." : "Signup"}
          <ToastContainer />
        </button>
      </div>
    </form>
  );
};

export default Signup;
