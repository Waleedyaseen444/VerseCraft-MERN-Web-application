import React, {  useState } from "react";
import './publishing.css'; // Ensure the CSS is linked correctly
import { useNavigate } from 'react-router-dom';
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
import plusIcon from "../Images/Plus.png";
import comIcon from "../Images/comm.png"
import botIcon from "../Images/Bot.png";


const collaborators = [
    {
      id: 1,
      name: "John Doe",
      image: characterIcon // Replace with actual image
    },
    {
      id: 2,
      name: "Jane Smith",
      image: characterIcon // Replace with actual image
    },
    {
      id: 3,
      name: "Samuel Green",
      image: characterIcon // Replace with actual image
    },
    {
      id: 4,
      name: "Emily Johnson",
      image: characterIcon // Replace with actual image
    }
  ];


  const projectNames = [
    "The Chronicles of Emberfall",
    "Whispers in the Dark",
    "The Lost Kingdom",
    "Echoes of Eternity",
    "Starlight Rebellion",
    "Shadows of the Forgotten",
    "The Enchanted Voyage",
    "Legends of the Mystic Realm",
    "Rise of the Phoenix",
    "The Forbidden Forest",
    "The Dreamweaver's Curse",
    "Guardians of the Celestial Gate",
    "Beneath the Silver Moon",
    "The Last Heir",
    "Tales from the Astral Plane",
    "The Serpent's Grasp",
    "Winds of Destiny",
    "The Timekeeper's Journal",
    "Fires of the Inferno",
    "The Secret of Eldoria"
  ];

const Publishing = ()  => {

  const navigate = useNavigate();

 
  
  const handleHomepageClick = () => {
    navigate('/Homepage'); // Assuming your profile page route is '/profile'
  };

  const handlePlotClick = () => {
    navigate('/Plot'); // Assuming your profile page route is '/profile'
  };

  const handleCharacterClick = () => {
    navigate('/Character'); // Assuming your profile page route is '/profile'
  };

  const handlePublishClick = () => {
    navigate('/Publishing'); // Assuming your profile page route is '/profile'
  };

  const handleProfileClick = () => {
    navigate('/Profile'); // Assuming your profile page route is '/profile'
  };

  const handleChatbotClick = () => {
    navigate('/Chatbot'); // Assuming your profile page route is '/profile'
  };


  const handleProjectsClick = () => {
    navigate('/Saved'); // Assuming your profile page route is '/profile'
  };

  const handleNotificationClick = () => {
    navigate('/Notification'); // Assuming your profile page route is '/profile'
  };

  const handleProgressClick = () => {
    navigate('/Progress'); // Assuming your profile page route is '/profile'
  };

  const handleSettingClick = () => {
    navigate('/Setting'); // Assuming your profile page route is '/profile'
  };

      
  const handleFavoriteClick = () => {
      navigate('/Favorite'); 
  };

     
  const handleCharacterGridClick = () => {
    navigate('/CharacterGrid'); 
};



  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar state
  };


  
  return (
    <div className="publishing-container">
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

      <div className="publishing-dashboard">
        <div className="publishing-title">Publishing</div>
        <div className="publishing-all-characters-button" onClick={handleCharacterGridClick}>
          Character List 
        </div>
        <div className="publishing-right-sidepanel">
            <div className="publishing-myprojects">Projects</div>
            <div className="publishing-project-list">
                {projectNames.map((project, index) => (
                <div key={index} className="publishing-project-item">
                    {project}
                </div>
                ))}
            </div>
        </div>
        <div className="publishing-project-metrics">
            <div className="publishing-project-performance-metrics">
                <div className="publishing-project-performance-metrics-title">Project Performance Metrics</div>
                <div className="publishing-metrics-container">
                    <div className="publishing-project-views">Views
                    <div className="publishing-project-views-value">127</div>
                    </div>
                    
                    <div className="publishing-sentiment-analysis">Sentiment
                      <div className="publishing-sentiment-analysis-value">
                        <div className="publishing-sentiment-analysis-pos"> 65%</div>
                        <div className="publishing-sentiment-analysis-neg"> 35% </div>
                      </div>
                    </div>
                </div>
            </div>
            <div className="publishing-project-engagement-metrics">
            <div className="publishing-project-engagement-metrics-title">Engagement Metrics</div>
                <div className="publishing-likes">Likes
                <div className="publishing-project-like-value">1930</div>
                </div>
                <div className="publishing-followercount">Follower count
                <div className="publishing-project-follower-value">2040</div>
                </div>
                <div className="publishing-bookmarked">Favorites
                <div className="publishing-project-bookmark-value">64</div>
                </div>
            </div>
            <div className="publishing-project-audience-metrics">
              <div className="publishing-project-audience-metrics-title">Audience Metrics</div>

            
              <div className="publishing-geographic-data">
                  <p>Geographic Data</p>
              </div>


              <div className="publishing-metrics-row">
                  <div className="publishing-average-age">Average Age: 25</div>
                  <div className="publishing-gender-metric">Gender Split
                      <div className="publishing-project-gender-value">
                          <div className="publishing-gender-male">65% Male</div>
                          <div className="publishing-gender-female">35% Female</div>
                      </div>
                  </div>
              </div>
          </div>
            <div className="publishing-project-quality-metrics">
            <div className="publishing-project-quality-metrics-title">Quality Metrics</div>
                <div className="publishing-project-word-count">Word Count
                <div className="publishing-project-word-value">13000</div>
                </div>
                
            </div>
        </div>
        <div className="publishing-project-reviews"></div>
        <div className="publishing-left-sidepanel">
            <div className="publishing-left-sidepanel-title">Collaborators</div>
            <div className="publishing-project-collaborators">
                {collaborators.map(collaborator => (
                <div className="publishing-collaborator-container" key={collaborator.id}>
                    <div className="publishing-collaborator-image">
                    <img src={profileIcon} alt="publishing-profile" className="publishing-profile-icon" />
                    </div>
                    <div className="publishing-collaborator-text">
                    {collaborator.name}
                    </div>
                </div>
                ))}
            </div>
        </div>
        <div className="publishing-publish-a-work"></div>
      </div>
    </div>
  );
};

export default Publishing;
