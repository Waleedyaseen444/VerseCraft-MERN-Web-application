// src/components/UrduEditor.jsx

import React, { useState, useEffect } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // Ensure Axios is correctly installed and configured
import "./urdueditor.css"; // Custom styles for other components
import { 
  FaBold, FaItalic, FaUnderline, FaListOl, FaListUl, 
  FaTimes, FaUndo, FaRedo, FaChevronLeft, FaChevronRight 
} from 'react-icons/fa';
import AddCollaborators from './AddCollaborators'; // Import the AddCollaborators component
import Header from '../Header/header';
import Sidebar from "../Sidebar/sidebar";



const UrduEditor = () => {
  const { projectId } = useParams(); // Ensure that projectId is correctly obtained from the route
  const [editorContent, setEditorContent] = useState("");
  const [keyboardInput, setKeyboardInput] = useState("");
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [user, setUser] = useState(null); 
  const [goal, setGoal] = useState(500);
  const [progress, setProgress] = useState(0);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [newGoal, setNewGoal] = useState(goal);
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null); // Selected Chapter
  const [newChapter, setNewChapter] = useState("");
  const [theme, setTheme] = useState('theme-light'); // Default theme
  const [leftPanelVisible, setLeftPanelVisible] = useState(true); // Left panel visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state


  const navigate = useNavigate();

  // Define dropdown items for themes
  const themes = [
    { label: "Light Theme", value: "theme-light" },
    { label: "Dark Theme", value: "theme-dark" },
    { label: "Blue Theme", value: "theme-blue" },
    { label: "Green Theme", value: "theme-green" },
    { label: "Red Theme", value: "theme-red" },
    { label: "Purple Theme", value: "theme-purple" },
    { label: "Pink Theme", value: "theme-pink" },
    { label: "Yellow Theme", value: "theme-yellow" },
    { label: "Orange Theme", value: "theme-orange" },
    { label: "Teal Theme", value: "theme-teal" },
  ];




  const [isAddCollaboratorsOpen, setIsAddCollaboratorsOpen] = useState(false);


  const handleCloseCollaborators = () => {
    setIsAddCollaboratorsOpen(false);
  };
  // Handlers for modals
  const handleNoteModal = () => {
    setShowNoteModal(prev => {
      console.log(`Toggling Note Modal: ${!prev}`); // Log the new state
      return !prev;
    });
  };
  const handleGoalModal = () => setShowGoalModal(!showGoalModal);
  const handleChapterModal = () => setShowChapterModal(!showChapterModal);

  

  // Toggle left panel visibility
  const toggleLeftPanel = () => {
    setLeftPanelVisible(prev => !prev);
  };

  // Fetch chapters on component mount or when projectId changes
  useEffect(() => {
    if (projectId) {
      fetchChapters();
    }
    // eslint-disable-next-line
  }, [projectId]);

  const fetchChapters = async () => {
    try {
      const res = await axios.get(`/api/urduchapters/${projectId}`);
      setChapters(res.data);
      if (res.data.length > 0) {
        selectChapter(res.data[0]._id);
      }
    } catch (err) {
      console.error('Error fetching chapters:', err);
    }
  };

  // Fetch notes when selectedChapter changes
  useEffect(() => {
    if (selectedChapter) {
      fetchNotes(selectedChapter);
    } else {
      setNotes([]);
      setEditorContent("");
      setProgress(0);
    }
    // eslint-disable-next-line
  }, [selectedChapter]);

  const fetchNotes = async (chapterId) => {
    try {
      const res = await axios.get(`/api/chapter-notes/${projectId}/${chapterId}`);
      setNotes(res.data);
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };

  // Editor content change
  const handleChange = (event) => {
    setEditorContent(event.target.value);
    updateProgress(event.target.value.length);
  };

  // Keyboard input change
  const onChangeKeyboard = (input) => {
    setKeyboardInput(input);
    setEditorContent(input);
    updateProgress(input.length);
  };

  // Update progress based on word count
  const updateProgress = (length) => {
    const percentage = (length / goal) * 100;
    setProgress(Math.min(percentage, 100));
  };

  // Add Chapter
  const addChapter = async () => {
    if (newChapter.trim() !== "") {
      try {
        const newChapterData = {
          projectId,
          title: newChapter,
          number: chapters.length + 1,
          content: "",
          summary: "",
        };
        const res = await axios.post(`/api/urduchapters`, newChapterData);
        setChapters([...chapters, res.data]);
        setNewChapter("");
        setShowChapterModal(false);
        setSelectedChapter(res.data._id);
      } catch (err) {
        console.error('Error adding chapter:', err);
      }
    }
  };

  // Delete Chapter
  const deleteChapter = async (chapterId) => {
    if (window.confirm("Are you sure you want to delete this chapter?")) {
      try {
        await axios.delete(`/api/urduchapters/${projectId}/${chapterId}`);
        setChapters(chapters.filter((chapter) => chapter._id !== chapterId));
        if (selectedChapter === chapterId) {
          setSelectedChapter(null);
        }
      } catch (err) {
        console.error('Error deleting chapter:', err);
      }
    }
  };

  // Select Chapter
  const selectChapter = async (chapterId) => {
    setSelectedChapter(chapterId);
    try {
      const res = await axios.get(`/api/urduchapters/${projectId}/${chapterId}`);
      setEditorContent(res.data.content);
      updateProgress(res.data.content.length);
    } catch (err) {
      console.error('Error selecting chapter:', err);
    }
  };

  // Save Chapter
  const saveChapter = async () => {
    if (!selectedChapter) return;

    try {
      const updatedData = {
        content: editorContent,
        // Add other fields if necessary, e.g., title, summary
      };
      await axios.put(`/api/urduchapters/${projectId}/${selectedChapter}`, updatedData);
      alert('Chapter saved successfully!');
    } catch (err) {
      console.error('Error saving chapter:', err);
    }
  };

  // Add Note
  const addNote = async () => {
    if (newNote.trim() !== "" && selectedChapter) {
      try {
        const newNoteData = {
          projectId,
          chapterId: selectedChapter,
          content: newNote,
        };
        const res = await axios.post(`/api/chapter-notes`, newNoteData);
        setNotes([res.data, ...notes]); // Prepend the new note to the notes array
        setNewNote("");
        setShowNoteModal(false);
      } catch (err) {
        console.error('Error adding note:', err);
        alert('Failed to add note. Please try again.');
      }
    } else {
      alert('Please enter a note and ensure a chapter is selected.');
    }
  };
  



  // Delete Note
  const deleteNote = async (noteId) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await axios.delete(`/api/chapter-notes/${noteId}`);
        setNotes(notes.filter((note) => note._id !== noteId));
      } catch (err) {
        console.error('Error deleting note:', err);
        alert('Failed to delete note. Please try again.');
      }
    }
  };

  // Handler for changing goal
  const changeGoal = () => {
    if (newGoal > 0) {
      setGoal(newGoal);
      updateProgress(editorContent.length);
      setShowGoalModal(false);
    } else {
      alert('Goal must be a positive number.');
    }
  };

  // Handler for theme change
  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    setIsDropdownOpen(false);
  };




  // Urdu ''Keyboard Layout
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

  // Inline styles for the modal
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Ensure it sits above other elements
  };

  const modalContentStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
    position: 'relative',
  };

  const modalHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const modalTitleStyle = {
    margin: 0,
    fontSize: '1.5em',
  };

  const modalCloseButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '1.2em',
    cursor: 'pointer',
  };

  const modalBodyStyle = {
    margin: '15px 0',
  };

  const modalInputStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '1em',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const modalFooterStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  };

  const modalButtonStyle = {
    padding: '10px 20px',
    fontSize: '1em',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const modalPrimaryButtonStyle = {
    ...modalButtonStyle,
    backgroundColor: '#007bff',
    color: '#fff',
  };

  const modalSecondaryButtonStyle = {
    ...modalButtonStyle,
    backgroundColor: '#6c757d',
    color: '#fff',
  };



  return (
    <div className={`urdu-editor-container ${theme}`}>
       <Header/>
       <Sidebar/>

     
      {/* Toolbar */}
      <div className="urdu-toolbar" style={{ display: 'flex', alignItems: 'center', padding: '10px', backgroundColor: '#f0f0f0' }}>
        {/* Custom Dropdown for Themes */}
        <div className="custom-dropdown" style={{ position: 'relative', marginRight: '20px' }}>
          <button
            className="urdu-theme"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{ padding: '8px 12px', cursor: 'pointer' }}
          >
            Themes
          </button>
          {isDropdownOpen && (
            <ul className="urdu-theme-dropdown-menu" style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              backgroundColor: '#fff',
              listStyle: 'none',
              padding: '10px',
              margin: 0,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              zIndex: 1001,
            }}>
              {themes.map((item, index) => (
                <li 
                  key={index} 
                  onClick={() => handleThemeChange(item.value)}
                  style={{ padding: '5px 10px', cursor: 'pointer' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#fff'}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Toolbar Buttons */}
        <div className="urdu-toolbar-container" style={{ display: 'flex', gap: '10px' }}>
          {/* Using title attribute for simple tooltips */}
          <button className="urdu-toolbar-btn" title="Bold" style={{ cursor: 'pointer', padding: '8px', background: 'none', border: 'none' }}>
            <FaBold />
          </button>
          <button className="urdu-toolbar-btn" title="Italic" style={{ cursor: 'pointer', padding: '8px', background: 'none', border: 'none' }}>
            <FaItalic />
          </button>
          <button className="urdu-toolbar-btn" title="Underline" style={{ cursor: 'pointer', padding: '8px', background: 'none', border: 'none' }}>
            <FaUnderline />
          </button>
          <button className="urdu-toolbar-btn" title="Ordered List" style={{ cursor: 'pointer', padding: '8px', background: 'none', border: 'none' }}>
            <FaListOl />
          </button>
          <button className="urdu-toolbar-btn" title="Unordered List" style={{ cursor: 'pointer', padding: '8px', background: 'none', border: 'none' }}>
            <FaListUl />
          </button>
          <button className="urdu-toolbar-btn" title="Undo" style={{ cursor: 'pointer', padding: '8px', background: 'none', border: 'none' }}>
            <FaUndo />
          </button>
          <button className="urdu-toolbar-btn" title="Redo" style={{ cursor: 'pointer', padding: '8px', background: 'none', border: 'none' }}>
            <FaRedo />
          </button>
        </div>

        {/* Set Goal Button */}
        <button className="urdu-goal-set" onClick={handleGoalModal} style={{ marginLeft: 'auto', padding: '8px 12px', cursor: 'pointer' }}>
          Set Goal
        </button>

        {/* Word Count */}
        <h5 className="word-count" style={{ marginLeft: '10px' }}>Words: {editorContent.length}</h5>
      </div>

      {/* Main Content */}
      <div className="urdu-main-content" style={{ display: 'flex'}}>
        {/* Left Panel */}
        {leftPanelVisible && (
          <div className="urdu-left-panel" style={{ width: '20%', paddingRight: '20px' }}>
            <h4>Project Outline</h4>
            <button className="urdu-chapter-btn" onClick={handleChapterModal} style={{ padding: '8px 12px', cursor: 'pointer', marginBottom: '10px' }}>
              Add Chapter
            </button>
            <div className="urdu-section-management">
              {chapters.map((chapter) => (
                <div 
                  key={chapter._id} 
                  className={`urdu-chapter-box ${selectedChapter === chapter._id ? 'selected' : ''}`} 
                  onClick={() => selectChapter(chapter._id)}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '8px', 
                    marginBottom: '5px', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px',
                    cursor: 'pointer',
                    backgroundColor: selectedChapter === chapter._id ? '#e6f7ff' : '#fff',
                  }}
                >
                  <p style={{ margin: 0 }}>{chapter.title}</p>
                  <button 
                    className="urdu-note-close-btn" 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      deleteChapter(chapter._id); 
                    }}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      cursor: 'pointer', 
                      color: '#ff4d4f' 
                    }}
                    title="Delete Chapter"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Toggle Left Panel */}
        <button className="urdu-toggle-left-panel" onClick={toggleLeftPanel} style={{ 
          cursor: 'pointer', 
          background: 'none', 
          border: 'none', 
          fontSize: '1.5em', 
          height: '40px',
          color:'black',
          borderRight:'1px solid #a18e75',
          borderBottom:'1px solid #a18e75',
          backgroundColor: '#e1dbd6',
        }}>
          {leftPanelVisible ? <FaChevronLeft /> : <FaChevronRight />}
        </button>

        {/* Editor Panel */}
        <div className="urdu-editor-panel flex-grow-1" style={{ flexGrow: 1, paddingRight: '20px' }}>
          

          <div className="urdu-editor-area" style={{ marginBottom: '10px' }}>
            <textarea
              value={editorContent}
              onChange={handleChange}
              placeholder="لکھنا شروع کریں..."
              style={{
                width: "90%",
                height: "300px", // Fixed typo from "400x" to "400px"
                fontFamily: "Noto Nastaliq Urdu, serif",
                fontSize: "18px",
                direction: "rtl",
                border: "2px solid #333",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                overflowY: "auto",
                resize: 'vertical',
              }}
            />
          </div>

          {/* Save Chapter Button */}
          <button className="save-chapter-btn" onClick={saveChapter} style={{color:'white', padding: '8px 12px', cursor: 'pointer', marginBottom: '10px' ,borderRadius:'2px', backgroundColor:'#191B30'}}>
            Save Chapter
          </button>

          {/* Urdu Keyboard */}
          <Keyboard
            layout={urduLayout}
            layoutName="default"
            onChange={onChangeKeyboard}
            theme={"hg-theme-default hg-layout-default keyboard"}
          />
        </div>

        {/* Right Panel */}
        <div className="urdu-right-panel" >
          <h4>Goals & Streaks</h4>
          <div className="urdu-goal-tracker" style={{ marginBottom: '20px' }}>
            <h5>Goal: {goal} Words</h5>
            <div className="urdu-progress-bar" style={{  border:'1px solid #191B30',  width: '100%', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
              <div 
                className="urdu-progress-fill" 
                style={{ 
                  width: `${progress}%`, 
                  backgroundColor: '#191B30', 
                  height: '20px', 
                  textAlign: 'center', 
                  marginleft:'10px',
                  color: 'orange', 
                  lineHeight: '20px', 
                  transition: 'width 0.3s ease',
                  border:'1px solid #191B30'
                }}
              >
                {progress.toFixed(0)}%
              </div>
            </div>
          </div>

          {/* Add Note Button */}
          <button className="urdu-btn" onClick={handleNoteModal} style={{ padding: '8px 12px', cursor: 'pointer', marginBottom: '10px' }}>
            Add Note
          </button>
          <div className="urdu-notes-section" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {notes.length > 0 ? (
              notes.map((note) => (
                <div key={note._id} className="urdu-note-box" style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '8px', 
                  marginBottom: '5px', 
                  border: '1px solid #ccc', 
                  borderRadius: '4px',
                  backgroundColor: '#fff',
                }}>
                  <p style={{ margin: 0 }}>{note.content}</p>
                  <button 
                    className="urdu-note-close-btn" 
                    onClick={() => deleteNote(note._id)}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      cursor: 'pointer', 
                      color: '#ff4d4f' 
                    }}
                    title="Delete Note"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))
            ) : (
              <p>No notes available for this chapter.</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="urdu-save-note-buttons" style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button className="urdu-save-note-button" onClick={saveChapter} style={{ padding: '8px 12px', cursor: 'pointer' }}>
              Save
            </button>
            <button className="urdu-save-note-button" onClick={() => navigate('/AddCollaborators')} style={{ padding: '8px 12px', cursor: 'pointer' }}>
              Add Collaborators
            </button>
            {/* Add functionality for Save As and Preview if needed */}
          </div>
        </div>
      </div>

      {/* Note Modal */}
      {showNoteModal && (
        <div style={modalOverlayStyle} onClick={handleNoteModal}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              <h4 style={modalTitleStyle}>Add Note</h4>
              <button style={modalCloseButtonStyle} onClick={handleNoteModal} title="Close Modal">
                <FaTimes />
              </button>
            </div>
            <div style={modalBodyStyle}>
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Enter your note"
                style={modalInputStyle}
              />
            </div>
            <div style={modalFooterStyle}>
              <button 
                style={modalPrimaryButtonStyle} 
                onClick={addNote}
                disabled={!newNote.trim()}
              >
                Add Note
              </button>
              <button 
                style={modalSecondaryButtonStyle} 
                onClick={handleNoteModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Goal Modal */}
      {showGoalModal && (
        <div style={modalOverlayStyle} onClick={handleGoalModal}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              <h4 style={modalTitleStyle}>Set Writing Goal</h4>
              <button style={modalCloseButtonStyle} onClick={handleGoalModal} title="Close Modal">
                <FaTimes />
              </button>
            </div>
            <div style={modalBodyStyle}>
              <input
                type="number"
                value={newGoal}
                onChange={(e) => setNewGoal(Number(e.target.value))}
                placeholder="Enter your goal in words"
                style={modalInputStyle}
              />
            </div>
            <div style={modalFooterStyle}>
              <button 
                style={modalPrimaryButtonStyle} 
                onClick={changeGoal}
                disabled={newGoal <= 0}
              >
                Set Goal
              </button>
              <button 
                style={modalSecondaryButtonStyle} 
                onClick={handleGoalModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chapter Modal */}
      {showChapterModal && (
        <div style={modalOverlayStyle} onClick={handleChapterModal}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              <h4 style={modalTitleStyle}>Add Chapter</h4>
              <button style={modalCloseButtonStyle} onClick={handleChapterModal} title="Close Modal">
                <FaTimes />
              </button>
            </div>
            <div style={modalBodyStyle}>
              <input
                type="text"
                value={newChapter}
                onChange={(e) => setNewChapter(e.target.value)}
                placeholder="Enter chapter name"
                style={modalInputStyle}
              />
            </div>
            <div style={modalFooterStyle}>
              <button 
                style={modalPrimaryButtonStyle} 
                onClick={addChapter}
                disabled={!newChapter.trim()}
              >
                Add Chapter
              </button>
              <button 
                style={modalSecondaryButtonStyle} 
                onClick={handleChapterModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

{/* AddCollaborators Modal */}
<AddCollaborators 
        isOpen={isAddCollaboratorsOpen} 
        onClose={handleCloseCollaborators} 
        projectId={projectId} 
      />

    </div>
  );
};

export default UrduEditor;
