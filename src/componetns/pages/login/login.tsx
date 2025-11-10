import { useDispatch } from "react-redux";
import Button from "../../common/button";
import Input from "../../common/input";
import style from "./style.module.css";
const login = () => {
  const user = useDispatch;
  return (
    <div className={style.container}>
      <h2>Login</h2>
      <Input label="UserName" classes={{ input: style.input }} />
      <Input label="Password" />

      <Button>Submit</Button>
    </div>
  );
};

export default login;
