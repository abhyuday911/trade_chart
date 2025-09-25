import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useToast } from '@/hooks/use-toast';
import { TokenData, PriceUpdate } from '@/types/trading';
import { mockTokens } from '@/data/mockTokens';

// Mock WebSocket connection for real-time updates
class MockWebSocket {
  private callbacks: ((data: PriceUpdate) => void)[] = [];
  private interval: NodeJS.Timeout | null = null;

  connect() {
    this.interval = setInterval(() => {
      // Simulate random price updates
      const randomToken = mockTokens[Math.floor(Math.random() * mockTokens.length)];
      const update: PriceUpdate = {
        tokenId: randomToken.id,
        price: randomToken.currentPrice * (1 + (Math.random() - 0.5) * 0.05),
        change: (Math.random() - 0.5) * 10,
        timestamp: new Date()
      };
      
      this.callbacks.forEach(callback => callback(update));
    }, 2000);
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
      this.callbacks = this.callbacks.filter(cb => cb !== callback);
    };
  }
}

const wsConnection = new MockWebSocket();

export const useTradingData = (timeframe: string = '1h') => {
  const queryClient = useQueryClient();
  
  const { data: tokens = [], isLoading, error } = useQuery({
    queryKey: ['tokens', timeframe],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockTokens;
    },
    staleTime: 30000, // 30 seconds
  });

  const updateTokenPrice = useMutation({
    mutationFn: async (update: PriceUpdate) => {
      // Simulate API call to update price
      return update;
    },
    onSuccess: (update) => {
      // console.log('Updating token price for:', update.tokenId, 'New price:', update.price);
      queryClient.setQueryData(['tokens', timeframe], (oldTokens: TokenData[] | undefined) => {
        if (!oldTokens) return [];
        const updatedTokens = oldTokens.map((token) => {
          if (token.id !== update.tokenId) return token;

          const prevPrice = token.currentPrice;
          const nextPrice = update.price;
          const nextHistory = [...token.priceHistory.slice(1), nextPrice];
          const ratio = prevPrice ? nextPrice / prevPrice : 1;

          // Derive percentage change from the visible window
          const first = nextHistory[0] ?? nextPrice;
          const last = nextHistory[nextHistory.length - 1] ?? nextPrice;
          const percentChange = first ? ((last - first) / first) * 100 : 0;

          return {
            ...token,
            currentPrice: nextPrice,
            priceHistory: nextHistory,
            lastUpdated: update.timestamp,
            // Update fields used in the UI so values visibly change
            marketCap: Math.max(0, Math.round(token.marketCap * ratio)),
            marketCapChange24h: percentChange,
            volume24h: Math.max(0, Math.round(token.volume24h * (1 + (Math.random() - 0.5) * 0.02))),
            transactions5m: Math.max(0, Math.round(token.transactions5m * (1 + (Math.random() - 0.5) * 0.1))),
            transactions24h: Math.max(0, Math.round(token.transactions24h * (1 + (Math.random() - 0.5) * 0.02))),
            fdv: Math.max(0, Math.round(token.fdv * ratio)),
            priceChange1h: percentChange,
            priceChange24h: percentChange,
          };
        });
        console.log('Updated tokens in cache:', updatedTokens[0]);
        return updatedTokens;
      });
    },
  });

  useEffect(() => {
    wsConnection.connect();
    
    const unsubscribe = wsConnection.subscribe((update) => {
      console.log('Price update received:', update);
      updateTokenPrice.mutate(update);
    });

    return () => {
      unsubscribe();
      wsConnection.disconnect();
    };
  }, [timeframe]);

  return {
    tokens,
    isLoading,
    error,
    refetch: () => queryClient.invalidateQueries({ queryKey: ['tokens'] }),
  };
};
