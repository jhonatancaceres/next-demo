'use client';


import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import Home from './Home';

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

function ErrorBoundaryFallback({ error }: FallbackProps) {

  const errorMessage = getErrorMessage(error);

  console.error(
    '[ErrorBoundaryFallback] Displaying 500 error. Error details:',
    {
      error,
      errorMessage,
      errorMessageFromUtils: errorMessage,
      fullErrorObject: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    },
  );

  return <h3>{errorMessage}</h3>

}


export default function HomePage() {
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <Home />
    </ErrorBoundary>
  );
}

