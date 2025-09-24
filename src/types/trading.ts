export interface TokenData {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  contractAddress: string;
  logoUrl: string;
  marketCap: number;
  marketCapChange24h: number;
  liquidity: number;
  volume24h: number;
  transactions24h: number;
  transactions5m: number;
  priceHistory: number[];
  currentPrice: number;
  priceChange1h: number;
  priceChange24h: number;
  holders: number;
  fdv: number;
  verified: boolean;
  audit: "paid" | "unpaid" | null;
  socials: {
    website?: string;
    twitter?: string;
    telegram?: string;
    discord?: string;
  };
  tags: string[];
  createdAt: Date;
  lastUpdated: Date;
}

export interface MarketFilters {
  timeframe: "1m" | "5m" | "30m" | "1h" | "4h" | "1d";
  minMarketCap: number;
  maxMarketCap: number;
  minLiquidity: number;
  verified: boolean;
  audited: boolean;
}

export interface PriceUpdate {
  tokenId: string;
  price: number;
  change: number;
  timestamp: Date;
}

export interface TransactionData {
  type: "buy" | "sell";
  amount: number;
  price: number;
  timestamp: Date;
  hash: string;
}
