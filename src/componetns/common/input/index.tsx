import type { FC, ReactElement } from "react"
import style from './style.module.css'

type classType={
    input?: string;          // class for the input element
    inputWrapper?: string;   // class for wrapper div
    label?: string;          // class for label (optional)
    error?: string;          // class for error message
  }

type InputProps = {
  type?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  disabled?: boolean;
  required?: boolean;
  classes?: classType;
  label?:string;
 
};

const Input:FC<InputProps> = (props):ReactElement => {
    const{type, name, value, placeholder, onChange, onClick, disabled, required, classes, label}=props
  return (
    <div className={`${style.containerWrapper} ${classes?.inputWrapper}`}>
        {label&& <span>{label}</span>}
        <input
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        required={required}
        className={`${classes?.input} ${style.inputWrapper}`}
        placeholder={placeholder}
        onChange={onChange}
        onClick={onClick}
        />
    </div>
  )
}

export default Input