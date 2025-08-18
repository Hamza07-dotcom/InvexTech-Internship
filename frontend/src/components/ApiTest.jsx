"use client";
import { useState, useEffect } from 'react';
import { verifyApiConnection, getAllCars } from '@/services/api';

export default function ApiTest() {
  const [apiStatus, setApiStatus] = useState(null);
  const [carsData, setCarsData] = useState(null);
  const [error, setError] = useState(null);

  const checkApi = async () => {
    try {
      setError(null);
      const status = await verifyApiConnection();
      setApiStatus(status);
      
      if (status.status === 'connected') {
        const cars = await getAllCars();
        setCarsData(cars);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    checkApi();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">API Connection Test</h2>
      
      {/* API Status */}
      <div className="mb-6 p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">API Status:</h3>
        {apiStatus ? (
          <div>
            <p className={`font-medium ${apiStatus.status === 'connected' ? 'text-green-600' : 'text-red-600'}`}>
              Status: {apiStatus.status}
            </p>
            {apiStatus.latency && <p>Latency: {apiStatus.latency}ms</p>}
            {apiStatus.message && <p>Message: {apiStatus.message}</p>}
            {apiStatus.suggestion && (
              <p className="mt-2 text-sm text-gray-600">
                Suggestion: {apiStatus.suggestion}
              </p>
            )}
          </div>
        ) : (
          <p>Checking API connection...</p>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 border border-red-200 rounded-lg bg-red-50">
          <h3 className="font-semibold text-red-600 mb-2">Error:</h3>
          <p className="text-red-600">{error}</p>
          <div className="mt-4 text-sm text-gray-600">
            <p className="font-semibold">Troubleshooting steps:</p>
            <ol className="list-decimal pl-4 mt-2">
              <li>Check if your backend server is running</li>
              <li>Verify the API URL in .env.local file</li>
              <li>Check if the port number matches your backend server</li>
              <li>Look for CORS errors in browser console (F12)</li>
            </ol>
          </div>
        </div>
      )}

      {/* Data Preview */}
      {carsData && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Sample Data:</h3>
          <pre className="p-4 bg-gray-50 rounded-lg overflow-auto max-h-60">
            {JSON.stringify(carsData, null, 2)}
          </pre>
        </div>
      )}

      <button
        onClick={checkApi}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Test Connection Again
      </button>
    </div>
  );
}
