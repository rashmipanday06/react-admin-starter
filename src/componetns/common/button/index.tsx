import type { FC, ReactElement, ReactNode } from "react";

import style from "./style.module.css";

type buttonPropType = {
  children: ReactNode;
  onclick?: () => void;
};
const Button: FC<buttonPropType> = (props): ReactElement => {
  const { children, onclick } = props;
  return (
    <div>
      <button onClick={onclick} className={style.button}>
        {children}
      </button>
    </div>
  );
};

export default Button;
