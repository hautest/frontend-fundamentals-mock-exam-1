import { ErrorBoundary, ErrorBoundaryProps } from '@suspensive/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

export function QueryErrorBoundary({
  fallback,
  children,
  onError,
  resetKeys,
  shouldCatch,
  onReset,
}: ErrorBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={() => {
            onReset?.();
            reset();
          }}
          onError={onError}
          resetKeys={resetKeys}
          shouldCatch={shouldCatch}
          fallback={fallback}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
