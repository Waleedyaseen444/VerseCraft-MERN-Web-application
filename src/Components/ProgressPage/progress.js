import React, { useEffect, useState } from "react";
import './progress.css'; // Ensure the CSS is linked correctly
import { Link, useNavigate } from 'react-router-dom';
import menuIcon from '../Images/Logo-V.png';
import plotIcon from '../Images/Plot.png';
import characterIcon from '../Images/Character.png';
import publishIcon from '../Images/Published.png';
import profileIcon from '../Images/generic-user-profile-picture.png';
import goalIcon from '../Images/goal.png';
import favIcon from '../Images/fav.png';
import notiIcon from '../Images/noti.png';
import setIcon from '../Images/set.png';
import journalIcon from '../Images/journal.png';
import commIcon from '../Images/comm.png';
import comIcon from "../Images/comm.png"
import plusIcon from '../Images/Plus.png';
import botIcon from "../Images/Bot.png";

const Progress = ()  => {
  const navigate = useNavigate();

  const handleHomepageClick = () => {
    navigate('/Homepage');
  };

  const handlePlotClick = () => {
    navigate('/Plot');
  };

  const handleCharacterClick = () => {
    navigate('/Character');
  };

  const handlePublishClick = () => {
    navigate('/Publishing');
  };

 
  const handleProfileClick = () => {
    navigate('/Profile');
  };

  const handleProjectsClick = () => {
    navigate('/Saved');
  };

  const handleNotificationClick = () => {
    navigate('/Notification');
  };

  const handleProgressClick = () => {
    navigate('/Progress');
  };

  const handleSettingClick = () => {
    navigate('/Setting');
  };

  const handleChatbotClick = () => {
    navigate('/Chatbot'); // Assuming your profile page route is '/profile'
  };

  const handleFavoriteClick = () => {
    navigate('/Favorites');
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState("Work 1"); // State to keep track of selected work

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const workTitles = [
    "Work 1: Novel Draft",
    "Work 2: Short Story Compilation",
    "Work 3: Blog Posts",
    "Work 4: Poetry Collection",
    "Work 5: Writing Challenge",
  ];

  return (
    <div className="progress-container">
      <div className="progress-header">
      <div className="homepage-header">
        <header className="homepage-header-item">
          <img src={menuIcon} alt="Menu" className="homepage-menu-icon"  />
          <div className="homepage-app-title" onClick={handleHomepageClick} >VerseCraft</div>
          <nav>
            <ul>
            <li className="homepage-Plot" onClick={handleProjectsClick}>
                <img src={journalIcon} alt="Character" className="homepage-character-icon" />
                My Projects
              </li>
              <li className="homepage-Character" onClick={handleFavoriteClick}>
                <img src={favIcon} alt="Character" className="homepage-character-icon" />
                Favorites
              </li>
              <li className="homepage-Chatbot" onClick={handleChatbotClick}>
                <img src={botIcon} alt="homepage-chatbot" className="homepage-chatbot-icon" />
                InspireBot
              </li>
              
              <li className="homepage-Published" onClick={handleNotificationClick} >
                <img src={notiIcon} alt="Published Works" className="homepage-publish-icon" />
                Notifications
              </li>
              <li className="homepage-inspire-bot" onClick={handleSettingClick} >
                <img src={setIcon} alt="InspireBot" className="homepage-bot-icon" />
                Settings
              </li>
              <li className="homepage-Profile" onClick={handleProfileClick}>
                <img src={profileIcon} alt="Profile" className="homepage-profile-icon" />
                John Doe
              </li>
            </ul>
          </nav>
        </header>
      </div>


      <div className={`homepage-sidebar ${isSidebarOpen ? 'open' : ''}`} id="sidebar">
        <button id="sidebarToggle" className="homepage-sidebar-toggle" onClick={toggleSidebar}>
          &#9776;
        </button>

        <div className='homepage-journal'>
          <img src={plotIcon} alt="journal" className="homepage-journal-icon"  />
          Plot
          <img src={plusIcon} alt="noveldashboard-add-plot" className="noveldashboard-Add-plot-icon" onClick={handlePlotClick}/>
        </div>
        <div className='homepage-notifications' >
          <img src={characterIcon} alt="notifications" className="homepage-noti-icon" />
          Character
          <img src={plusIcon} alt="noveldashboard-add-character" className="noveldashboard-Add-character-icon" onClick={handleCharacterClick}/>
        </div>
        <div className='homepage-notifications' >
          <img src={comIcon} alt="notifications" className="homepage-noti-icon" />
          Collaborators
          <img src={plusIcon} alt="noveldashboard-collaborator-plot" className="noveldashboard-Add-collaborator-icon" onClick={handleCharacterClick}/>

        </div>

        <div className='homepage-goals' onClick={handlePublishClick}>
          <img src={publishIcon} alt="goals" className="homepage-goal-icon" />
          Publishing
        </div>
        <div className='homepage-favorites' onClick={handleProgressClick}>
          <img src={goalIcon} alt="favorites" className="homepage-fav-icon" />
          Progress
        </div>
        
      </div> 

        <div className="progress-dashboard">
          <div className="left-side-panel">
            <h2>My Works</h2>
            <ul>
              {workTitles.map((title, index) => (
                <li 
                  key={index}
                  className={`work-title ${selectedWork === title ? 'selected' : ''}`} 
                  onClick={() => setSelectedWork(title)}
                >
                  {title}
                </li>
              ))}
            </ul>
          </div>

          <div className="page-title">
                <h1>Progress / Goals - {selectedWork}</h1>
            </div>

          <div className="progress-main-content">
            

            <div className="goal-setting">
                <h2>Set Your Goal</h2>
                <div className="goal-input">
                    <input type="text" placeholder="Enter your goal (e.g., Write 10,000 words)" />
                    <input type="date" placeholder="Deadline" />
                    <button>Set Goal</button>
                    <button>Reset Goal</button>
                </div>
            </div>

            <div className="current-progress">
                <h2>Current Progress</h2>
                <div className="progress-bar">
                    <div className="progress" style={{ width: '70%' }}></div>
                </div>
                <p>Words Written: <span>7000</span> / <span>10000</span></p>
                <p>Milestone: <span>70%</span> Reached</p>
            </div>

            <div className="writing-stats">
                <h2>Writing Stats</h2>
                <p>Average Daily Word Count: <span>500</span></p>
                <p>Best Writing Day: <span>Tuesday</span></p>
            </div>

            <div className="achievements">
                <h2>Achievements</h2>
                <p>[10,000 Words Badge]</p>
                <p>[Monthly Goal Achiever]</p>
            </div>

            <div className="inspirational-quotes">
                <h2>Inspirational Quotes</h2>
                <p>"The first draft is just you telling the story."</p>
            </div>

            <div className="journal-reflection">
                <h2>Journal/Reflection</h2>
                <textarea placeholder="Write your thoughts here..."></textarea>
            </div>

            <div className="writing-schedule">
                <h2>Writing Schedule</h2>
                <ul>
                    <li>Mon: 2 hours</li>
                    <li>Wed: 1 hour</li>
                    <li>Fri: 3 hours</li>
                </ul>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
