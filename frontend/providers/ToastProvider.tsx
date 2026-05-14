'use client';

import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type Position =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'bottom-center';

interface ToastContextType {
  setToastPosition: React.Dispatch<React.SetStateAction<Position>>;
}

const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined,
);

export const useToast = (): ToastContextType => {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a useToast');
  }
  return context;
};

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mode } = useSelector((state: RootState) => state.persistInfos);
  const [toastPosition, setToastPosition] =
    React.useState<Position>('top-center');

  return (
    <ToastContext.Provider value={{ setToastPosition }}>
      <Toaster position={toastPosition} richColors theme={mode} />
      {children}
    </ToastContext.Provider>
  );
}
