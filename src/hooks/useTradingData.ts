import { useEffect, useRef, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TokenData, PriceUpdate } from "@/types/trading";
import { mockTokens } from "@/data/mockTokens";

export const useTradingData = (timeframe: string = "1h") => {
  const queryClient = useQueryClient();

  // Mock WebSocket connection for real-time updates
  class MockWebSocket {
    private callbacks: ((data: PriceUpdate) => void)[] = [];
    private interval: NodeJS.Timeout | null = null;
    private getQueryData: (
      key: (string | TokenData[])[]
    ) => TokenData[] | undefined;
    private timeframe: string;

    constructor(
      getQueryData: (key: (string | TokenData[])[]) => TokenData[] | undefined,
      timeframe: string
    ) {
      this.getQueryData = getQueryData;
      this.timeframe = timeframe;
    }

    connect() {
      this.interval = setInterval(() => {
        // Simulate random price updates
        const currentTokens = this.getQueryData([
          "tokens",
          this.timeframe,
        ]) as TokenData[];

        if (!currentTokens || currentTokens.length === 0) {
          return;
        }

        const randomToken =
          currentTokens[Math.floor(Math.random() * currentTokens.length)];

        const update: PriceUpdate = {
          tokenId: randomToken.id,
          price: randomToken.currentPrice * (1 + (Math.random() - 0.5) * 0.5),
          change: (Math.random() - 0.5) * 10,
          timestamp: new Date(),
        };

        this.callbacks.forEach((callback) => callback(update));
      }, 2000); // Reduced frequency from 500ms to 2000ms
    }

    disconnect() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }

    subscribe(callback: (data: PriceUpdate) => void) {
      this.callbacks.push(callback);
      return () => {
        this.callbacks = this.callbacks.filter((cb) => cb !== callback);
      };
    }
  }

  const {
    data: tokens = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tokens", timeframe],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return mockTokens;
    },
    staleTime: 0, // Always refetch when timeframe changes
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const updateTokenPrice = useMutation({
    mutationFn: async (update: PriceUpdate) => {
      return update;
    },
    onSuccess: (update) => {
      queryClient.setQueryData(
        ["tokens", timeframe],
        (oldTokens: TokenData[] | undefined) => {
          if (!oldTokens) return [];

          const updatedTokens = oldTokens.map((token) => {
            if (token.id !== update.tokenId) return token;

            const prevPrice = token.currentPrice;
            const nextPrice = update.price;
            const nextHistory = [...token.priceHistory.slice(1), nextPrice];
            const ratio = prevPrice ? nextPrice / prevPrice : 1;

            const first = nextHistory[0] ?? nextPrice;
            const last = nextHistory[nextHistory.length - 1] ?? nextPrice;
            const percentChange = first ? ((last - first) / first) * 100 : 0;

            const priceChange1h =
              token.priceHistory.length > 0
                ? ((nextPrice -
                    token.priceHistory[token.priceHistory.length - 1]) /
                    token.priceHistory[token.priceHistory.length - 1]) *
                  100
                : 0;
            const priceChange24h =
              token.priceHistory.length > 23
                ? ((nextPrice -
                    token.priceHistory[token.priceHistory.length - 24]) /
                    token.priceHistory[token.priceHistory.length - 24]) *
                  100
                : 0;

            return {
              ...token,
              currentPrice: nextPrice,
              priceHistory: nextHistory,
              lastUpdated: update.timestamp,
              marketCap: Math.max(0, Math.round(token.marketCap * ratio)),
              marketCapChange24h: percentChange,
              volume24h: Math.max(
                0,
                Math.round(token.volume24h * (1 + (Math.random() - 0.5) * 0.02))
              ),
              transactions5m: Math.max(
                0,
                Math.round(
                  token.transactions5m * (1 + (Math.random() - 0.5) * 0.1)
                )
              ),
              transactions24h: Math.max(
                0,
                Math.round(
                  token.transactions24h * (1 + (Math.random() - 0.5) * 0.02)
                )
              ),
              fdv: Math.max(0, Math.round(token.fdv * ratio)),
              priceChange1h: priceChange1h,
              priceChange24h: priceChange24h,
            };
          });
          return updatedTokens;
        }
      );
    },
  });

  const memoizedUpdateTokenPrice = useCallback(updateTokenPrice.mutate, [
    updateTokenPrice,
  ]);

  const wsRef = useRef<MockWebSocket | null>(null);

  useEffect(() => {
    // Clean up existing WebSocket when timeframe changes
    if (wsRef.current) {
      wsRef.current.disconnect();
      wsRef.current = null;
    }

    // Only start WebSocket if we have tokens data
    if (tokens.length > 0) {
      // Create new WebSocket for the new timeframe
      wsRef.current = new MockWebSocket(
        queryClient.getQueryData.bind(queryClient),
        timeframe
      );
      wsRef.current.connect();

      const unsubscribe = wsRef.current.subscribe((update) => {
        memoizedUpdateTokenPrice(update);
      });

      return () => {
        unsubscribe();
        if (wsRef.current) {
          wsRef.current.disconnect();
          wsRef.current = null;
        }
      };
    }
  }, [queryClient, timeframe, memoizedUpdateTokenPrice, tokens.length]);

  return {
    tokens,
    isLoading,
    error,
    refetch: () => queryClient.invalidateQueries({ queryKey: ["tokens"] }),
  };
};
