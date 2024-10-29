import React, { useState } from 'react';
import './savedworks.css';
import menuIcon from '../Images/Logo-V.png';
import profileIcon from '../Images/generic-user-profile-picture.png';
import searchIcon from '../Images/Search.png';
import recentImg from '../Images/Recent.png';
import { Scrollbars } from 'react-custom-scrollbars-2';
import {useNavigate } from 'react-router-dom';
import favIcon from '../Images/fav.png';
import notiIcon from '../Images/noti.png';
import setIcon from '../Images/set.png';
import journalIcon from '../Images/journal.png';
import botIcon from "../Images/Bot.png";



function SavedWorks() {

  const navigate = useNavigate();


    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(true);

    const stories = [
        "Whispers of the Forgotten Stars",
        "The Silent Echo of Midnight",
        "Beneath the Moon's Shadow",
        "The Keeper of Lost Dreams",
        "Echoes of a Broken Tomorrow",
        "The Secret Garden of Dusk",
        "Beyond the Veil of Twilight",
        "The Clockmaker's Last Promise",
        "Windswept Ashes of Avalon",
        "The Enigma in the Crystal Forest"
    ];

    const novels = [
        "The Edge of Infinity",
        "Shadows Beneath the Horizon",
        "Where the Rivers Never Sleep",
        "Through the Eyes of Eternity",
        "The Lantern's Guiding Flame",
        "When Darkness Meets the Sea",
        "The Last Song of a Dying Sun",
        "The Forgotten Isles of Emberfall",
        "A Journey Through Midnight Skies",
        "The Heart of the Celestial Path"
    ];


  // Urdu stories/novels
  const urduStories = [
    "شام کے بعد",
    "زخموں کا مرہم",
    "خوابوں کا مسافر",
    "دریا کے پار",
    "دل کے ارمان",
  ];

    const filteredStories = stories.filter(story => story.toLowerCase().includes(searchQuery.toLowerCase()));
    const filteredNovels = novels.filter(novel => novel.toLowerCase().includes(searchQuery.toLowerCase()));
    const filteredUrdu = urduStories.filter(urdu => urdu.toLowerCase().includes(searchQuery.toLowerCase()));

    const renderThumb = ({ style, ...props }) => {
        const thumbStyle = {
            backgroundColor: '#F47D4B',
            borderRadius: '10px',
            opacity: 0, // Initially hide the scrollbar
        };
        return <div style={{ ...style, ...thumbStyle }} {...props} />;
    };

    const renderTrack = ({ style, ...props }) => {
        const trackStyle = {
            backgroundColor: '#191B30',
            borderRadius: '10px',
            opacity: 0, // Initially hide the track
        };
        return <div style={{ ...style, ...trackStyle }} {...props} />;
    };

    const handleScrollStart = () => {
        // Show the scrollbar when scrolling starts
        const thumb = document.querySelector('.custom-thumb');
        const track = document.querySelector('.custom-track');
        if (thumb) thumb.style.opacity = 1;
        if (track) track.style.opacity = 1;
    };

    const handleScrollStop = () => {
        // Hide the scrollbar after scrolling stops
        const thumb = document.querySelector('.custom-thumb');
        const track = document.querySelector('.custom-track');
        if (thumb) thumb.style.opacity = 0;
        if (track) track.style.opacity = 0;
    };

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

    
  const handleChatbotClick = () => {
    navigate('/Chatbot'); // Assuming your profile page route is '/profile'
  };

  
    const handleSettingClick = () => {
      navigate('/Setting'); // Assuming your profile page route is '/profile'
    };
  
    const handleProfileClick = () => {
      navigate('/Profile'); // Assuming your profile page route is '/profile'
    };

    const handleNovelClick = () => {
      navigate('/Novelboard'); // Assuming your profile page route is '/profile'
    };

    const handleStoryClick = () => {
      navigate('/Storyboard'); // Assuming your profile page route is '/profile'
    };

    const handleUrduClick = () => {
      navigate('/Urduboard'); // Assuming your profile page route is '/profile'
    };


    
  

   
  

    return (
        <div className="saved-container">
        
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

      



    <div className="savedworks-dashboard">

   
            <div className="saved-heading">
                <h1>My Projects</h1>
            </div>

            <div className="saved-Search-bar">
                    {showSearch && (
                        <>
                            <input
                                type="text"
                                className="saved-search-input"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <img
                                src={searchIcon}
                                alt="Search"
                                className="saved-search-icon"
                                onClick={() => setShowSearch(false)}
                            />
                        </>
                    )}
                </div>

            <div className="saved-Works">


                <div className="saved-Stories">
                    <h1>Stories</h1>
                    <Scrollbars
                        renderThumbVertical={renderThumb}
                        renderTrackVertical={renderTrack}
                        onScrollStart={handleScrollStart}
                        onScrollStop={handleScrollStop}
                        style={{ height: '174px', overflowX: 'hidden' }}
                    >
                        <ul>
                            {filteredStories.map((story, index) => (
                                <li onClick={handleStoryClick} key={index}>{story} </li>
                            ))}
                        </ul>
                    </Scrollbars>
                </div>

               

                <div className="saved-Novels">
                    <h2>Novels</h2>
                    <Scrollbars
                        renderThumbVertical={renderThumb}
                        renderTrackVertical={renderTrack}
                        onScrollStart={handleScrollStart}
                        onScrollStop={handleScrollStop}
                        style={{ height: '174px' }}
                    >
                        <ul>
                            {filteredNovels.map((novel, index) => (
                                <li onClick={handleNovelClick}  key={index}>{novel} </li>
                            ))}
                        </ul>
                    </Scrollbars>
                </div>


                   {/* Urdu Section */}
                  <div className="saved-Urdu">
                    <h2>Urdu Stories</h2>
                    <Scrollbars
                      renderThumbVertical={renderThumb}
                      renderTrackVertical={renderTrack}
                      onScrollStart={handleScrollStart}
                      onScrollStop={handleScrollStop}
                      style={{ height: '174px' }}
                    >
                      <ul>
                        {filteredUrdu.map((urdu, index) => (
                          <li onClick={handleUrduClick} key={index}>{urdu} </li>
                        ))}
                      </ul>
                    </Scrollbars>
                  </div>
            </div>

            <div className="saved-recents">
                <h1>Recents</h1>
                <Scrollbars
                    renderThumbHorizontal={renderThumb}
                    renderTrackHorizontal={renderTrack}
                    onScrollStart={handleScrollStart}
                    onScrollStop={handleScrollStop}
                    style={{ height: '200px', overflowY: 'hidden' }} // Adjust height as needed
                >
                    <div className="saved-recents-container">
                        <div className="saved-recents-scroll">
                            <div className="saved-item">
                                <img src={recentImg} alt="Recent" className="saved-recent-icon" />
                                <p>Title of Work 1</p>
                            </div>
                            <div className="saved-item">
                                <img src={recentImg} alt="Recent" className="saved-recent-icon" />
                                <p>Title of Work 2</p>
                            </div>
                            <div className="saved-item">
                                <img src={recentImg} alt="Recent" className="saved-recent-icon" />
                                <p>Title of Work 3</p>
                            </div>
                            <div className="saved-item">
                                <img src={recentImg} alt="Recent" className="saved-recent-icon" />
                                <p>Title of Work 4</p>
                            </div>
                            <div className="saved-item">
                                <img src={recentImg} alt="Recent" className="saved-recent-icon" />
                                <p>Title of Work 5</p>
                            </div>
                            <div className="saved-item">
                                <img src={recentImg} alt="Recent" className="saved-recent-icon" />
                                <p>Title of Work 6</p>
                            </div>
                            <div className="saved-item">
                                <img src={recentImg} alt="Recent" className="saved-recent-icon" />
                                <p>Title of Work 1</p>
                            </div>
                            <div className="saved-item">
                            <img src={recentImg} alt="Recent" className="saved-recent-icon" />
                                <p>Title of Work 2</p>
                            </div>
                            <div className="saved-item">
                                <img src={recentImg} alt="Recent" className="saved-recent-icon" />
                                <p>Title of Work 3</p>
                            </div>
                            <div className="saved-item">
                            <img src={recentImg} alt="Recent" className="saved-recent-icon" />
                                <p>Title of Work 4</p>
                            </div>
                            <div className="saved-item">
                                <img src={recentImg} alt="Recent" className="saved-recent-icon" />
                                <p>Title of Work 5</p>
                            </div>
                            <div className="saved-item">
                            <img src={recentImg} alt="Recent" className="saved-recent-icon" />
                                <p>Title of Work 6</p>
                            </div>
                        </div>
                    </div>
                </Scrollbars>
            </div>

            </div>
        </div>
    );
}

export default SavedWorks;
