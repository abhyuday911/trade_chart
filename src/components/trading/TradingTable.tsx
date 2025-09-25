import React, { useState } from "react";
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
import { mockTokens } from "@/data/mockTokens";
import { ArrowDown, ArrowUp } from "lucide-react";

interface TradingTableProps {
  tokens: TokenData[];
  isLoading?: boolean;
}

export const TradingTable: React.FC<TradingTableProps> = ({
  tokens,
  isLoading = false,
}) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const headers = [
    { label: "Pair Info", key: "symbol" },
    { label: "Market Cap", key: "marketCap" },
    { label: "Liquidity", key: "liquidity" },
    { label: "Volume", key: "volume24h" },
    { label: "TXNS", key: "transactions24h" },
    { label: "Token Info", key: "holders" },
    { label: "Action", key: null }, // No sorting for "Action"
  ];

  // Sorting logic
  const sortedTokens = [...tokens].sort((a, b) => {
    if (!sortColumn) return 0; // No sorting if no column is selected

    const aValue = a[sortColumn as keyof TokenData];
    const bValue = b[sortColumn as keyof TokenData];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  // Handle header click
  const handleSort = (key: string | null) => {
    if (sortColumn === key) {
      // Toggle direction if the same column is clicked
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new column and default to ascending
      setSortColumn(key);
      setSortDirection("asc");
    }
  };

  return (
    <Card className="overflow-hidden py-0 h-full bg-backgroundSecondary border-primaryStroke border-[1px] flex flex-col w-full min-w-[0px] justify-start items-start rounded-[8px] sm:rounded-[4px] overflow-y-hidden overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-inherit">
            {headers.map(({ label, key }) => (
              <TableHead
                key={label}
                className="font-medium text-muted-foreground px-0 first:sm:px-[12px] h-[32px] sm:h-[48px] min-h-[32px] sm:min-h-[48px] max-h-[32px] cursor-pointer select-none" // Added `select-none` here
                onClick={() => key && handleSort(key)}
              >
                <div className="flex flex-row gap-[4px] px-[12px] justify-start items-center">
                  <span className="text-textTertiary text-[12px] font-medium">
                    {label}
                  </span>
                  <span className="w-4 h-4 flex items-center justify-center">
                    {sortColumn === key &&
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
          {sortedTokens.map((token) => (
            <TokenRow
              key={token.id}
              token={mockTokens.find((t) => t.id === token.id) || token}
              isLoading={isLoading}
            />
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
