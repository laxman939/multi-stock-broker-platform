import React, { useState } from "react";
import { TrendingUp, TrendingDown, Plus, X } from "lucide-react";
import Login from "../components/Login";
import BrokerSelection from "../components/BrokerSelection";
import OrderPad from "../components/OrderPad";
import Holdings from "../Screens/Holdings";
import Orderbook from "../Screens/OrderBook";
import Positions from "../Screens/Positions";
import FloatingActionButton from "../components/FloatingActionButton";

// Main App Component
const BrokerPlatformApp = () => {
  const [currentView, setCurrentView] = useState("brokerSelection");
  const [selectedBroker, setSelectedBroker] = useState(null);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("holdings");
  const [selectedStock, setSelectedStock] = useState(null);
  const [orderType, setOrderType] = useState(null);
  const [currentScreenStocks, setCurrentScreenStocks] = useState([]);

  // Mock stocks for FAB when no stocks available
  const mockStocks = [
    { symbol: "AAPL", name: "Apple Inc.", currentPrice: 175.3 },
    { symbol: "GOOGL", name: "Alphabet Inc.", currentPrice: 2750.8 },
    { symbol: "MSFT", name: "Microsoft Corp.", currentPrice: 335.6 },
  ];

  const handleBrokerSelect = (broker) => {
    setSelectedBroker(broker);
    setCurrentView("login");
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView("app");
  };

  const handleBackToBrokerSelection = () => {
    setCurrentView("brokerSelection");
    setSelectedBroker(null);
  };

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
    setOrderType(stock.type || "BUY");
  };

  const handleFabAction = (type) => {
    // Get the first stock from current screen or use mock data
    let stockToTrade = null;

    if (currentScreenStocks.length > 0) {
      stockToTrade = currentScreenStocks[0];
    } else {
      // Use first alphabetically sorted mock stock
      stockToTrade = mockStocks.sort((a, b) =>
        a.symbol.localeCompare(b.symbol)
      )[0];
    }

    setSelectedStock(stockToTrade);
    setOrderType(type);
  };

  const handleOrderSubmit = (orderData) => {
    // In real app, this would call API to place order
    alert(
      `${orderData.type} order placed for ${orderData.quantity} shares of ${orderData.symbol}`
    );
  };

  const handleCloseOrderPad = () => {
    setSelectedStock(null);
    setOrderType(null);
  };

  // Update current screen stocks when tab changes
  const updateCurrentScreenStocks = (stocks) => {
    setCurrentScreenStocks(stocks);
  };

  if (currentView === "brokerSelection") {
    return <BrokerSelection onBrokerSelect={handleBrokerSelect} />;
  }

  if (currentView === "login") {
    return (
      <Login
        broker={selectedBroker}
        onLogin={handleLogin}
        onBack={handleBackToBrokerSelection}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{selectedBroker.logo}</span>
          <div>
            <h1 className="font-bold text-gray-800">{selectedBroker.name}</h1>
            <p className="text-sm text-gray-600">Welcome, {user.user.name}</p>
          </div>
        </div>
        <button
          onClick={() => {
            setActiveTab("holdings");
            setCurrentView("brokerSelection");
            setUser(null);
            setSelectedBroker(null);
          }}
          className="text-sm text-red-600 hover:text-red-800"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="pb-20">
        {activeTab === "holdings" && (
          <Holdings
            onStockSelect={handleStockSelect}
            onStocksLoaded={updateCurrentScreenStocks}
          />
        )}
        {activeTab === "orderbook" && (
          <Orderbook
            onStockSelect={handleStockSelect}
            onStocksLoaded={updateCurrentScreenStocks}
          />
        )}
        {activeTab === "positions" && (
          <Positions
            onStockSelect={handleStockSelect}
            onStocksLoaded={updateCurrentScreenStocks}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          <button
            onClick={() => setActiveTab("holdings")}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
              activeTab === "holdings"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <TrendingUp className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Holdings</span>
          </button>
          <button
            onClick={() => setActiveTab("orderbook")}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
              activeTab === "orderbook"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <div className="w-6 h-6 mb-1 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-current rounded"></div>
            </div>
            <span className="text-xs font-medium">Orders</span>
          </button>
          <button
            onClick={() => setActiveTab("positions")}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
              activeTab === "positions"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <TrendingDown className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Positions</span>
          </button>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton
        onBuyClick={() => handleFabAction("BUY")}
        onSellClick={() => handleFabAction("SELL")}
      />

      {/* Order Pad Modal */}
      {selectedStock && orderType && (
        <OrderPad
          stock={selectedStock}
          orderType={orderType}
          onClose={handleCloseOrderPad}
          onSubmit={handleOrderSubmit}
        />
      )}
    </div>
  );
};

export default BrokerPlatformApp;
