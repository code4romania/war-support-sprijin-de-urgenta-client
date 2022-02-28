import { FC, InputHTMLAttributes } from "react";

const Element: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  name,
  children,
  value,
}) => {
  return (
    <div>
      <input
        type="checkbox"
        name={name}
        id={name}
        value={value}
      />
      <label htmlFor={name}>
        {children}
      </label>
    </div>
  );
}

export default Element;
