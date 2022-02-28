import {FC, InputHTMLAttributes} from "react";

const Element: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  name,
  children,
  value,
}) => {
  return (
    <div>
      <input
        type="radio"
        name={name}
        id={`${name}_${value}`}
        value={value}
      />
      <label htmlFor={`${name}_${value}`}>
        {children}
      </label>
    </div>
  );
}

export default Element;
