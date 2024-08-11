import React, { FC } from "react";
import "./index.scss";

const FormInput: FC<Props> = ({
  name,
  error,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
}) => {
  return (
    <div className="input-wrapper">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="input"
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {/* {error.name && (
        <p style={{ color: "red", padding: 0, margin: 0 }}>{error.name}</p>
      )} */}
    </div>
  );
};

type Props = {
  name: string;
  error: any;
  label: string;
  value?: string;
  type: string;
  onChange?: any;
  onBlur?: () => void;
};

export default FormInput;
