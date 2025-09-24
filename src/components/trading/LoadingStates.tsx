import React from "react";
import { FallbackProps } from "react-error-boundary";

export const TableSkeleton: React.FC = () => {
  return (
    <div className="space-y-2">
      {[...Array(7)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4 animate-pulse">
          <div className="w-8 h-8 bg-trading-surface rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-trading-surface rounded w-1/4"></div>
            <div className="h-3 bg-trading-surface rounded w-1/3"></div>
          </div>
          <div className="w-16 h-8 bg-trading-surface rounded"></div>
          <div className="w-20 h-4 bg-trading-surface rounded"></div>
          <div className="w-16 h-4 bg-trading-surface rounded"></div>
          <div className="w-12 h-4 bg-trading-surface rounded"></div>
          <div className="w-16 h-8 bg-brand-primary rounded"></div>
        </div>
      ))}
    </div>
  );
};

export const ShimmerLoader: React.FC = () => {
  return <div className="shimmer h-64 w-full rounded-lg"></div>;
};

export const ErrorBoundaryFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div className="flex items-center justify-center min-h-64 bg-trading-surface rounded-lg border border-trading-border">
      <div className="text-center space-y-4">
        <div className="text-danger text-lg font-semibold">
          Something went wrong
        </div>
        <p className="text-text-secondary text-sm">{error.message}</p>
        <button onClick={resetErrorBoundary} className="trading-button">
          Try again
        </button>
      </div>
    </div>
  );
};
