import React, { useState, useEffect } from 'react';
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


// Function to get risk level based on age
const getRiskLevel = (age) => {
  if (age < 21) return 'High Risk';
  if (age < 25) return 'Medium Risk';
  return 'Low Risk';
};

const HumanFactorCharts = () => {

  const [data, usersData] = useState([])

  useEffect(()=>{
    fetch("http://localhost:8000/analysis")
    .then(res => res.json())
    .then(data => usersData(data))
    .catch(err => console.log(err))
  },[])
  // Group by Age for Risk Analysis
  const ageGroups = {
    'Below 20': { 'High Risk': 0, 'Medium Risk': 0, 'Low Risk': 0 },
    '20-24': { 'High Risk': 0, 'Medium Risk': 0, 'Low Risk': 0 },
    '25+': { 'High Risk': 0, 'Medium Risk': 0, 'Low Risk': 0 },
  };

  // Group by Age for Emotional States (Fear, Urgency, Pressure)
  const emotionLevels = {
    'Below 20': { fear: [], urgency: [], pressure: [] },
    '20-24': { fear: [], urgency: [], pressure: [] },
    '25+': { fear: [], urgency: [], pressure: [] },
  };

  data.forEach((user) => {
    const risk = getRiskLevel(user.age);
    if (user.age < 20) {
      ageGroups['Below 20'][risk]++;
      emotionLevels['Below 20'].fear.push(user.fear);
      emotionLevels['Below 20'].urgency.push(user.urgency);
      emotionLevels['Below 20'].pressure.push(user.pressure);
    } else if (user.age < 25) {
      ageGroups['20-24'][risk]++;
      emotionLevels['20-24'].fear.push(user.fear);
      emotionLevels['20-24'].urgency.push(user.urgency);
      emotionLevels['20-24'].pressure.push(user.pressure);
    } else {
      ageGroups['25+'][risk]++;
      emotionLevels['25+'].fear.push(user.fear);
      emotionLevels['25+'].urgency.push(user.urgency);
      emotionLevels['25+'].pressure.push(user.pressure);
    }
  });

  // Calculate average fear, urgency, and pressure for each group
  const averageEmotionLevels = (emotionArray) => {
    return emotionArray.reduce((sum, value) => sum + value, 0) / emotionArray.length;
  };

  const emotionCharts = {
    fear: {
      labels: Object.keys(emotionLevels),
      datasets: [
        {
          label: 'Average Fear Level',
          data: Object.values(emotionLevels).map(group => averageEmotionLevels(group.fear)),
          backgroundColor: '#f94144',
        },
      ],
    },
    urgency: {
      labels: Object.keys(emotionLevels),
      datasets: [
        {
          label: 'Average Urgency Level',
          data: Object.values(emotionLevels).map(group => averageEmotionLevels(group.urgency)),
          backgroundColor: '#f3722c',
        },
      ],
    },
    pressure: {
      labels: Object.keys(emotionLevels),
      datasets: [
        {
          label: 'Average Pressure Level',
          data: Object.values(emotionLevels).map(group => averageEmotionLevels(group.pressure)),
          backgroundColor: '#43aa8b',
        },
      ],
    },
  };

  // Risk Analysis by Age Groups
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

  // Qualifications and Skill Levels
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

  // Custom Styles
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
                  legend: { position: 'top', labels: { color: '#fff' } },
                  tooltip: { mode: 'index', intersect: false },
                },
                scales: {
                  x: {
                    stacked: true,
                    ticks: { color: '#fff' },
                    grid: { color: '#333' },
                  },
                  y: {
                    stacked: true,
                    ticks: { color: '#fff' },
                    grid: { color: '#333' },
                  },
                },
              }}
            />
          </div>

          <div className="chart-card">
            <h3>Average Fear Level (By Age Group)</h3>
            <Bar data={emotionCharts.fear} />
          </div>

          <div className="chart-card">
            <h3>Average Urgency Level (By Age Group)</h3>
            <Bar data={emotionCharts.urgency} />
          </div>

          <div className="chart-card">
            <h3>Average Pressure Level (By Age Group)</h3>
            <Bar data={emotionCharts.pressure} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HumanFactorCharts;
