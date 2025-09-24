import React from "react";
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

interface TradingTableProps {
  tokens: TokenData[];
  isLoading?: boolean;
}

export const TradingTable: React.FC<TradingTableProps> = ({
  tokens,
  isLoading = false,
}) => {
  const headers = [
    "Pair Info",
    "Market Cap",
    "Liquidity",
    "Volume",
    "TXNS",
    "Token Info",
    "Action",
  ];

  return (
    <Card className="overflow-hidden py-0 h-full bg-backgroundSecondary border-primaryStroke border-[1px] flex flex-col w-full min-w-[0px] justify-start items-start rounded-[8px] sm:rounded-[4px] overflow-y-hidden overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-inherit">
            {headers.map((header) => (
              <TableHead
                key={header}
                className="font-medium text-muted-foreground px-0 first:sm:px-[12px] h-[32px] sm:h-[48px] min-h-[32px] sm:min-h-[48px] max-h-[32px]"
              >
                <div className="flex flex-row gap-[4px] px-[12px] justify-start items-center ">
                  <span className="text-textTertiary text-[12px] font-medium">
                    {header}
                  </span>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tokens.map((token) => (
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
