"use client";
import React, { useState } from "react";
import { TradingHeader } from "./TradingHeader";
import { TradingTable } from "./TradingTable";
import { TableSkeleton, ErrorBoundaryFallback } from "./LoadingStates";
import { useTradingData } from "@/hooks/useTradingData";

export const TradingDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Trending");
  const [activeTimeframe, setActiveTimeframe] = useState("1h");
  const [sortField, setSortField] = useState<string>("marketCap");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const { tokens, isLoading, error, refetch } = useTradingData(activeTimeframe);

  const handleSortChange = (field: string, direction: "asc" | "desc") => {
    console.log("Sorting by:", field, direction);
    setSortField(field);
    setSortDirection(direction);
  };

  const sortedTokens = [...tokens].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  if (error) {
    return (
      <div className="min-h-screen bg-trading-bg">
        <TradingHeader
          activeTab={activeTab}
          activeTimeframe={activeTimeframe}
          onTabChange={setActiveTab}
          onTimeframeChange={setActiveTimeframe}
          onSortChange={handleSortChange} // Pass sorting handler to the header
          sortField={sortField} // Pass current sort field
          sortDirection={sortDirection} // Pass current sort direction
        />
        <div className="p-4">
          <ErrorBoundaryFallback
            error={error as Error}
            resetErrorBoundary={refetch}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-scroll bg-trading-bg flex flex-col">
      <TradingHeader
        activeTab={activeTab}
        activeTimeframe={activeTimeframe}
        onTabChange={setActiveTab}
        onTimeframeChange={setActiveTimeframe}
        onSortChange={handleSortChange} // Pass sorting handler to the header
        sortField={sortField} // Pass current sort field
        sortDirection={sortDirection} // Pass current sort direction
      />

      <div className="h-full flex-1 overflow-auto p-[24px] px-[16px] lg:px-[24px]">
        {isLoading ? <TableSkeleton /> : <TradingTable tokens={sortedTokens} />}
      </div>
    </div>
  );
};
