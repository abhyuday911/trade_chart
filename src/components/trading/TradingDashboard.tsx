"use client";
import React, { useState } from "react";
import { TradingHeader } from "./TradingHeader";
import { TradingTable } from "./TradingTable";
import { TableSkeleton } from "./LoadingStates";
import { mockTokens } from "@/data/mockTokens";

export const TradingDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Trending");
  const [activeTimeframe, setActiveTimeframe] = useState("1h");

  const [isLoading, setisLoading] = useState(false);

  return (
    <div className="h-screen w-screen overflow-scroll bg-trading-bg flex flex-col">
      <TradingHeader
        activeTab={activeTab}
        activeTimeframe={activeTimeframe}
        onTabChange={setActiveTab}
        onTimeframeChange={setActiveTimeframe}
      />

      <div className="h-full flex-1 overflow-auto p-[24px] px-[16px] lg:px-[24px]">
        {isLoading ? <TableSkeleton /> : <TradingTable tokens={mockTokens} />}
      </div>
    </div>
  );
};
