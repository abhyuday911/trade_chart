import React from "react";
import { TokenData } from "@/types/trading";
import { PriceChart } from "./PriceChart";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckCircle, Copy, ExternalLink } from "lucide-react";

interface TokenRowProps {
  token: TokenData;
  isLoading?: boolean;
}

export const TokenRow: React.FC<TokenRowProps> = ({
  token,
  isLoading = false,
}) => {
  const formatNumber = (num: number, prefix = "", suffix = "") => {
    if (num >= 1e6) return `${prefix}${(num / 1e6).toFixed(1)}M${suffix}`;
    if (num >= 1e3) return `${prefix}${(num / 1e3).toFixed(1)}K${suffix}`;
    return `${prefix}${num.toFixed(2)}${suffix}`;
  };

  const formatPercentage = (num: number) => {
    const isPositive = num >= 0;
    return {
      value: `${isPositive ? "+" : ""}${num.toFixed(2)}%`,
      className: isPositive ? "text-green-500" : "text-red-500",
    };
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(token.contractAddress);
  };

  return (
    <TableRow className="hover:bg-muted/50 cursor-pointer">
      <TableCell className=" min-w-[120px] py-4 px-0 sm:px-[12px]">
        <div className="flex justify-between">
          <div className="flex items-center gap-3 px-[12px]">
            <div className="relative pointer-events-none border-textPrimary/10 ">
              <div
                className={`w-full h-full flex items-center justify-center text-white font-bold text-sm border-[1px] sm:w-[56px] sm:h-[56px] z-10 rounded-[3px] overflow-hidden ${
                  token.rank === 1
                    ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                    : token.rank === 2
                    ? "bg-gradient-to-br from-amber-600 to-yellow-600"
                    : token.rank === 3
                    ? "bg-gradient-to-br from-orange-500 to-red-500"
                    : token.rank === 4
                    ? "bg-gradient-to-br from-blue-500 to-purple-500"
                    : token.rank === 5
                    ? "bg-gradient-to-br from-gray-400 to-gray-600"
                    : token.rank === 6
                    ? "bg-gradient-to-br from-blue-400 to-cyan-500"
                    : "bg-gradient-to-br from-gray-500 to-gray-700"
                }`}
              >
                {token.rank}
              </div>
              {token.verified && (
                <div className="absolute -bottom-1 -right-1">
                  <CheckCircle className="w-3 h-3 text-blue-500 bg-background rounded-full" />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-medium">{token.symbol}</span>
                <span className="text-muted-foreground text-sm">
                  {token.name}
                </span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-xs">
                <span>{token.contractAddress}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Copy
                        className="w-3 h-3 cursor-pointer hover:text-foreground transition-colors"
                        onClick={copyAddress}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy contract address</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <ExternalLink className="w-3 h-3 cursor-pointer hover:text-foreground transition-colors" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 mr-4">
            <PriceChart
              data={token.priceHistory}
              isPositive={token.marketCapChange24h >= 0}
              className="w-24 h-6"
            />
          </div>
        </div>
      </TableCell>

      <TableCell className=" min-w-[120px] py-4 px-0 sm:px-[12px]">
        <div className="flex flex-col">
          <span className="font-medium">
            {formatNumber(token.marketCap, "$")}
          </span>
          <span
            className={formatPercentage(token.marketCapChange24h).className}
          >
            {formatPercentage(token.marketCapChange24h).value}
          </span>
        </div>
      </TableCell>

      <TableCell className=" min-w-[120px] py-4 px-0 sm:px-[12px]">
        <span>{formatNumber(token.liquidity, "$")}</span>
      </TableCell>

      <TableCell className=" min-w-[120px] py-4 px-0 sm:px-[12px]">
        <span>{formatNumber(token.volume24h, "$")}</span>
      </TableCell>

      <TableCell className=" min-w-[120px] py-4 px-0 sm:px-[12px]">
        <div className="flex flex-col">
          <span>{formatNumber(token.transactions24h)}</span>
          <span className="text-muted-foreground text-xs">
            <span>{token.transactions5m}</span> /{" "}
            <span>{token.transactions24h}</span>
          </span>
        </div>
      </TableCell>

      <TableCell className=" min-w-[180px] py-4 px-0 sm:px-[12px] flex">
        <div className="flex items-center justify-between w-full">
          <div className="space-y-1 ">
            <div className="flex items-center gap-4 text-xs">
              <span className={formatPercentage(token.priceChange1h).className}>
                {formatPercentage(token.priceChange1h).value}
              </span>
              <span
                className={formatPercentage(token.priceChange24h).className}
              >
                {formatPercentage(token.priceChange24h).value}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>0%</span>
              <span>0%</span>
              <span>0%</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>0%</span>
              {token.audit === "paid" && (
                <span className="text-green-500">Paid</span>
              )}
              {token.audit === "unpaid" && (
                <span className="text-yellow-500">Unpaid</span>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-1 flex-shrink-0 text-right">
            <span className="text-muted-foreground text-xs">
              X {token.holders}
            </span>
            <span className="text-muted-foreground text-xs">
              0t {token.fdv}
            </span>
          </div>
        </div>
      </TableCell>

      <TableCell className=" min-w-[120px] py-4 px-0 sm:px-[12px]">
        <div className="flex items-center  gap-2">
          <Button
            size="sm"
            disabled={isLoading}
            variant={"primaryBlue"}
            shape={"full"}
          >
            {isLoading ? "Buying..." : "Buy"}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
