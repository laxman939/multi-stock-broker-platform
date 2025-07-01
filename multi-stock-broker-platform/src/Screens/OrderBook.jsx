import { useEffect, useState } from "react";
import mockApiService from "../APIs/mockAPIService";

const Orderbook = ({ onStockSelect, onStocksLoaded }) => {
  const [orderData, setOrderData] = useState({
    orders: [],
    pnl: { unrealized: 0, realized: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderbook = async () => {
      try {
        const response = await mockApiService.getOrderbook();
        setOrderData(response.data);
        // Extract stocks from orders for FAB functionality
        const stocks = response.data.orders.map((order) => ({
          symbol: order.symbol,
          currentPrice: order.price,
        }));
        onStocksLoaded && onStocksLoaded(stocks);
      } catch (error) {
        console.error("Error fetching orderbook:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderbook();
  }, [onStocksLoaded]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="text-sm text-gray-600 mb-1">Unrealized P&L</h3>
          <p
            className={`text-xl font-bold ${
              orderData.pnl.unrealized >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ₹{orderData.pnl.unrealized.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="text-sm text-gray-600 mb-1">Realized P&L</h3>
          <p
            className={`text-xl font-bold ${
              orderData.pnl.realized >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ₹{orderData.pnl.realized.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Orders</h2>
        <div className="space-y-3">
          {orderData.orders.map((order) => (
            <div
              key={order.id}
              onClick={() => {
                onStockSelect({
                  symbol: order.symbol,
                  currentPrice: order.price,
                  type: order.type,
                });
                console.log("Order selected:", order);
              }}
              className="border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {order.symbol}
                  </h3>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      order.type === "BUY"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.type}
                  </span>
                  <p className="text-sm mt-1">₹{order.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Qty: {order.quantity}</span>
                <span
                  className={`font-medium ${
                    order.status === "EXECUTED"
                      ? "text-green-600"
                      : order.status === "PENDING"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orderbook;
