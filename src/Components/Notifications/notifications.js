import React, { useState } from 'react';
import './notifications.css';
import verticalOptionIcon from '../Images/vertical-options.png';
import Modal from 'react-modal';
import { Scrollbars } from 'react-custom-scrollbars-2';
import {useNavigate } from 'react-router-dom';
import menuIcon from '../Images/Logo-V.png';
import profileIcon from '../Images/generic-user-profile-picture.png';
import favIcon from '../Images/fav.png';
import notiIcon from '../Images/noti.png';
import setIcon from '../Images/set.png';
import journalIcon from '../Images/journal.png';
import calIcon from "../Images/Calander.png";
import botIcon from "../Images/Bot.png";



function Notifications() {
    const [visible, setVisible] = useState(false);
    const [selectedNotificationIndex, setSelectedNotificationIndex] = useState(null);

    const [notifications, setNotifications] = useState([
        // Add your notifications here
        {
            title: "Labor Day Sale",
            date: "2024-08-31",
            description: "Get 30% off all lifetime module purchases by using code LABORDAY24 at checkout. Offer expires September 2nd, so don't delay!"
        },
        {
            title: "New Feature Release",
            date: "2024-09-01",
            description: "Introducing our latest feature to enhance your user experience. Check it out now!"
        },
        {
            title: "Maintenance Update",
            date: "2024-09-02",
            description: "Scheduled maintenance update tonight from 2 AM to 4 AM. Please save your work and log out before this period."
        },
        {
            title: "Weekly Highlights",
            date: "2024-09-03",
            description: "Here are the highlights of this week: New updates, features, and more!"
        },
        {
            title: "System Downtime Alert",
            date: "2024-09-04",
            description: "Our system will be down for maintenance from 12 AM to 3 AM tomorrow. We apologize for any inconvenience."
        },
        {
            title: "Special Offer",
            date: "2024-09-05",
            description: "Exclusive offer: 20% off on all premium subscriptions. Use code PREMIUM20 at checkout."
        },
        {
            title: "Event Reminder",
            date: "2024-09-06",
            description: "Don't miss our upcoming event on September 10th. Register now to secure your spot."
        },
        {
            title: "Update Notification",
            date: "2024-09-07",
            description: "We've released a new update with performance improvements. Restart the app to apply changes."
        },
        {
            title: "Security Patch Released",
            date: "2024-09-08",
            description: "A critical security patch has been applied to protect your data. Please update your application."
        },
        {
            title: "Service Enhancement",
            date: "2024-09-09",
            description: "We're enhancing our service to improve speed and reliability. Thank you for your patience."
        }
    ]);

    const [searchQuery, setSearchQuery] = useState('');

    const filteredStories = notifications.filter(notification =>
        notification.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleScrollStart = () => {
        const thumb = document.querySelector('.custom-thumb');
        const track = document.querySelector('.custom-track');
        if (thumb) thumb.style.opacity = 1;
        if (track) track.style.opacity = 1;
    };

    const handleScrollStop = () => {
        const thumb = document.querySelector('.custom-thumb');
        const track = document.querySelector('.custom-track');
        if (thumb) thumb.style.opacity = 0;
        if (track) track.style.opacity = 0;
    };

    const handleNotificationAction = (action) => {
        if (selectedNotificationIndex !== null) {
            if (action === 'delete') {
                setNotifications(notifications.filter((_, index) => index !== selectedNotificationIndex));
            } 
            setSelectedNotificationIndex(null);
            setVisible(false);
        }
    };

    const renderThumb = ({ style, ...props }) => {
        const thumbStyle = {
            backgroundColor: '#F47D4B',
            borderRadius: '10px',
            opacity: 0,
        };
        return <div style={{ ...style, ...thumbStyle }} {...props} />;
    };

    const renderTrack = ({ style, ...props }) => {
        const trackStyle = {
            backgroundColor: '#191B30',
            borderRadius: '10px',
            opacity: 0,
        };
        return <div style={{ ...style, ...trackStyle }} {...props} />;
    };

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
    const handleChatbotClick = () => {
        navigate('/Chatbot'); // Assuming your profile page route is '/profile'
      };
  
  const closeModal = (event) => {
    // Prevent closing when clicking inside the modal content
    if (event.target.closest('.notification-modal-content')) {
        return;
    }
    setVisible(false);
};



    return (
        <div className="container">
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

            <div className='notification-second-container'>
                <div className="Notifications-container">
                    <div className="notification-Background"></div>
                    <div className='notification-Profile-image'></div>
                    <div className="notification-bar1"></div>
                    <div className='notification-Profile-info'>
                        <h1 className='notification-Name'>John Doe</h1>
                        <h2 className='notification-Username'>@johndoe1234</h2>
                        <div className='notification-Join-date'>
                            <img src={calIcon} alt="calendar" className="notification-cal-icon" />
                            <h1>3rd October 2024</h1>
                        </div>
                    </div>

                    <div className='notification-content'>
                        <h1>Notifications</h1>

                        <Scrollbars
                            renderThumbVertical={renderThumb}
                            renderTrackVertical={renderTrack}
                            onScrollStart={handleScrollStart}
                            onScrollStop={handleScrollStop}
                            style={{ height: '100%', overflowX: 'hidden' }}
                        >
                            <div className="notification-content-container">
                                <ul>
                                    {filteredStories.map((notification, index) => (
                                        <li key={index}>
                                            <div className="notification-notification-item">
                                                <div className="notification-notification-date">{notification.date}</div>
                                                <div className="notification-options">
                                                    <img
                                                        src={verticalOptionIcon}
                                                        alt="vert"
                                                        className="notification-vert-icon"
                                                        onClick={() => {
                                                            setSelectedNotificationIndex(index);
                                                            setVisible(true);
                                                        }}
                                                    />
                                                </div>
                                                <div className="notification-notification-title">{notification.title}</div>
                                                <div className="notification-notification-description">{notification.description}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Scrollbars>
                    </div>
                </div>
            </div>

            <Modal
                className="notification-modal"
                isOpen={visible}
                onRequestClose={() => setVisible(false)}
                onClick={closeModal} 
            >
                <div className="notification-modal-content" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => handleNotificationAction('delete')}>Delete Note</button>
                   
                </div>
            </Modal>
        </div>
    );
}

export default Notifications;
