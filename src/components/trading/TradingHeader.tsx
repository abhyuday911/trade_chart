import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Settings } from "lucide-react";

interface TradingHeaderProps {
  activeTab: string;
  activeTimeframe: string;
  onTabChange: (tab: string) => void;
  onTimeframeChange: (timeframe: string) => void;
}

export const TradingHeader: React.FC<TradingHeaderProps> = ({
  activeTab,
  activeTimeframe,
  onTabChange,
  onTimeframeChange,
}) => {
  const tabs = ["Trending", "Surge", "DEX Screener", "Pump Live"];
  const timeframes = ["1m", "5m", "30m", "1h"];

  return (
    <div className="border-b p-4">
      <div className="flex items-center justify-between">
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            {timeframes.map((timeframe) => (
              <Button
                key={timeframe}
                variant={activeTimeframe === timeframe ? "default" : "ghost"}
                size="sm"
                onClick={() => onTimeframeChange(timeframe)}
                className="text-xs h-8"
              >
                {timeframe}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filter
          </Button>

          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-muted-foreground" />
            <Badge variant="secondary">1</Badge>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">Quick Buy</span>
            <span>0.0</span>
            <div className="flex gap-1">
              <Badge variant="outline" className="text-xs px-2 py-0">
                P1
              </Badge>
              <Badge variant="outline" className="text-xs px-2 py-0">
                P2
              </Badge>
              <Badge variant="outline" className="text-xs px-2 py-0">
                P3
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
