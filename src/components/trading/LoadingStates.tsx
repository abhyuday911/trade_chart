import React from "react";
import { FallbackProps } from "react-error-boundary";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "../ui/button";

export function TableSkeleton() {
  const headerCount = 7; 
  const rowCount = 8;

  return (
    <Card className="overflow-hidden py-0 h-full bg-backgroundSecondary border-primaryStroke border-[1px] flex flex-col w-full min-w-[0px] justify-start items-start rounded-[8px] sm:rounded-[4px] overflow-y-hidden overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-inherit">
            {Array.from({ length: headerCount }).map((_, i) => (
              <TableHead
                key={i}
                className="font-medium text-muted-foreground px-0 first:sm:px-[12px] h-[32px] sm:h-[48px] min-h-[32px] sm:min-h-[48px] max-h-[32px] select-none"
              >
                <div className="flex flex-row gap-[4px] px-[12px] justify-start items-center">
                  <Skeleton className="h-4 w-16" />
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rowCount }).map((_, i) => (
            <TableRow key={i}>
      <TableCell className="py-4 px-0 sm:px-[12px]">
        <div className="flex justify-between">
          <div className="flex items-center gap-3 px-[12px]">
            <Skeleton className="sm:w-[56px] sm:h-[56px] w-10 h-10 rounded-[3px]" />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="w-24 h-12 mr-4" />
        </div>
      </TableCell>

      {/* Market Cap */}
      <TableCell>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-3 w-10" />
        </div>
      </TableCell>

      {/* Liquidity */}
      <TableCell>
        <Skeleton className="h-4 w-16" />
      </TableCell>

      {/* Volume */}
      <TableCell>
        <Skeleton className="h-4 w-16" />
      </TableCell>

      {/* Transactions */}
      <TableCell>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-3 w-20" />
        </div>
      </TableCell>

      {/* Price changes + audit */}
      <TableCell>
        <div className="flex items-center justify-between w-full">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <Skeleton className="h-3 w-8" />
              <Skeleton className="h-3 w-8" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-3 w-6" />
              <Skeleton className="h-3 w-6" />
              <Skeleton className="h-3 w-6" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-3 w-6" />
              <Skeleton className="h-3 w-10" />
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-shrink-0 text-right pr-12">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
      </TableCell>

      {/* Action button */}
      <TableCell>
        <Button size="sm" disabled variant="primaryBlue" className="w-16">
          <Skeleton className="h-4 w-12" />
        </Button>
      </TableCell>
    </TableRow>

          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

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
