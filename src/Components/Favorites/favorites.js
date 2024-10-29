import React  from "react";
import './favorites.css'; // Ensure the CSS is linked correctly
import {useNavigate } from 'react-router-dom';
import profileIcon from '../Images/generic-user-profile-picture.png';
import favIcon from '../Images/fav.png';
import notiIcon from '../Images/noti.png';
import setIcon from '../Images/set.png';
import journalIcon from '../Images/journal.png';
import logoIcon from '../Images/Logo-V.png';


const Favorites = () =>{

    const navigate = useNavigate();

  
    const handleHomepageClick = () => {
      navigate('/Homepage'); // Assuming your profile page route is '/profile'
    };
  
    const handleProjectsClick = () => {
      navigate('/Saved'); // Assuming your profile page route is '/profile'
    };
  
    const handleFavoriteClick = () => {
      navigate('/Favorite'); 
    };
  
    const handleNotificationClick = () => {
      navigate('/Notification'); // Assuming your profile page route is '/profile'
    };
  
    const handleSettingClick = () => {
      navigate('/Setting'); // Assuming your profile page route is '/profile'
    };
  
    const handleProfileClick = () => {
      navigate('/Profile'); // Assuming your profile page route is '/profile'
    };

    return (
        <div className="favorite-container">
            <div className="homepage-header">
                <header className="homepage-header-item">
                <img src={logoIcon} alt="Menu" className="homepage-menu-icon"  />
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







        </div>

    );
};

export default Favorites
