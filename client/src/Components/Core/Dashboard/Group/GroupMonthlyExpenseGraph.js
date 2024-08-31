import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';


ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, TimeScale);


function GroupMonthlyExpenseGraph({groupId, expenseData}) {
  const [loading, setLoading] = useState(false);
    const dataPoints = expenseData.map((item) => ({
        x: new Date(item._id.year, item._id.month - 1),
        y: item.totalExpense,
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
                text: 'Monthly User Expense',
            },
        },
        scales: {
            x: {
                type: 'time', // Use 'time' for x-axis
                time: {
                    unit: 'month', // set the time unit to month
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
                fill: true,
                label: 'Monthly Expense',
                data: dataPoints,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
        ],
    };

    return (
        <div className='md:h-[20.3rem] border border-gray-500 rounded-md px-7 py-3'>
            <p className='text-[16px] text-white-100'>User Monthly Expense Statistics</p>
            {!loading && expenseData.length > 0 && (
                <Line options={options} className='' data={data} />
            )}
            {!loading && expenseData.length==0 && (
                <div className='h-full text-[16px] text-gray-400 flex justify-center items-center'>
                        You do not have any recent expense.
                </div>
            )}
        </div>
    );
}

export default GroupMonthlyExpenseGraph