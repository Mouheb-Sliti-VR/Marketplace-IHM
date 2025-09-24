import React from "react";
import style from "./Button.module.css";

const ButtonSmall: React.FC<{ value: string; onClick?: () => void; icon?: string }> = ({ value, icon, onClick }) => {
  return (
    <button onClick={onClick} className={`d-flex justify-content-around align-items-center rounded-1 btn btn-light btn-sm border-0 text-white ${style.btnSmall}`}>
      {icon ? <i className={`${icon} fs-5`}></i> : null}
      <span className="fs-6">{value}</span>
    </button>
  );
};

export default ButtonSmall;
