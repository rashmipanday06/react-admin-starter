import Button from "../../common/button";
import Input from "../../common/input";
import style from "./style.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const success = login(email, pass);

    if (success) {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Check your username and password.");
    }
  };

  return (
    // <form> lets the Enter key submit; the click on Button still works as before
    <form className={style.container} onSubmit={handleLogin}>
      <h2>Login</h2>

      {error && (
        <p className={style.error} role="alert">
          {error}
        </p>
      )}

      <Input
        label="UserName"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError("");
        }}
        classes={{ input: style.input }}
      />

      <Input
        label="Password"
        type="password"
        value={pass}
        onChange={(e) => {
          setPass(e.target.value);
          setError("");
        }}
      />

      <Button onClick={handleLogin}>Submit</Button>
    </form>
  );
};

export default Login;