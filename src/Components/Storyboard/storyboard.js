// frontend/src/components/storyboard.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './storyboard.css';
import menuIcon from '../Images/Logo-V.png';
import closeIcon from '../Images/Close.png';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Modal from 'react-modal';
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
import comIcon from "../Images/comm.png";
import botIcon from "../Images/Bot.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Bind modal to the appElement for accessibility
Modal.setAppElement('#root');

function Storyboard() {
    const { projectId } = useParams(); // Assuming projectId refers to Story ID
    const navigate = useNavigate();

    // Editor State
    const [value, setValue] = useState('');
    const [language, setLanguage] = useState('en'); // Default to English

    // Notes State
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [isNotesModalVisible, setIsNotesModalVisible] = useState(false);

    // Chapters State
    const [chapters, setChapters] = useState([]);
    const [isChapterModalVisible, setIsChapterModalVisible] = useState(false);
    const [newChapter, setNewChapter] = useState({ number: "", title: "" });
    const [selectedChapterId, setSelectedChapterId] = useState(null);

    // Project Data State
    const [projectData, setProjectData] = useState(null);

    // Fetch Project Data
    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const response = await fetch(`/api/stories/${projectId}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Story not found.');
                    } else {
                        throw new Error('Network response was not ok');
                    }
                }
                const data = await response.json();
                setProjectData(data);
            } catch (error) {
                console.error("Failed to fetch project data:", error);
                toast.error(`Failed to fetch project data: ${error.message}`);
            }
        };

        if (projectId) {
            fetchProjectData();
        }
    }, [projectId]);

    // Fetch Chapters from Backend
    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const response = await fetch(`/api/stories/${projectId}/chapters`);
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Chapters not found.');
                    } else {
                        throw new Error('Failed to fetch chapters');
                    }
                }
                const data = await response.json();
                setChapters(data);
            } catch (error) {
                console.error("Error fetching chapters:", error);
                toast.error(`Error fetching chapters: ${error.message}`);
            }
        };

        if (projectId) {
            fetchChapters();
        }
    }, [projectId]);

    // Fetch Notes for a Chapter
    const fetchNotes = async (chapterId) => {
        try {
            const response = await fetch(`/api/stories/${projectId}/chapters/${chapterId}/notes`);
            if (!response.ok) {
                throw new Error('Failed to fetch notes');
            }
            const data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error("Error fetching notes:", error);
            toast.error(`Error fetching notes: ${error.message}`);
        }
    };

    // Scrollbar Customization
    const renderThumb = ({ style, ...props }) => {
        const thumbStyle = {
            backgroundColor: '#F47D4B',
            borderRadius: '10px',
            opacity: 0, // Initially hide the scrollbar
            transition: 'opacity 0.3s'
        };
        return <div style={{ ...style, ...thumbStyle }} {...props} className="custom-thumb" />;
    };

    const renderTrack = ({ style, ...props }) => {
        const trackStyle = {
            backgroundColor: '#191B30',
            borderRadius: '10px',
            opacity: 0, // Initially hide the track
            transition: 'opacity 0.3s'
        };
        return <div style={{ ...style, ...trackStyle }} {...props} className="custom-track" />;
    };

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

    // ReactQuill Toolbar Options
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
    ];

    const modules = {
        toolbar: toolbarOptions,
    };

    // Language Toggle
    const handleLanguageToggle = () => {
        setLanguage(prevLanguage => prevLanguage === 'en' ? 'ur' : 'en');
    };

    const placeholderText = language === 'en' ? "Write your content here..." : "اپنا مواد یہاں لکھیں";

    // Notes Handlers

    // Add a new note
    const handleSaveNote = async () => {
        if (newNote.trim()) {
            try {
                const response = await fetch(`/api/stories/${projectId}/chapters/${selectedChapterId}/notes`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content: newNote }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to add note');
                }

                const createdNote = await response.json();
                setNotes([createdNote, ...notes]); // Add to the beginning
                setNewNote(''); // Clear the editor after saving
                setIsNotesModalVisible(false); // Close the modal
                toast.success("Note added successfully!");
            } catch (error) {
                console.error("Error adding note:", error);
                toast.error(`Error adding note: ${error.message}`);
            }
        } else {
            toast.warn("Note cannot be empty.");
        }
    };

    // Delete a note
    const handleDeleteNote = async (noteId) => {
        try {
            const response = await fetch(`/api/notes/${noteId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete note');
            }

            setNotes(notes.filter(note => note._id !== noteId));
            toast.info("Note deleted.");
        } catch (error) {
            console.error("Error deleting note:", error);
            toast.error(`Error deleting note: ${error.message}`);
        }
    };

    // Chapters Handlers
    const handleAddChapter = () => {
        setIsChapterModalVisible(true);
    };

    const handleChapterSubmit = async () => {
        const { number, title } = newChapter;
        if (number.trim() === "" || title.trim() === "") {
            toast.warn("Please provide both chapter number and title.");
            return;
        }

        // Check for duplicate chapter numbers
        const isDuplicate = chapters.some(chapter => chapter.number === Number(number.trim()));
        if (isDuplicate) {
            toast.error("Chapter number already exists. Please choose a different number.");
            return;
        }

        try {
            const response = await fetch(`/api/stories/${projectId}/chapters`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    number: Number(number.trim()),
                    title: title.trim(),
                    content: '', // Initialize with empty content
                    language: language, // Current language setting
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create chapter');
            }

            const createdChapter = await response.json();
            setChapters([...chapters, createdChapter]);
            setNewChapter({ number: "", title: "" });
            setIsChapterModalVisible(false);
            toast.success("Chapter added successfully!");
        } catch (error) {
            console.error("Error creating chapter:", error);
            toast.error(`Error creating chapter: ${error.message}`);
        }
    };

    const handleCancelChapter = () => {
        setNewChapter({ number: "", title: "" });
        setIsChapterModalVisible(false);
    };

    // Handle Chapter Selection
    const handleSelectChapter = async (chapterId) => {
        setSelectedChapterId(chapterId);
        try {
            const response = await fetch(`/api/chapters/${chapterId}`);
            if (!response.ok) throw new Error('Failed to fetch chapter content');
            const chapterData = await response.json();
            setValue(chapterData.content);
            setLanguage(chapterData.language || 'en'); // Assuming language is part of chapter data

            // Fetch notes for this chapter
            await fetchNotes(chapterId);
        } catch (error) {
            console.error("Error fetching chapter content:", error);
            toast.error(`Error fetching chapter content: ${error.message}`);
        }
    };

    // Save Chapter Content
    const handleSaveChapter = async () => {
        if (!selectedChapterId) {
            toast.warn("Please select a chapter to save.");
            return;
        }

        try {
            const response = await fetch(`/api/chapters/${selectedChapterId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: value,
                    language: language, // Save current language setting
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save chapter');
            }

            const updatedChapter = await response.json();
            setChapters(chapters.map(chapter => chapter._id === selectedChapterId ? updatedChapter : chapter));
            toast.success("Chapter saved successfully!");
        } catch (error) {
            console.error("Error saving chapter:", error);
            toast.error(`Error saving chapter: ${error.message}`);
        }
    };

    // Save as New Chapter
    const handleSaveAsNewChapter = async () => {
        if (!selectedChapterId) {
            toast.warn("Please select a chapter to duplicate.");
            return;
        }

        try {
            // Fetch the current chapter data
            const response = await fetch(`/api/chapters/${selectedChapterId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch current chapter data');
            }
            const currentChapter = await response.json();

            // Determine the next chapter number
            const existingNumbers = chapters.map(chapter => chapter.number);
            const nextNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;

            // Create the new chapter with duplicated content
            const createResponse = await fetch(`/api/stories/${projectId}/chapters`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    number: nextNumber,
                    title: `${currentChapter.title} (Copy)`,
                    content: currentChapter.content,
                    language: currentChapter.language,
                }),
            });

            if (!createResponse.ok) {
                const errorData = await createResponse.json();
                throw new Error(errorData.message || 'Failed to create new chapter');
            }

            const newChapter = await createResponse.json();
            setChapters([...chapters, newChapter]);
            setSelectedChapterId(newChapter._id);
            setValue(newChapter.content);
            setLanguage(newChapter.language || 'en');
            toast.success("Chapter duplicated successfully!");
        } catch (error) {
            console.error("Error duplicating chapter:", error);
            toast.error(`Error duplicating chapter: ${error.message}`);
        }
    };

    // Sidebar State and Handlers
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Navigation Handlers
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

    const handleFavoriteClick = () => {
        navigate('/Favorites');
    };

    const handleChatbotClick = () => {
        navigate('/Chatbot');
    };

    return (
        <div className="story-Container">
            {/* Header */}
            <div className="homepage-header">
                <header className="homepage-header-item">
                    <img src={menuIcon} alt="Menu" className="homepage-menu-icon" onClick={toggleSidebar} />
                    <div className="homepage-app-title" onClick={handleHomepageClick}>VerseCraft</div>
                    <nav>
                        <ul>
                            <li className="homepage-Plot" onClick={handleProjectsClick}>
                                <img src={journalIcon} alt="My Projects" className="homepage-journal-icon" />
                                My Projects
                            </li>
                            <li className="homepage-Character" onClick={handleFavoriteClick}>
                                <img src={favIcon} alt="Favorites" className="homepage-fav-icon" />
                                Favorites
                            </li>
                            <li className="homepage-Chatbot" onClick={handleChatbotClick}>
                                <img src={botIcon} alt="InspireBot" className="homepage-chatbot-icon" />
                                InspireBot
                            </li>
                            <li className="homepage-Published" onClick={handleNotificationClick}>
                                <img src={notiIcon} alt="Notifications" className="homepage-publish-icon" />
                                Notifications
                            </li>
                            <li className="homepage-inspire-bot" onClick={handleSettingClick}>
                                <img src={setIcon} alt="Settings" className="homepage-bot-icon" />
                                Settings
                            </li>
                            <li className="homepage-Profile" onClick={handleProfileClick}>
                                <img src={profileIcon} alt="Profile" className="homepage-profile-icon" />
                                {projectData?.author?.name || 'John Doe'}
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>

            {/* Sidebar */}
            <div className={`homepage-sidebar ${isSidebarOpen ? 'open' : ''}`} id="sidebar">
                <button id="sidebarToggle" className="homepage-sidebar-toggle" onClick={toggleSidebar}>
                    &#9776;
                </button>

                <div className='homepage-journal'>
                    <img src={plotIcon} alt="Plot" className="homepage-journal-icon" />
                    Plot
                    <img src={plusIcon} alt="Add Plot" className="noveldashboard-Add-plot-icon" onClick={handlePlotClick} />
                </div>
                <div className='homepage-notifications'>
                    <img src={characterIcon} alt="Character" className="homepage-noti-icon" />
                    Character
                    <img src={plusIcon} alt="Add Character" className="noveldashboard-Add-character-icon" onClick={handleCharacterClick} />
                </div>
                <div className='homepage-notifications'>
                    <img src={comIcon} alt="Collaborators" className="homepage-noti-icon" />
                    Collaborators
                    <img src={plusIcon} alt="Add Collaborator" className="noveldashboard-Add-collaborator-icon" onClick={handleCharacterClick} />
                </div>

                <div className='homepage-goals' onClick={handlePublishClick}>
                    <img src={publishIcon} alt="Publishing" className="homepage-goal-icon" />
                    Publishing
                </div>
                <div className='homepage-favorites' onClick={handleProgressClick}>
                    <img src={goalIcon} alt="Progress" className="homepage-fav-icon" />
                    Progress
                </div>
            </div>

            {/* Main Content */}
            <div className="story-main-content">
                {/* Outline Section */}
                <div className="story-outline">
                    <aside className="story-outline2">
                        <h2>Outline</h2>
                        <Scrollbars
                            renderThumbVertical={renderThumb}
                            renderTrackVertical={renderTrack}
                            onScrollStart={handleScrollStart}
                            onScrollStop={handleScrollStop}
                            autoHide
                        >
                            <div className="story-Content">
                                <ul className="story-chapter-list">
                                    {chapters.sort((a, b) => a.number - b.number).map((chapter) => (
                                        <li 
                                            key={chapter._id} 
                                            className={`chapter-item ${selectedChapterId === chapter._id ? 'selected' : ''}`}
                                            onClick={() => handleSelectChapter(chapter._id)}
                                        >
                                            <strong>Chapter {chapter.number}:</strong> {chapter.title}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Scrollbars>
                        <button onClick={handleAddChapter} className="add-chapter-button">
                            Add Chapter
                        </button>
                    </aside>
                </div>

                {/* Editor Section */}
                <div className="story-editor">
                    <ReactQuill
                        modules={modules}
                        value={value}
                        onChange={setValue}
                        placeholder={placeholderText}
                        className={language === 'ur' ? 'rtl' : ''}
                        style={{ direction: language === 'ur' ? 'rtl' : 'ltr' }}
                    />
                </div>

                {/* Notes Section */}
                <aside className="story-notes-section">
                    <div className="story-notes-container">
                        <div className="story-notes-header">
                            <button className="story-add-note" onClick={() => {
                                if (!selectedChapterId) {
                                    toast.warn("Please select a chapter to add notes.");
                                    return;
                                }
                                setIsNotesModalVisible(true);
                            }}>
                                <img src={plusIcon} alt="Add Note" className="story-plus-icon" />
                            </button>
                            <h2>Notes</h2>
                        </div>
                        <Scrollbars
                            renderThumbVertical={renderThumb}
                            renderTrackVertical={renderTrack}
                            onScrollStart={handleScrollStart}
                            onScrollStop={handleScrollStop}
                            style={{ height: '570px' }}
                        >
                            <ul className="story-notes-list">
                                {notes.map((note) => (
                                    <li key={note._id}>
                                        <div dangerouslySetInnerHTML={{ __html: note.content }} />
                                        <button 
                                            className="story-close-note" 
                                            onClick={() => handleDeleteNote(note._id)}
                                        >
                                            <img src={closeIcon} alt="Delete Note" className="story-close-icon" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </Scrollbars>
                    </div>
                    <div className="story-action-buttons">
                        <button className="story-save-button" onClick={handleSaveChapter}>Save</button>
                        <button className="story-save-as-new-button" onClick={handleSaveAsNewChapter}>Save as New</button>
                        <button className="story-preview-button">Preview the Project</button>
                    </div>
                </aside>
            </div>

            {/* Add Note Modal */}
            <Modal 
                className="story-modal" 
                isOpen={isNotesModalVisible} 
                onRequestClose={() => setIsNotesModalVisible(false)}
            >
                <h2>Add Note</h2>
                <button className="story-close-button" onClick={() => setIsNotesModalVisible(false)}>
                    <img src={closeIcon} alt="Close Note" className="story-close-icon" />
                </button>
                <div className="story-modal-content">
                    <ReactQuill
                        className="story-note-text"
                        value={newNote}
                        onChange={setNewNote}
                        placeholder="Write your note here..."
                    />
                </div>
                <button onClick={handleSaveNote} className="story-save-note-button">Save</button>
            </Modal>

            {/* Add Chapter Modal */}
            <Modal 
                className="story-modal" 
                isOpen={isChapterModalVisible} 
                onRequestClose={handleCancelChapter}
            >
                <h3>Add New Chapter</h3>
                <button className="story-close-button" onClick={handleCancelChapter}>
                    <img src={closeIcon} alt="Close Chapter" className="story-close-icon" />
                </button>
                <div className="story-modal-content">
                    <input
                        type="number"
                        placeholder="Chapter Number"
                        value={newChapter.number}
                        onChange={(e) => setNewChapter({ ...newChapter, number: e.target.value })}
                        className="chapter-input"
                        min="1"
                    />
                    <input
                        type="text"
                        placeholder="Chapter Title"
                        value={newChapter.title}
                        onChange={(e) => setNewChapter({ ...newChapter, title: e.target.value })}
                        className="chapter-input"
                    />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={handleChapterSubmit} className="submit-chapter-button">Submit</button>
                    <button onClick={handleCancelChapter} className="cancel-button">Cancel</button>
                </div>
            </Modal>

            {/* Toast Notifications */}
            <ToastContainer />
        </div>
    );

}

export default Storyboard;
