import React, { useState, useEffect } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
import comIcon from "../Images/comm.png"
import botIcon from "../Images/Bot.png"

// Import the components
import Chatbot from './Chatbot'; // Chatbot component
import Editor from './Editor'; // Editor component
import Sidebar from './Sidebar'; // Sidebar component

function NovelDashboard() {
  const { projectId } = useParams(); // Assuming projectId refers to Novel ID

  const [chapters, setChapters] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  // Fetch chapters when the component mounts
  useEffect(() => {
    fetch(`/api/novels/${projectId}/chapters`)
      .then((res) => res.json())
      .then((data) => {
        setChapters(data);
        if (data.length > 0) {
          setCurrentChapter(data[0]);
          setCurrentPage(0);
        }
      })
      .catch((error) => console.error(error));
  }, [projectId]);

  // Fetch notes when the current chapter changes
  useEffect(() => {
    if (currentChapter) {
      fetch(`/api/novels/${projectId}/chapters/${currentChapter._id}/notes`)
        .then((res) => res.json())
        .then((data) => {
          setNotes(data);
        })
        .catch((error) => console.error(error));
    }
  }, [currentChapter, projectId]);

  // Function to handle chapter click
  const handleChapterClick = (index) => {
    const chapter = chapters[index];
    fetch(`/api/novels/${projectId}/chapters/${chapter._id}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentChapter(data);
        setCurrentPage(index);
      })
      .catch((error) => console.error(error));
  };

  // Function to update the content of the current chapter
  const handleTextChange = (value) => {
    setCurrentChapter((prevChapter) => ({ ...prevChapter, content: value }));
  };

  const handleSaveChapter = () => {
    if (currentChapter) {
      fetch(`/api/novels/${projectId}/chapters/${currentChapter._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentChapter),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedChapters = [...chapters];
          updatedChapters[currentPage] = data;
          setChapters(updatedChapters);
          setCurrentChapter(data);
          alert('Chapter saved successfully!');
        })
        .catch((error) => console.error(error));
    }
  };

  const addChapter = (title) => {
    fetch(`/api/novels/${projectId}/chapters`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
      .then((res) => res.json())
      .then((data) => {
        setChapters([...chapters, data]);
        setCurrentPage(chapters.length);
        setCurrentChapter(data);
      })
      .catch((error) => console.error(error));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar state
  };

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const handleSaveNote = () => {
    const plainTextNote = stripHtmlTags(newNote);
    if (plainTextNote.trim() && currentChapter) {
      fetch(`/api/novels/${projectId}/chapters/${currentChapter._id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: plainTextNote }),
      })
        .then((res) => res.json())
        .then((data) => {
          setNotes([...notes, data]);
          setNewNote(''); // Clear the editor after saving
          setVisible(false); // Close the modal
        })
        .catch((error) => console.error(error));
    }
  };

  const handleDeleteNote = (noteId) => {
    if (currentChapter) {
      fetch(`/api/novels/${projectId}/chapters/${currentChapter._id}/notes/${noteId}`, {
        method: 'DELETE',
      })
        .then(() => {
          const updatedNotes = notes.filter((note) => note._id !== noteId);
          setNotes(updatedNotes);
        })
        .catch((error) => console.error(error));
    }
  };

  // Navigation handlers
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

  const handleChatbotClick = () => {
    navigate('/Chatbot');
  };

  const handleProgressClick = () => {
    navigate('/Progress');
  };

  const handleSettingClick = () => {
    navigate('/Setting');
  };

  const handleFavoriteClick = () => {
    navigate('/Favorite');
  };

  return (
    <div className="noveldashboard-container">
      <div className="homepage-header">
        <header className="homepage-header-item">
          <img src={menuIcon} alt="Menu" className="homepage-menu-icon" />
          <div className="homepage-app-title" onClick={handleHomepageClick}>VerseCraft</div>
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
              <li className="homepage-Published" onClick={handleNotificationClick}>
                <img src={notiIcon} alt="Published Works" className="homepage-publish-icon" />
                Notifications
              </li>
              <li className="homepage-inspire-bot" onClick={handleSettingClick}>
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
          <img src={plotIcon} alt="journal" className="homepage-journal-icon" />
          Plot
          <img src={plusIcon} alt="noveldashboard-add-plot" className="noveldashboard-Add-plot-icon" onClick={handlePlotClick} />
        </div>
        <div className='homepage-notifications'>
          <img src={characterIcon} alt="notifications" className="homepage-noti-icon" />
          Character
          <img src={plusIcon} alt="noveldashboard-add-character" className="noveldashboard-Add-character-icon" onClick={handleCharacterClick} />
        </div>
        <div className='homepage-notifications'>
          <img src={comIcon} alt="notifications" className="homepage-noti-icon" />
          Collaborators
          <img src={plusIcon} alt="noveldashboard-collaborator-plot" className="noveldashboard-Add-collaborator-icon" onClick={handleCharacterClick} />
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
          <Sidebar
            className="noveldashboard-sidebar-content"
            chapters={chapters}
            addChapter={addChapter}
            handleChapterClick={handleChapterClick}
          />
        </div>

        {/* Editor Component */}
        <div className="noveldashboard-editor">
          <Editor
            text={currentChapter ? currentChapter.content : ''}
            setText={handleTextChange}
          />
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

              <Modal
                className="noveldashboard-modal"
                isOpen={visible}
                onRequestClose={() => setVisible(false)}
              >
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
            <Scrollbars style={{ height: '570px' }}>
              <ul className="noveldashboard-notes-list">
                {notes.map((note) => (
                  <li key={note._id}>
                    {note.content}
                    <button
                      className="noveldashboard-close-note"
                      onClick={() => handleDeleteNote(note._id)}
                    >
                      <img src={closeIcon} alt="Delete Note" className="noveldashboard-close-icon" />
                    </button>
                  </li>
                ))}
              </ul>
            </Scrollbars>
          </aside>

          <div className="noveldashboard-buttons">
            <button className="noveldashboard-button" onClick={handleSaveChapter}>
              Save
            </button>
            <button className="noveldashboard-button" >
              Add Collaborators
            </button>
            {/* Add functionality for Save As and Preview if needed */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NovelDashboard;



