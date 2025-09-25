import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { TokenData } from "@/types/trading";

interface TradingHeaderProps {
  activeTab: string;
  activeTimeframe: string;
  onTabChange: (tab: string) => void;
  onTimeframeChange: (timeframe: string) => void;
  onSortChange: (
    sortField: keyof TokenData,
    sortDirection: "asc" | "desc"
  ) => void; // Callback for sorting changes
  sortField: keyof TokenData;
  sortDirection: "asc" | "desc";
}

export const TradingHeader: React.FC<TradingHeaderProps> = ({
  activeTab,
  activeTimeframe,
  onTabChange,
  onTimeframeChange,
  onSortChange,
  sortField,
  sortDirection,
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

        {/* Timeframes */}
        <div className="flex gap-8">
          <div className="flex items-center gap-2">
            {timeframes.map((timeframe) => (
              <Button
                key={timeframe}
                variant={activeTimeframe === timeframe ? "default" : "ghost"}
                size="sm"
                onClick={() => onTimeframeChange(timeframe)}
              >
                {timeframe}
              </Button>
            ))}
          </div>

          {/* Sort Modal */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Sort
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Sort Options
                </p>
                <Separator className="my-2" />

                {/* Market Cap */}
                <div>
                  <p className="text-sm font-medium">Market Cap</p>
                  <div className="flex flex-col space-y-1 mt-1">
                    <Button
                      variant={
                        sortField === "marketCap" && sortDirection === "desc"
                          ? "default"
                          : "ghost"
                      }
                      size="sm"
                      onClick={() => onSortChange("marketCap", "desc")}
                    >
                      High to Low
                    </Button>
                    <Button
                      variant={
                        sortField === "marketCap" && sortDirection === "asc"
                          ? "default"
                          : "ghost"
                      }
                      size="sm"
                      onClick={() => onSortChange("marketCap", "asc")}
                    >
                      Low to High
                    </Button>
                  </div>
                </div>

                <Separator className="my-2" />

                {/* Liquidity */}
                <div>
                  <p className="text-sm font-medium">Liquidity</p>
                  <div className="flex flex-col space-y-1 mt-1">
                    <Button
                      variant={
                        sortField === "liquidity" && sortDirection === "desc"
                          ? "default"
                          : "ghost"
                      }
                      size="sm"
                      onClick={() => onSortChange("liquidity", "desc")}
                    >
                      High to Low
                    </Button>
                    <Button
                      variant={
                        sortField === "liquidity" && sortDirection === "asc"
                          ? "default"
                          : "ghost"
                      }
                      size="sm"
                      onClick={() => onSortChange("liquidity", "asc")}
                    >
                      Low to High
                    </Button>
                  </div>
                </div>

                <Separator className="my-2" />

                {/* Volume */}
                <div>
                  <p className="text-sm font-medium">Volume</p>
                  <div className="flex flex-col space-y-1 mt-1">
                    <Button
                      variant={
                        sortField === "volume24h" && sortDirection === "desc"
                          ? "default"
                          : "ghost"
                      }
                      size="sm"
                      onClick={() => onSortChange("volume24h", "desc")}
                    >
                      High to Low
                    </Button>
                    <Button
                      variant={
                        sortField === "volume24h" && sortDirection === "asc"
                          ? "default"
                          : "ghost"
                      }
                      size="sm"
                      onClick={() => onSortChange("volume24h", "asc")}
                    >
                      Low to High
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};
