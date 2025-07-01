const mockApiService = {
  // Simulate broker login
  loginToBroker: async (brokerId, credentials) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

    // Mock different response scenarios
    if (credentials.username === "error")
      return { status: 500, message: "Server error" };
    if (credentials.username === "invalid")
      return { status: 400, message: "Invalid credentials" };

    return {
      status: 200,
      data: {
        token: "mock-jwt-token",
        user: { id: 1, name: "John Doe", broker: brokerId },
      },
    };
  },

  // Mock Holdings API
  getHoldings: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      status: 200,
      data: [
        {
          symbol: "AAPL",
          name: "Apple Inc.",
          quantity: 10,
          avgPrice: 150.25,
          currentPrice: 175.3,
          pnl: 250.5,
          pnlPercent: 16.67,
        },
        {
          symbol: "GOOGL",
          name: "Alphabet Inc.",
          quantity: 5,
          avgPrice: 2800.0,
          currentPrice: 2750.8,
          pnl: -246.0,
          pnlPercent: -1.75,
        },
        {
          symbol: "TSLA",
          name: "Tesla Inc.",
          quantity: 8,
          avgPrice: 220.5,
          currentPrice: 245.75,
          pnl: 202.0,
          pnlPercent: 11.45,
        },
        {
          symbol: "MSFT",
          name: "Microsoft Corp.",
          quantity: 15,
          avgPrice: 310.2,
          currentPrice: 335.6,
          pnl: 381.0,
          pnlPercent: 8.19,
        },
      ],
    };
  },

  // Mock Orderbook API
  getOrderbook: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      status: 200,
      data: {
        orders: [
          {
            id: 1,
            symbol: "AAPL",
            type: "BUY",
            quantity: 10,
            price: 175.3,
            status: "EXECUTED",
            date: "2024-01-15",
          },
          {
            id: 2,
            symbol: "GOOGL",
            type: "SELL",
            quantity: 2,
            price: 2750.8,
            status: "PENDING",
            date: "2024-01-14",
          },
          {
            id: 3,
            symbol: "TSLA",
            type: "BUY",
            quantity: 5,
            price: 245.75,
            status: "EXECUTED",
            date: "2024-01-13",
          },
          {
            id: 4,
            symbol: "MSFT",
            type: "BUY",
            quantity: 15,
            price: 335.6,
            status: "CANCELLED",
            date: "2024-01-12",
          },
        ],
        pnl: {
          unrealized: 587.5,
          realized: 1250.75,
        },
      },
    };
  },

  // Mock Positions API
  getPositions: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      status: 200,
      data: {
        positions: [
          {
            symbol: "NIFTY50",
            type: "LONG",
            quantity: 100,
            entryPrice: 21500.0,
            currentPrice: 21650.0,
            pnl: 1500.0,
            pnlPercent: 0.7,
          },
          {
            symbol: "BANKNIFTY",
            type: "SHORT",
            quantity: 50,
            entryPrice: 45200.0,
            currentPrice: 44950.0,
            pnl: 1250.0,
            pnlPercent: 0.55,
          },
          {
            symbol: "RELIANCE",
            type: "LONG",
            quantity: 25,
            entryPrice: 2450.0,
            currentPrice: 2380.0,
            pnl: -1750.0,
            pnlPercent: -2.86,
          },
        ],
        totalPnl: 1000.0,
      },
    };
  },
};

export default mockApiService;
