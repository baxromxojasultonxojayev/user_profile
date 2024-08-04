import React, { FC } from "react";
import "./index.scss";

const Button: FC<Props> = ({ mode, type, onClick }) => {
  return (
    <div className="button-wrapper">
      <button
        onClick={onClick}
        type={type ? type : "text"}
        className={
          mode === "edit" ? "edit" : mode === "cancel" ? "cancel" : "save"
        }
      >
        {mode === "edit"
          ? "O'zgartirish"
          : mode === "cancel"
          ? "Bekor qilish"
          : "Saqlash"}
      </button>
    </div>
  );
};

type Props = {
  mode: string;
  type?: any;
  onClick?: any;
};

export default Button;
