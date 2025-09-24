import React from "react";
import style from "./Button.module.css";

const ButtonLarge: React.FC<{
    value: string;
    icon?: string;
    onClick?: () => void;
}> = ({ value, icon, onClick }) => {
    return (
        <button className={`${style.btnLarge} d-flex align-items-center justify-content-center btn btn-light border-0 rounded-1`} onClick={onClick}>
            <i className={`${icon}`}></i>
            <span>{value}</span>
        </button>
    );
}

export default ButtonLarge;