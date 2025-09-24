import React from "react";
import style from "./Button.module.css";

const ButtonMedium: React.FC<{
    value: string;
    icon?: string;
    onClick?: () => void;
}> = ({ value, icon, onClick }) => {
    return (
        <button className={`${style.btnMedium} d-flex align-items-center justify-content-center text-white font-sans-serif btn btn-light border-0 rounded-1`} onClick={onClick}>
            <i className={`${icon}`}></i>
            <span className="ms-2 fw-bold">{value}</span>
        </button>
    );
}

export default ButtonMedium;