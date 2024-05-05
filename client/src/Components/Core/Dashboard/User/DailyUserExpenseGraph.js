import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { viewUserDailyExpense } from '../../../../Services/operations/expense';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, TimeSeriesScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, TimeScale, TimeSeriesScale);



function DailyUserExpenseGraph() {
  const [loading, setLoading] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const getExpenseData = async () => {
      try {
        setLoading(true);
        const res = await viewUserDailyExpense(user._id, token);
        setExpenseData(res.data.expenseData);
        setLoading(false);
      } catch (error) {
        console.log("Error occurred in fetching user daily expense data: ", error);
        setLoading(false);
      }
    };

    getExpenseData();
  }, []);

  const dataPoints = expenseData.map((item) => ({
    x: new Date(item._id.year, item._id.month - 1, item._id.date),
    y: item.expenseAmount,
  }));

  
  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Daily User Expense',
      },
    },
    scales: {
      x: {
        type: 'time', // Use 'time' for x-axis
        time: {
          unit: 'day', // set the time unit to day
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Expense Amount',
        },
      },
    },
  };

  const data = {
    datasets: [
      {
        label: 'Daily Expense',
        data: dataPoints,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className='w-[100%]'>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <Line options={options} className='pb-2' height={180} data={data} />
      )}
    </div>
  );
}

export default DailyUserExpenseGraph;
