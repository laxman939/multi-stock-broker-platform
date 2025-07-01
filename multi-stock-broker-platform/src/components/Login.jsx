import { useState } from "react";
import mockApiService from "../APIs/mockAPIService";

const Login = ({ broker, onLogin, onBack }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await mockApiService.loginToBroker(
        broker.id,
        credentials
      );

      if (response.status === 200) {
        onLogin(response.data);
      } else if (response.status === 400) {
        setError(
          "Invalid credentials. Please check your username and password."
        );
      } else if (response.status === 500) {
        setError("Server error. Please try again later.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-3xl mr-2">{broker.logo}</span>
            <h1 className="text-2xl font-bold text-gray-800">{broker.name}</h1>
          </div>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <button
            type="button"
            onClick={onBack}
            className="w-full text-gray-600 py-2 hover:text-gray-800 transition-colors"
          >
            Back to Broker Selection
          </button>
        </form>

        <div className="mt-6 text-xs text-gray-500 text-center">
          <p>Test credentials:</p>
          <p>
            Username: 'test' (success) | 'invalid' (400 error) | 'error' (500
            error)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
