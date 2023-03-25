import React from "react";
import { useState } from "react";
// new.............
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/login.module.css";
import { useAuth } from "../hooks";
import {Navigate} from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  // const { addToast } = useToasts();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);

    if (!email || !password) {
      return toast("Please Enter both email and password", {
        appearance: "error",
        autoDismiss: true,
      });
    }

    
    const response = await auth.login(email, password);
    

    if (response.success) {
      toast("succeessFully logged in", {
        appearance: "success",
      });
    } else {
      
     return toast(response.message, {
        appearance: "error",
      });
    }
    setLoggingIn(false);
  };

  if(auth.user){
    return <Navigate to="/" />
  }
  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Paasword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button disabled={loggingIn}>
          {loggingIn ? "Logging in..." : "Log In"}
          <ToastContainer />
        </button>
      </div>
    </form>
  );
};

export default Login;
