// src/components/AdminPanel.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPanel.css';
import profileIcon from '../Images/generic-user-profile-picture.png';

// Management Components
import UserManagement from './UserManagement';
import NovelManagement from './NovelManagement';
import StoryManagement from './StoryManagement';
import UrduManagement from './UrduManagement';
import NotifyUsers from './NotifyUsers';

// Icons
import {
  FaUser,
  FaBook,
  FaPenFancy,
  FaLanguage,
  FaBell,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHome,
} from 'react-icons/fa';

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('users'); // Default section
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar state
  const navigate = useNavigate();

  // Fetch admin data on component mount
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:5001/api/users/profile', {
          headers: { 'x-auth-token': token },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        // Optionally, handle token expiration or invalid token
        navigate('/login');
      }
    };

    fetchAdmin();
  }, [navigate]);

  const renderManagementSection = () => {
    switch (activeSection) {
      case 'users':
        return <UserManagement />;
      case 'stories':
        return <StoryManagement />;
      case 'novels':
        return <NovelManagement />;
      case 'urdu':
        return <UrduManagement />;
      case 'notify':
        return <NotifyUsers />;
      default:
        return <UserManagement />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="adminpenal-container">
      {/* Sidebar Navigation */}
      <aside className={`adminpenal-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="adminpenal-sidebar-header">
          <h2 className="adminpenal-sidebar-title">
            {sidebarOpen ? 'Admin Panel' : <FaHome />}
          </h2>
          <button
            className="adminpenal-sidebar-toggle-btn"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <ul className="adminpenal-sidebar-menu">
          <li
            className={activeSection === 'users' ? 'active' : ''}
            onClick={() => setActiveSection('users')}
            aria-label="User Management"
            title="User Management"
          >
            <FaUser className="adminpenal-menu-icon" />
            {sidebarOpen && <span className="adminpenal-menu-text">User Management</span>}
          </li>
          <li
            className={activeSection === 'stories' ? 'active' : ''}
            onClick={() => setActiveSection('stories')}
            aria-label="Story Management"
            title="Story Management"
          >
            <FaPenFancy className="adminpenal-menu-icon" />
            {sidebarOpen && <span className="adminpenal-menu-text">Story Management</span>}
          </li>
          <li
            className={activeSection === 'novels' ? 'active' : ''}
            onClick={() => setActiveSection('novels')}
            aria-label="Novel Management"
            title="Novel Management"
          >
            <FaBook className="adminpenal-menu-icon" />
            {sidebarOpen && <span className="adminpenal-menu-text">Novel Management</span>}
          </li>
          <li
            className={activeSection === 'urdu' ? 'active' : ''}
            onClick={() => setActiveSection('urdu')}
            aria-label="Urdu Management"
            title="Urdu Management"
          >
            <FaLanguage className="adminpenal-menu-icon" />
            {sidebarOpen && <span className="adminpenal-menu-text">Urdu Management</span>}
          </li>
          <li
            className={activeSection === 'notify' ? 'active' : ''}
            onClick={() => setActiveSection('notify')}
            aria-label="Notify Users"
            title="Notify Users"
          >
            <FaBell className="adminpenal-menu-icon" />
            {sidebarOpen && <span className="adminpenal-menu-text">Notify Users</span>}
          </li>
          <li
            onClick={handleLogout}
            className="adminpenal-logout"
            aria-label="Logout"
            title="Logout"
          >
            <FaSignOutAlt className="adminpenal-menu-icon" />
            {sidebarOpen && <span className="adminpenal-menu-text">Logout</span>}
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="adminpenal-main-content">
        {/* Top Navigation Bar */}
        <header className="adminpenal-header">
          <button
            className="adminpenal-header-toggle-btn"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <FaBars />
          </button>
          <div className="adminpenal-header-right">
            
            <div className="adminpenal-profile">
              <img
                src={
                  user?.profileImage
                    ? `http://localhost:5001/${user.profileImage}`
                    : profileIcon
                }
                alt="Profile"
                className="adminpenal-profile-icon"
              />
              <div className="adminpenal-profile-details">
                <h3>{user ? user.fullname : 'Guest'}</h3>
                <p>{user ? user.email : 'Guest'}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <main className="adminpenal-content">
          {renderManagementSection()}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;




// Admin Panel CSS
// .admin-penal-container {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 40px;
//   background-color: #1e2226ff; /* Background Color */
//   font-family: 'Arial', sans-serif;
// }

// .admin-penal-title {
//   color: #ef8307; /* Title Color */
//   margin-bottom: 20px;
//   font-size: 2.4em;
//   text-align: center;
// }

// .admin-penal-profile {
//   width: 100%;
//   max-width: 1200px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 30px;
//   background-color: #171717ff; /* Profile Background */
//   box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
//   border-radius: 12px;
// }

// .admin-penal-profile-info {
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   gap: 40px;
//   margin-top: 20px;
//   width: 100%;
// }

// .admin-penal-profile-icon {
//   width: 140px;
//   height: 140px;
//   border-radius: 50%;
//   object-fit: cover;
//   border: 3px solid #ef8307;
// }

// .admin-penal-profile-details {
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   color: #ef8307; /* Details Text Color */
// }

// .admin-penal-profile-details h3 {
//   margin: 0;
//   font-size: 2em;
//   font-weight: bold;
// }

// .admin-penal-profile-details p {
//   color: #2b343bff; /* Details Text Color */
//   margin: 8px 0;
//   font-size: 1em;
// }

// .admin-penal-navbar {
//   width: 80%;
//   background-color: #1e272eff; /* Navbar Background */
//   padding: 15px 30px;
//   margin-top: 40px;
//   border-radius: 12px;
//   box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
// }

// .admin-penal-navbar ul {
//   list-style: none;
//   padding: 0;
//   display: flex;
//   justify-content: center;
//   gap: 30px;
// }

// .admin-penal-navbar ul li {
//   color: #ffffff;
//   cursor: pointer;
//   padding: 15px 25px;
//   border-radius: 6px;
//   transition: background-color 0.3s ease, transform 0.2s ease;
// }

// .admin-penal-navbar ul li:hover {
//   background-color: #2b343bff; /* Hover Background */
//   transform: scale(1.05);
// }

// .admin-penal-management {
//   width: 100%;
//   max-width: 1200px;
//   padding: 30px;
//   margin-top: 40px;
//   background-color: #171717ff; /* Management Background */
//   box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
//   border-radius: 12px;
// }

// /* Story Management Styles */
// .adminpenalstorymanage-container {
//   margin: 20px;
//   font-family: Arial, sans-serif;
// }

// .adminpenalstorymanage-story-form {
//   margin-bottom: 30px;
// }

// .adminpenalstorymanage-story-form input,
// .adminpenalstorymanage-story-form textarea {
//   width: 100%;
//   padding: 12px;
//   margin-bottom: 15px;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   background-color: #2b343bff; /* Input Background */
//   color: white;
// }

// .adminpenalstorymanage-story-form button {
//   padding: 12px 25px;
//   background-color: #ef8307; /* Button Background */
//   color: white;
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   font-size: 1.1em;
//   transition: background-color 0.3s ease, transform 0.2s ease;
// }

// .adminpenalstorymanage-story-form button:hover {
//   background-color: #1e272eff; /* Button Hover Background */
//   transform: scale(1.05);
// }

// .adminpenalstorymanage-stories-list {
//   display: flex;
//   flex-direction: column;
//   gap: 25px;
// }

// .adminpenalstorymanage-story-item {
//   background-color: #1e2226ff; /* Story Item Background */
//   padding: 25px;
//   border-radius: 12px;
//   box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
// }

// .adminpenalstorymanage-story-details {
//   display: flex;
//   flex-direction: column;
//   gap: 12px;
// }

// .adminpenalstorymanage-story-edit-form input,
// .adminpenalstorymanage-story-edit-form textarea {
//   margin-bottom: 12px;
// }

// button {
//   margin-top: 15px;
//   cursor: pointer;
// }

// .adminpenalstorymanage-error-message {
//   color: #dc3545; /* Error Message */
//   margin-bottom: 25px;
//   font-weight: bold;
// }

// /* Urdu Management Styles */
// .UrduManagement-container {
//   padding: 30px;
//   background-color: #1e2226ff; /* Urdu Management Container */
//   border-radius: 12px;
// }

// .UrduManagement-container h2 {
//   color: #ef8307; /* Urdu Management Title */
//   font-size: 2.2em;
//   text-align: center;
// }

// .UrduManagement-error-message {
//   color: #dc3545; /* Error Message */
//   font-weight: bold;
// }

// .UrduManagement-list {
//   margin-top: 25px;
// }

// .UrduManagement-item {
//   background: #171717ff; /* Urdu Item Background */
//   padding: 20px;
//   margin: 15px 0;
//   border-radius: 12px;
//   box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
// }

// .UrduManagement-item h3 {
//   margin: 0;
//   color: #ef8307; /* Urdu Item Title Color */
//   font-size: 1.8em;
// }

// .UrduManagement-actions {
//   display: flex;
//   gap: 15px;
//   margin-top: 15px;
// }

// .UrduManagement-edit-btn,
// .UrduManagement-delete-btn {
//   background-color: #ef8307; /* Action Button Background */
//   color: white;
//   border: none;
//   padding: 8px 18px;
//   cursor: pointer;
//   border-radius: 6px;
//   display: flex;
//   align-items: center;
//   font-size: 1em;
//   transition: background-color 0.3s ease, transform 0.2s ease;
// }

// .UrduManagement-edit-btn:hover {
//   background-color: #1e272eff; /* Edit Button Hover */
//   transform: scale(1.05);
// }

// .UrduManagement-delete-btn {
//   background-color: #dc3545; /* Delete Button */
// }

// .UrduManagement-delete-btn:hover {
//   background-color: #c82333; /* Delete Button Hover */
// }

// .UrduManagement-edit-form {
//   background: #171717ff; /* Edit Form Background */
//   padding: 25px;
//   border-radius: 12px;
//   box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
// }

// .UrduManagement-edit-form input,
// .UrduManagement-edit-form textarea {
//   width: 100%;
//   padding: 12px;
//   margin: 12px 0;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   background-color: #2b343bff; /* Input Background */
//   color: white;
// }

// .UrduManagement-edit-actions {
//   display: flex;
//   gap: 15px;
//   margin-top: 25px;
// }

// .UrduManagement-save-btn,
// .UrduManagement-cancel-btn {
//   padding: 12px 25px;
//   border: none;
//   color: white;
//   background-color: #28a745; /* Save Button */
//   cursor: pointer;
//   border-radius: 8px;
//   font-size: 1.1em;
//   transition: background-color 0.3s ease, transform 0.2s ease;
// }

// .UrduManagement-save-btn:hover {
//   background-color: #218838;
//   transform: scale(1.05);
// }

// .UrduManagement-cancel-btn {
//   background-color: #dc3545; /* Cancel Button */
// }

// .UrduManagement-cancel-btn:hover {
//   background-color: #c82333;
//   transform: scale(1.05);
// }

// .adminnotifyuser-container {
//   padding: 25px;
//   max-width: 700px;
//   margin: auto;
//   background-color: #171717ff;
//   border-radius: 12px;
// }

// .adminnotifyuser-container h2 {
//   text-align: center;
//   color: #ef8307; /* Notification Title Color */
//   font-size: 2em;
// }

// .adminnotifyuser-recipient,
// .adminnotifyuser-type,
// .adminnotifyuser-message {
//   margin-bottom: 18px;
// }

// .adminnotifyuser-container label {
//   display: block;
//   font-weight: bold;
//   color: #ef8307; /* Label Color */
// }

// .adminnotifyuser-container select,
// .adminnotifyuser-container textarea {
//   width: 100%;
//   padding: 12px;
//   margin-top: 5px;
//   font-size: 16px;
//   background-color: #2b343bff; /* Input Background */
//   color: white;
//   border: 1px solid #ccc;
//   border-radius: 8px;
// }

// .adminnotifyuser-button {
//   padding: 12px 25px;
//   background-color: #ef8307; /* Notification Button */
//   color: white;
//   border: none;
//   cursor: pointer;
//   font-size: 1.1em;
//   display: flex;
//   align-items: center;
//   margin-top: 20px;
//   border-radius: 8px;
//   transition: background-color 0.3s ease, transform 0.2s ease;
// }

// .adminnotifyuser-button:disabled {
//   background-color: #ccc;
//   cursor: not-allowed;
// }

// .adminnotifyuser-button:hover {
//   background-color: #1e272eff; /* Button Hover Background */
//   transform: scale(1.05);
// }
