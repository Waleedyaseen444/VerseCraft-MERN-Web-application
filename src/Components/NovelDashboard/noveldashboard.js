import React, { useState} from 'react';
import './noveldashboard.css';
import menuIcon from '../Images/Logo-V.png';
import plotIcon from '../Images/Plot.png';
import characterIcon from '../Images/Character.png';
import publishIcon from '../Images/Published.png';
import profileIcon from '../Images/generic-user-profile-picture.png';
import goalIcon from '../Images/goal.png';
import favIcon from '../Images/fav.png';
import notiIcon from '../Images/noti.png';
import setIcon from '../Images/set.png';
import plusIcon from "../Images/Plus.png";
import journalIcon from '../Images/journal.png';
import Modal from 'react-modal';
import closeIcon from '../Images/Close.png';
import { Scrollbars } from 'react-custom-scrollbars-2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useNavigate } from 'react-router-dom';
import comIcon from "../Images/comm.png"
import botIcon from "../Images/Bot.png";
import { useParams } from 'react-router-dom';


// Import the components
import Chatbot from './Chatbot'; // Chatbot component
import Editor from './Editor'; // Editor component
import Sidebar from './Sidebar'; // Sidebar component

function NovelDashboard() {
  const [chapters, setChapters] = useState([{ title: 'Chapter I', content: '# Chapter I\n\nStart writing...' }]);
  const [currentPage, setCurrentPage] = useState(0);
  const [visible, setVisible] = useState(false);
  const { projectId } = useParams(); // Assuming projectId refers to Story ID

  const navigate = useNavigate();

  // Function to update the content of the current chapter
  const handleTextChange = (value) => {
    setChapters((prevChapters) =>
      prevChapters.map((chapter, index) =>
        index === currentPage ? { ...chapter, content: value } : chapter
      )
    );
  };

  const addChapter = (title) => {
    setChapters([...chapters, { title, content: '' }]);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar state
  };


 

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

const stripHtmlTags = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

const [notes, setNotes] = useState([]);
const [newNote, setNewNote] = useState('');

const handleSaveNote = () => {
  const plainTextNote = stripHtmlTags(newNote);
  if (plainTextNote.trim()) {
      setNotes([...notes, plainTextNote]);
      setNewNote(''); // Clear the editor after saving
      setVisible(false); // Close the modal
  }
};

const handleDeleteNote = (index) => {
  const updatedNotes = notes.filter((_, i) => i !== index);
  setNotes(updatedNotes);
};


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

const handleProjectsClick = () => {
  navigate('/Saved'); // Assuming your profile page route is '/profile'
};

const handleNotificationClick = () => {
  navigate('/Notification'); // Assuming your profile page route is '/profile'
};

const handleChatbotClick = () => {
  navigate('/Chatbot'); // Assuming your profile page route is '/profile'
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

  return (
    <div className="noveldashboard-container">
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

      <div className="noveldashboard-dashboard">
        {/* Sidebar Component */}
        <div className="noveldashboard-sidebar">
          <Sidebar className="noveldashboard-sidebar-content" chapters={chapters} addChapter={addChapter} setCurrentPage={setCurrentPage} />
        </div>

        {/* Editor Component */}
        <div className="noveldashboard-editor">
          <Editor text={chapters[currentPage].content} setText={handleTextChange} />
        </div>

        {/* Novel View (For Displaying current novel content or chapters) */}
        <div className="noveldashboard-novelview">
          {/* Novel view content goes here */}
        </div>

        {/* Chatbot Component */}
        <div className="noveldashboard-chatbot">
          <Chatbot />
        </div>

        <div className="noveldashboard-notes">
        <aside className="noveldashboard-notes-section">
                    <div className="noveldashboard-notes-header">
                        <button className="noveldashboard-add-note" onClick={() => setVisible(true)}>
                            <img src={plusIcon} alt="Add Note" className="noveldashboard-plus-icon" />
                        </button>

                        <Modal className="noveldashboard-modal" isOpen={visible} onRequestClose={() => setVisible(false)}>
                            <h2>Add Note</h2>
                            <button className="noveldashboard-close-button" onClick={() => setVisible(false)}>
                                <img src={closeIcon} alt="Close Note" className="noveldashboard-close-icon" />
                            </button>
                            <div className="noveldashboard-modal-content">
                                <ReactQuill
                                    className="noveldashboard-note-text"
                                    value={newNote}
                                    onChange={setNewNote}
                                    placeholder="Write your note here..."
                                />
                            </div>
                            <button onClick={handleSaveNote}>Save</button>
                        </Modal>
                        <h2>Notes</h2>
                    </div>
                    <Scrollbars
                        renderThumbVertical={renderThumb}
                        renderTrackVertical={renderTrack}
                        onScrollStart={handleScrollStart}
                        onScrollStop={handleScrollStop}
                        style={{ height: '570px' }} // Set a fixed height to enable scrolling
                    >
                        <ul className="noveldashboard-notes-list">
                            {notes.map((note, index) => (
                                <li key={index}>
                                    {note}
                                    <button 
                                        className="noveldashboard-close-note" 
                                        onClick={() => handleDeleteNote(index)}
                                    >
                                        <img src={closeIcon} alt="Delete Note" className="noveldashboard-close-icon" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </Scrollbars>
                </aside>

        </div>
      </div>
    </div>
  );
}

export default NovelDashboard;
