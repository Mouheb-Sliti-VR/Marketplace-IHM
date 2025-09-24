import React from 'react';
import style from './LoadingWheel.module.css';

interface LoadingWheelProps {
    isLoading: boolean;
}

const LoadingWheel: React.FC<LoadingWheelProps> = ({ isLoading }) => {
    if (!isLoading) return null;

    return (
        <div className={style.overlay}>
            <div className={style.spinner}>
                <div className={style.doubleBounce1}></div>
                <div className={style.doubleBounce2}></div>
            </div>
        </div>
    );
};

export default LoadingWheel;