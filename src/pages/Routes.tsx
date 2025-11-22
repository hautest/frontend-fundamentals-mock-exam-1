import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { SavingsCalculatorPage } from './SavingsCalculatorPage/page';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'shared/queryClient';
import { GlobalPortal } from 'tosslib';
import { ToastProvider } from 'shared/ui/Toast';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SavingsCalculatorPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace={true} />,
  },
]);

export function Routes() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalPortal.Provider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </GlobalPortal.Provider>
    </QueryClientProvider>
  );
}
