import React from "react";
import style from "./Button.module.css";

const ButtonCircle: React.FC<{
    value: string;
    icon?: string;
    onClick?: () => void;
}> = ({ icon, onClick }) => {
    return (
        <button className={style.btnCircle} onClick={onClick}>
            <i className={`${icon}`}></i>
        </button>
    );
}

export default ButtonCircle;