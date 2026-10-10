import { useId } from "react";
import type { FC, ReactElement } from "react";
import style from "./style.module.css";

type classType = {
  input?: string; // class for the input element
  inputWrapper?: string; // class for wrapper div
  label?: string; // class for label (optional)
  error?: string; // class for error message
};

type InputProps = {
  id?: string;
  type?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  disabled?: boolean;
  required?: boolean;
  classes?: classType;
  label?: string;
};

const Input: FC<InputProps> = (props): ReactElement => {
  const {
    id,
    type,
    name,
    value,
    placeholder,
    onChange,
    onClick,
    disabled,
    required,
    classes,
    label,
  } = props;

  // Unique id so the <label> and <input> are linked (tap the label → focus the input)
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <div className={[style.containerWrapper, classes?.inputWrapper].filter(Boolean).join(" ")}>
      {label && (
        <label htmlFor={inputId} className={[style.label, classes?.label].filter(Boolean).join(" ")}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        required={required}
        className={[style.inputWrapper, classes?.input].filter(Boolean).join(" ")}
        placeholder={placeholder}
        onChange={onChange}
        onClick={onClick}
      />
    </div>
  );
};

export default Input;