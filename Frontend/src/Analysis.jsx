import React from 'react';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const data = [
  {
    id: 3,
    name: 'Dhivya',
    email: 'dhivya0987@gmail.com',
    password: 'dhivya0987',
    age: 22,
    qualification: "Master's",
    level: 'Beginner',
  },
  {
    id: 4,
    name: 'Ajith',
    email: 'ajith2023@gmail.com',
    password: 'nalu0nalu',
    age: 25,
    qualification: "Bachelor's",
    level: 'Intermediate',
  },
  {
    id: 5,
    name: 'ashwin',
    email: 'ashwin2000@gmail.com',
    password: 'ashwin2000',
    age: 20,
    qualification: "Bachelor's",
    level: 'Beginner',
  },
];

const getRiskLevel = (age) => {
  if (age < 21) return 'High Risk';
  if (age < 25) return 'Medium Risk';
  return 'Low Risk';
};

const HumanFactorCharts = () => {
  const ageChart = {
    labels: data.map((user) => user.name),
    datasets: [
      {
        label: 'Age',
        data: data.map((user) => user.age),
        backgroundColor: '#4bc0c0',
      },
    ],
  };

  const ageGroups = {
    'Below 20': { 'High Risk': 0, 'Medium Risk': 0, 'Low Risk': 0 },
    '20-24': { 'High Risk': 0, 'Medium Risk': 0, 'Low Risk': 0 },
    '25+': { 'High Risk': 0, 'Medium Risk': 0, 'Low Risk': 0 },
  };

  data.forEach((user) => {
    const risk = getRiskLevel(user.age);
    if (user.age < 20) {
      ageGroups['Below 20'][risk]++;
    } else if (user.age < 25) {
      ageGroups['20-24'][risk]++;
    } else {
      ageGroups['25+'][risk]++;
    }
  });

  const riskChart = {
    labels: Object.keys(ageGroups),
    datasets: [
      {
        label: 'High Risk',
        data: Object.values(ageGroups).map(group => group['High Risk']),
        backgroundColor: '#f94144',
      },
      {
        label: 'Medium Risk',
        data: Object.values(ageGroups).map(group => group['Medium Risk']),
        backgroundColor: '#f3722c',
      },
      {
        label: 'Low Risk',
        data: Object.values(ageGroups).map(group => group['Low Risk']),
        backgroundColor: '#43aa8b',
      },
    ],
  };

  const qualifications = {};
  const levels = {};
  data.forEach((user) => {
    qualifications[user.qualification] = (qualifications[user.qualification] || 0) + 1;
    levels[user.level] = (levels[user.level] || 0) + 1;
  });

  const qualificationChart = {
    labels: Object.keys(qualifications),
    datasets: [
      {
        data: Object.values(qualifications),
        backgroundColor: ['#ff6384', '#36a2eb'],
      },
    ],
  };

  const levelChart = {
    labels: Object.keys(levels),
    datasets: [
      {
        data: Object.values(levels),
        backgroundColor: ['#ffce56', '#ff6384', '#36a2eb'],
      },
    ],
  };

  const styles = `
    body {
      margin: 0;
      background: #1e1f26;
      font-family: 'Segoe UI', sans-serif;
    }

    .dashboard {
      padding: 40px;
      display: flex;
      flex-direction: column;
      gap: 40px;
      color: #ffffff;
    }

    .dashboard h2 {
      font-size: 32px;
      margin-bottom: 20px;
    }

    .chart-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
    }

    .chart-card {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 16px;
      padding: 20px;
      backdrop-filter: blur(10px);
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    }

    .chart-card h3 {
      margin-bottom: 10px;
      font-size: 18px;
      font-weight: 500;
      color: #cbd5e1;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="dashboard">
        <h2>📊 Human Factor & Risk Analysis</h2>

        <div className="chart-section">
          <div className="chart-card">
            <h3>Qualification Breakdown</h3>
            <Pie data={qualificationChart} />
          </div>

          <div className="chart-card">
            <h3>Skill Level Breakdown</h3>
            <Doughnut data={levelChart} />
          </div>

          <div className="chart-card" style={{ gridColumn: '1 / -1' }}>
            <h3>Risk Level Analysis (By Age Group)</h3>
            <Bar
              data={riskChart}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: { color: '#fff' }
                  },
                  tooltip: {
                    mode: 'index',
                    intersect: false,
                  },
                },
                scales: {
                  x: {
                    stacked: true,
                    ticks: { color: '#fff' },
                    grid: { color: '#333' }
                  },
                  y: {
                    stacked: true,
                    ticks: { color: '#fff' },
                    grid: { color: '#333' }
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HumanFactorCharts;
