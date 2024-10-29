import React, { useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useNavigate } from 'react-router-dom';
import "./urdueditor.css"; // Custom styles
import { FaBold, FaItalic, FaUnderline, FaListOl, FaListUl, FaTimes, FaUndo, FaRedo } from 'react-icons/fa';
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
import comIcon from "../Images/comm.png";
import plusIcon from '../Images/Plus.png';
import botIcon from "../Images/Bot.png";
import { useParams } from 'react-router-dom';

const UrduEditor = () => {

  const { projectId } = useParams(); // Assuming projectId refers to Story ID

  const [editorContent, setEditorContent] = useState("");
  const [keyboardInput, setKeyboardInput] = useState("");
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const urduLayout = {
    default: [
      "ذ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩ ٠ - = {bksp}",
      "{tab} ق و ع ر ت ے ء ی ا پ ] [ \\",
      "{capslock} ا س د ف گ ح ج ک ل ؛ ' {enter}",
      "{shift} ز ش چ ط ب ن م ، ۔ / {shift}",
      ".com @ {space}"
    ],
    shift: [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} ق و ع ر ت ے ء ی ا پ { } |",
      '{capslock} ا س د ف گ ح ج ک ل : " {enter}',
      "{shift} ز ش چ ط ب ن م < > ? {shift}",
      ".com @ {space}"
    ]
  };

  const handleChange = (event) => {
    setEditorContent(event.target.value);
  };

  const onChangeKeyboard = (input) => {
    setKeyboardInput(input);
    setEditorContent(input);
  };

  const handleNoteModal = () => setShowNoteModal(!showNoteModal);

  const addNote = () => {
    if (newNote.trim() !== "") {
      setNotes([...notes, newNote]);
      setNewNote("");
      handleNoteModal();
    }
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const navigate = useNavigate();

  const handleHomepageClick = () => {
    navigate('/Homepage'); // Adjust the route as needed
  };

  const handlePlotClick = () => {
    navigate('/Plot'); // Adjust the route as needed
  };

  const handleCharacterClick = () => {
    navigate('/Character'); // Adjust the route as needed
  };

  const handlePublishClick = () => {
    navigate('/Publishing'); // Adjust the route as needed
  };

  const handleProfileClick = () => {
    navigate('/Profile'); // Adjust the route as needed
  };

  const handleProjectsClick = () => {
    navigate('/Saved'); // Adjust the route as needed
  };

  const handleNotificationClick = () => {
    navigate('/Notification'); // Adjust the route as needed
  };

  const handleProgressClick = () => {
    navigate('/Progress'); // Adjust the route as needed
  };

  const handleSettingClick = () => {
    navigate('/Setting'); // Adjust the route as needed
  };

  const handleFavoriteClick = () => {
    navigate('/Favorites'); // Adjust the route as needed
  };

  const handleChatbotClick = () => {
    navigate('/Chatbot'); // Adjust the route as needed
  };

  return (
    <div className="ue-editor-container">
      {/* Header */}
      <div className="ue-header">
        <header className="ue-header-item">
          <img src={menuIcon} alt="Menu" className="ue-menu-icon" onClick={handleHomepageClick} />
          <div className="ue-app-title" onClick={handleHomepageClick}>VerseCraft</div>
          <nav>
            <ul className="ue-nav-list">
              <li className="ue-nav-item" onClick={handleProjectsClick}>
                <img src={journalIcon} alt="Projects" className="ue-nav-icon" />
                My Projects
              </li>
              <li className="ue-nav-item" onClick={handleFavoriteClick}>
                <img src={favIcon} alt="Favorites" className="ue-nav-icon" />
                Favorites
              </li>
              <li className="ue-nav-item" onClick={handleChatbotClick}>
                <img src={botIcon} alt="InspireBot" className="ue-nav-icon" />
                InspireBot
              </li>
              <li className="ue-nav-item" onClick={handleNotificationClick}>
                <img src={notiIcon} alt="Notifications" className="ue-nav-icon" />
                Notifications
              </li>
              <li className="ue-nav-item" onClick={handleSettingClick}>
                <img src={setIcon} alt="Settings" className="ue-nav-icon" />
                Settings
              </li>
              <li className="ue-nav-item" onClick={handleProfileClick}>
                <img src={profileIcon} alt="Profile" className="ue-nav-icon" />
                John Doe
              </li>
            </ul>
          </nav>
        </header>
      </div>

      {/* Main Content */}
      <div className="ue-main-content">
        {/* Editor Panel */}
        <div className="ue-editor-panel">
          <h2>Urdu Text Editor</h2>
          <div className="ue-editor-area">
            <textarea
              value={editorContent}
              onChange={handleChange}
              placeholder="لکھنا شروع کریں..."
            />
          </div>
          <Keyboard
            layout={urduLayout}
            layoutName="default"
            onChange={onChangeKeyboard}
            theme={"hg-theme-default hg-layout-default keyboard"}
          />
        </div>
      </div>

      {/* Note Modal */}
      {showNoteModal && (
        <div className="ue-modal-overlay" onClick={handleNoteModal}>
          <div className="ue-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="ue-modal-header">
              <h2>Add Note</h2>
              <button className="ue-close-modal-btn" onClick={handleNoteModal}>&times;</button>
            </div>
            <div className="ue-modal-body">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Enter your note"
              />
            </div>
            <div className="ue-modal-footer">
              <button className="ue-modal-button" onClick={addNote}>Add Note</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrduEditor;
