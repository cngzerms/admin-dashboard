import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
    labels: ['1Aug', '2Aug', '3Aug', '4Aug', '5Aug', '6Aug'],
    datasets: [
      {
        label: 'Desktop',
        data: [16, 5, 18, 26, 28, 18, 18],
        backgroundColor: '#1665D8',
      },
      {
        label: 'Mobile',
        data: [11, 19, 12, 28, 29, 24, 14],
        backgroundColor: '#E4E7EB',
      }],
    };
  
  

const DashboardChart = () => {
    return (
        <Bar 
            data={data}
            height={170}
            width={500}
        />
    )
}

export default DashboardChart;