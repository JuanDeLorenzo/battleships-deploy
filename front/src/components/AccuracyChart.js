import React, { useState, useEffect } from 'react';
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

const PerformanceChart = ({ gameData }) => {
  const [performanceData, setPerformanceData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    if (gameData && Array.isArray(gameData)) {
      // Group games by date
      const gamesByDate = {};
      const userId = gameData[0]?.player1_id || null;
      gameData.forEach(game => {
        const date = new Date(game.game_date).toLocaleDateString();
        if (!gamesByDate[date]) gamesByDate[date] = [];
        gamesByDate[date].push(game);
      });
      // Sort dates chronologically
      const sortedDates = Object.keys(gamesByDate).sort((a, b) => new Date(a) - new Date(b));
      // Calculate cumulative win rate up to each day
      let totalGames = 0;
      let totalWins = 0;
      const winRates = [];
      sortedDates.forEach(date => {
        const games = gamesByDate[date];
        games.forEach(game => {
          totalGames++;
          if (game.winner_id === userId) totalWins++;
        });
        winRates.push(totalGames > 0 ? (totalWins / totalGames) * 100 : 0);
      });
      const chartData = {
        labels: sortedDates,
        datasets: [
          {
            label: 'Cumulative Win Rate %',
            data: winRates,
            borderColor: '#1976d2',
            backgroundColor: 'rgba(25, 118, 210, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      };
      setPerformanceData(chartData);
    } else {
      // Fallback to mock data if no real data
      const mockData = {
        labels: ['2024-05-20', '2024-05-21', '2024-05-22', '2024-05-23', '2024-05-24'],
        datasets: [
          {
            label: 'Cumulative Win Rate %',
            data: [50, 60, 66, 75, 80],
            borderColor: '#1976d2',
            backgroundColor: 'rgba(25, 118, 210, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      };
      setPerformanceData(mockData);
    }
  }, [gameData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'black',
          font: {
            family: 'Keania One',
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: 'Perfomance Over Time',
        color: 'black',
        font: {
          family: 'Keania One',
          size: 18
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: 'black',
          font: {
            family: 'Keania One',
            size: 12
          },
          callback: value => `${value}%`
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        ticks: {
          color: 'black',
          font: {
            family: 'Keania One',
            size: 12
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  };

  return (
    <div style={{ width: '97%', height: '97%' }}>
      <Line data={performanceData} options={options} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default PerformanceChart; 