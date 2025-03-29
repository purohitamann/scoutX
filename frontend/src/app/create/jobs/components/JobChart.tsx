'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const applicationData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Number of Applicants',
      data: [12, 19, 25, 35, 42, 50],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      tension: 0.4
    }
  ]
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Application Trends'
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

export default function JobChart() {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Application Trends</h2>
      <div className="h-64">
        <Line options={options} data={applicationData} />
      </div>
    </div>
  );
} 