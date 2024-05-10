import { balanceSheet } from '../../../../Services/operations/group';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import BalanceSheetCard from '../../../Common/BalanceSheetCard';

function BalanceSheet() {
  const [balanceData, setBalanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { group } = useSelector((state) => state.group);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = { groupId: group._id };
        const response = await balanceSheet(data, token);
        console.log("Balance Sheet Data:", response.data);
        setBalanceData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function to prevent memory leaks
    return () => {};
  }, [group._id, token]);

  return (
    <div className="flex flex-col gap-y-6 rounded-md p-8 px-12">
      <h2 className="text-lg font-semibold text-white-100">Balance Sheet</h2>
      {/* Conditionally render BalanceSheetCard based on balanceData availability */}
      {loading ? (
        <p>Loading balance sheet...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : balanceData.length === 0 ? (
        <p>No balance sheet data available.</p>
      ) : (
        balanceData.map((data, index) => (
          <div key={index} className="mt-4">
            <BalanceSheetCard data={data} />
          </div>
        ))
      )}
    </div>
  );
}

export default BalanceSheet;
