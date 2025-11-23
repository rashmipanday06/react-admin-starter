import type { FC, ReactElement, ReactNode } from "react";
import style from "./style.module.css";

type ButtonProps = {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: FC<ButtonProps> = ({ children, onClick }): ReactElement => {
  return (
    <div>
      <button onClick={onClick} className={style.button}>
        {children}
      </button>
    </div>
  );
};

export default Button;
