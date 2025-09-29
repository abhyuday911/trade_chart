import React, { useEffect } from "react";
import { TokenData } from "@/types/trading";
import { TokenRow } from "./TradingRows";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

interface TradingTableProps {
  tokens: TokenData[];
  isLoading?: boolean;
  sortField: keyof TokenData | null;
  sortDirection: "asc" | "desc";
  onSortChange: (field: keyof TokenData, direction: "asc" | "desc") => void;
}

export const TradingTable: React.FC<TradingTableProps> = ({
  tokens,
  isLoading = false,
  sortField,
  sortDirection,
  onSortChange,
}) => {
  const headers: { label: string; key: keyof TokenData | null }[] = [
    { label: "Pair Info", key: "symbol" },
    { label: "Market Cap", key: "marketCap" },
    { label: "Liquidity", key: "liquidity" },
    { label: "Volume", key: "volume24h" },
    { label: "TXNS", key: "transactions24h" },
    { label: "Token Info", key: "holders" },
    { label: "Action", key: null }, // No sorting for "Action"
  ];

  const handleSort = (key: keyof TokenData | null) => {
    if (!key) return;
    if (sortField === key) {
      const nextDirection = sortDirection === "asc" ? "desc" : "asc";
      onSortChange(key, nextDirection);
    } else {
      onSortChange(key, "asc");
    }
  };


  return (
    <Card className="overflow-hidden py-0 h-full bg-backgroundSecondary border-primaryStroke border-[1px] flex flex-col w-full min-w-[0px] justify-start items-start rounded-[8px] sm:rounded-[4px] overflow-y-hidden overflow-x-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-backgroundSecondary z-15">
          <TableRow className="hover:bg-inherit">
            {headers.map(({ label, key }, idx) => (
              <TableHead
                key={label}
                className="font-medium  text-muted-foreground px-0 first:sm:px-[12px] h-[32px] sm:h-[48px] min-h-[32px] sm:min-h-[48px] max-h-[32px] cursor-pointer select-none" // Added `select-none` here
                onClick={() => key && handleSort(key as keyof TokenData)}
              >
                <div
                  className={`flex flex-row gap-[4px] px-[12px] ${
                    idx === headers.length - 1 ? "justify-end" : "justify-start"
                  } items-center`}
                >
                  <span className="text-textTertiary text-[12px] font-medium">
                    {label}
                  </span>
                  <span className="w-4 h-4 flex items-center justify-center">
                    {sortField === key &&
                      (sortDirection === "asc" ? (
                        <ArrowUp className="w-4 h-4" />
                      ) : (
                        <ArrowDown className="w-4 h-4" />
                      ))}
                  </span>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tokens.map((token) => (
            <TokenRow key={token.id} token={token} isLoading={isLoading} />
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
