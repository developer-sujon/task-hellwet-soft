import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const StatusChart = ({ dashboardSummary }) => {
  console.log(dashboardSummary?.map((i) => i.count));

  const data = {
    labels: [...dashboardSummary?.map((i) => i._id)],
    datasets: [
      {
        label: 'status of count',
        data: [...dashboardSummary?.map((i) => i.count)],
        backgroundColor: ['#82d616', '#21bf73', '#ea0606', '#17c1e8'],
        borderColor: ['#82d616', '#21bf73', '#ea0606', '#17c1e8'],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
};

export default StatusChart;
