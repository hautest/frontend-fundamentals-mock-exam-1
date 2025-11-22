import { useState, useCallback, ReactNode } from 'react';
import { Toast, GlobalPortal } from 'tosslib';
import { createSafeContext } from 'shared/utils/createSafeContext';

const INITIAL_DELAY = 3000;

interface ToastOptions {
  message: string;
  type?: 'success' | 'warn';
  delay?: number;
}

interface ToastItem extends ToastOptions {
  id: number;
  isOpen: boolean;
}

interface ToastContextValue {
  openToast: (options: ToastOptions) => void;
}

const [ToastContextProvider, useToastContext] = createSafeContext<ToastContextValue>('ToastProvider');

let toastId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const openToast = useCallback((options: ToastOptions) => {
    const id = toastId++;
    setToasts(prev => [
      ...prev,
      {
        id,
        isOpen: true,
        message: options.message,
        type: options.type ?? 'success',
        delay: options.delay ?? INITIAL_DELAY,
      },
    ]);
  }, []);

  const closeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContextProvider value={{ openToast }}>
      {children}
      <GlobalPortal.Consumer>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            isOpen={toast.isOpen}
            close={() => closeToast(toast.id)}
            message={toast.message}
            type={toast.type}
            delay={toast.delay}
          />
        ))}
      </GlobalPortal.Consumer>
    </ToastContextProvider>
  );
}

export function useToast() {
  return useToastContext('useToast');
}
