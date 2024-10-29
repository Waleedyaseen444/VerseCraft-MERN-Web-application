// src/components/AdminPanel.js
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import UserManagement from './UserManagement';
import NovelManagement from './NovelManagement';
import './AdminPanel.css';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminPanel = () => {
  const [showUsers, setShowUsers] = useState(false);
  const [showNovels, setShowNovels] = useState(false);

  // Admin Profile Data (Dynamic)
  const [adminProfile, setAdminProfile] = useState({
    name: 'Admin Name',
    email: 'admin@example.com',
    description: 'Administrator of the platform, responsible for managing users and content.',
    image: 'https://via.placeholder.com/80',
  });

  // Activity Log Data (Dynamic & Detailed)
  const [activityLog, setActivityLog] = useState([
    { id: 1, user: 'User X', action: 'logged in', details: 'Successfully logged in from IP 192.168.1.1', time: '10:00 AM' },
    { id: 2, user: 'Writer A', action: 'added a new novel', details: 'Added a novel titled "Mystery of the Lost Island"', time: '11:00 AM' },
    { id: 3, user: 'Admin', action: 'updated user permissions', details: 'Updated permissions for User Y to editor role', time: '12:00 PM' },
    { id: 4, user: 'Writer B', action: 'updated a novel', details: 'Updated chapter 5 of "The Great Adventure"', time: '1:00 PM' },
    { id: 5, user: 'System', action: 'completed backup', details: 'System backup completed successfully', time: '2:00 PM' },
  ]);

  // Dummy data for the graphs
  const topWritersData = {
    labels: ['Writer A', 'Writer B', 'Writer C', 'Writer D', 'Writer E'],
    datasets: [
      {
        label: 'Number of Novels',
        data: [12, 19, 3, 5, 8],
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
      },
    ],
  };

  const topNovelsData = {
    labels: ['Novel F', 'Novel G', 'Novel H', 'Novel I', 'Novel J'],
    datasets: [
      {
        label: 'Popularity Score',
        data: [85, 92, 78, 81, 96],
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      },
    ],
  };

  const graphOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <body class ="Admin-body" >
    <div className="admin-panel-container">
      <h1 className="admin-panel-title">Admin Panel</h1>

      {/* Admin Profile Section */}
      <div className="admin-panel-profile-container">
        <img
          src={adminProfile.image}
          alt="Admin Profile"
          className="admin-panel-profile-image"
        />
        <div className="admin-panel-profile-details">
          <div className="admin-panel-profile-name">{adminProfile.name}</div>
          <div className="admin-panel-profile-email">{adminProfile.email}</div>
          <div className="admin-panel-profile-description">
            {adminProfile.description}
          </div>
        </div>
      </div>

      {/* Search Bars Section */}
      <div className="admin-panel-search-container">
        <div className="admin-panel-search-bar">
          <input
            type="text"
            placeholder="Search Users..."
            className="admin-panel-search-input"
          />
          <button className="admin-panel-search-button">Search User</button>
        </div>
        <div className="admin-panel-search-bar">
          <input
            type="text"
            placeholder="Search Projects..."
            className="admin-panel-search-input"
          />
          <button className="admin-panel-search-button">Search Project</button>
        </div>
      </div>

      <div className="admin-panel-navigation">
        <button className="admin-panel-button" onClick={() => setShowUsers(true)}>
          Manage Users
        </button>
        <button className="admin-panel-button" onClick={() => setShowNovels(true)}>
          Manage Novels
        </button>
      </div>

      {/* Graphs Section */}
      <div className="admin-panel-graphs-container">
        <div className="admin-panel-graph-section">
          <div className="admin-panel-graph">
            <h2>Top Writers</h2>
            <Bar data={topWritersData} options={graphOptions} />
          </div>
          
        </div>

        <div className="admin-panel-graph-section">
          <div className="admin-panel-graph">
            <h2>Top Novels</h2>
            <Bar data={topNovelsData} options={graphOptions} />
          </div>
         
        </div>
      </div>

      {showUsers && (
            <div className="admin-panel-section">
              <button className="admin-panel-close-button" onClick={() => setShowUsers(false)}>
                Close
              </button>
              <UserManagement />
            </div>
          )}

      {showNovels && (
            <div className="admin-panel-section">
              <button className="admin-panel-close-button" onClick={() => setShowNovels(false)}>
                Close
              </button>
              <NovelManagement />
            </div>
          )}

      {/* Activity Log Section */}
      <div className="admin-panel-activity-log">
        <h2>Activity Log</h2>
        <ul>
          {activityLog.map((log) => (
            <li key={log.id}>
              <strong>{log.user}</strong> {log.action} - {log.details}
              <div className="activity-time">{log.time}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </body>
  );
};

export default AdminPanel;
