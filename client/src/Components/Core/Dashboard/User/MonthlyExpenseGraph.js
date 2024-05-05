import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { viewUserMonthlyExpense } from '../../../../Services/operations/expense';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, TimeScale);

function DailyUserExpenseGraph() {
    const [loading, setLoading] = useState(false);
    const [expenseData, setExpenseData] = useState([]);
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        const getExpenseData = async () => {
            try {
                setLoading(true);
                const res = await viewUserMonthlyExpense(token);
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
        <div>
            {!loading && expenseData.length > 0 && (
                <Line options={options} height={180} className='pb-2' data={data} />
            )}
            {loading && <div>Loading...</div>}
        </div>
    );
}

export default DailyUserExpenseGraph;
