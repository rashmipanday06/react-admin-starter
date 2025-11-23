import { useDispatch } from "react-redux";
import Button from "../../common/button";
import Input from "../../common/input";
import style from "./style.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Login = () => {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

 const handleLogin = (e: any) => {
    e.preventDefault();

    const success = login(email, pass);

    if (success) {
      navigate("/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className={style.container}>
      <h2>Login</h2>

      <Input
        label="UserName"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        classes={{ input: style.input }}
      />

      <Input
        label="Password"
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />

      <Button onClick={handleLogin}>Submit</Button>
    </div>
  );
};

export default Login;
