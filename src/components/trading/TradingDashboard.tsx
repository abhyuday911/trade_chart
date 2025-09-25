"use client";
import React, { useState } from "react";
import { TradingHeader } from "./TradingHeader";
import { TradingTable } from "./TradingTable";
import { TableSkeleton, ErrorBoundaryFallback } from "./LoadingStates";
import { useTradingData } from "@/hooks/useTradingData";
import { mockTokens } from "@/data/mockTokens";

export const TradingDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Trending");
  const [activeTimeframe, setActiveTimeframe] = useState("1h");

  const { tokens, isLoading, error, refetch } = useTradingData(activeTimeframe);

  if (error) {
    return (
      <div className="min-h-screen bg-trading-bg">
        <TradingHeader
          activeTab={activeTab}
          activeTimeframe={activeTimeframe}
          onTabChange={setActiveTab}
          onTimeframeChange={setActiveTimeframe}
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
      />

      <div className="h-full flex-1 overflow-auto p-[24px] px-[16px] lg:px-[24px]">
        {isLoading ? <TableSkeleton /> : <TradingTable tokens={tokens} />}
      </div>
    </div>
  );
};
