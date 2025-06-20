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

// Sample user data
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
  // Age Distribution
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

  // Qualification Distribution
  const qualifications = {};
  data.forEach((user) => {
    qualifications[user.qualification] = (qualifications[user.qualification] || 0) + 1;
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

  // Level Distribution
  const levels = {};
  data.forEach((user) => {
    levels[user.level] = (levels[user.level] || 0) + 1;
  });

  const levelChart = {
    labels: Object.keys(levels),
    datasets: [
      {
        data: Object.values(levels),
        backgroundColor: ['#ffce56', '#ff6384', '#36a2eb'],
      },
    ],
  };

  

  return (
    <div>
      <h2  style={{color:"white"}}>Human Factor & Risk Analysis</h2>
      <div >
  
        <h3  style={{color:"white"}}>Qualification Breakdown</h3>
        <Pie data={qualificationChart} />

        <h3 style={{color:"white"}}>Skill Level Breakdown</h3>
        <Doughnut data={levelChart} />

       <h3  style={{color:"white"}}>Risk Level Analysis (By Age Group)</h3>
        <Bar
          data={riskChart}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                mode: 'index',
                intersect: false,
              },
            },
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default HumanFactorCharts;
