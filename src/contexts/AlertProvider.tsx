import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { Alert } from '../components/Alert/Alert';

type AlertContextType = {
  showAlert: (msg: ReactNode, bgColor?: string, onClick?: () => void) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = (): AlertContextType => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlert must be used within an AlertProvider');
  return ctx;
};

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alertProps, setAlertProps] = useState<{
    alertMsg: ReactNode;
    bgColor?: string;
    onClick?: () => void;
  } | null>(null);

  const showAlert = (alertMsg: ReactNode, bgColor?: string, onClick?: () => void) => {
    setAlertProps({ alertMsg, bgColor, onClick });
  };

  const handleClose = () => {
    if (alertProps?.onClick) alertProps.onClick();
    setAlertProps(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alertProps && (
        <Alert
          alertMsg={alertProps.alertMsg}
          bgColor={alertProps.bgColor}
          onClick={handleClose}
        />
      )}
    </AlertContext.Provider>
  );
};