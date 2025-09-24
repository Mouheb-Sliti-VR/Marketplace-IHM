import React from "react";
import style from "./Alert.module.css";
import ButtonSmall from "../Button/ButtonSmall";

interface AlertProps {
  alertMsg: React.ReactNode;
  bgColor?: string;
  onClick?: () => void;
}

export const Alert: React.FC<AlertProps> = ({ alertMsg, bgColor, onClick }) => {
  const [hide, setHide] = React.useState(false);

  if (hide) return null;
  
  return (
    <div className={style.overlay}>
        <div className="d-flex justify-content-center align-items-center h-100">
            <div className={style.alertBox} style={{ backgroundColor: bgColor }} onClick={onClick}>
            <p>{alertMsg}</p>
            <ButtonSmall value="Ok" onClick={() => {
                setHide(true);
                if (onClick) onClick();
            }}/>
        </div>
        </div>
    </div>
  );
};