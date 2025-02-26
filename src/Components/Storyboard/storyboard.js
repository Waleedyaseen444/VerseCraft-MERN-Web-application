// frontend/src/components/storyboard.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './storyboard.css';
import closeIcon from '../Images/Close.png';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Modal from 'react-modal';
import plusIcon from "../Images/Plus.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCollaborators from './AddCollaborators'; // Import the AddCollaborators component
import axios from 'axios'; // Ensure axios is imported
import socket from './socket'; // Path to your socket.js
import  {  useRef } from 'react';
import crosshover from "../Images/cross-hover.png";
import crossNohover from "../Images/cross-no-hover.png";
import Header from '../Header/header';
import Sidebar from '../Sidebar/sidebar';


// Bind modal to the appElement for accessibility
Modal.setAppElement('#root');

function Storyboard() {

    
    const { projectId } = useParams(); // Assuming projectId refers to Story ID
    const navigate = useNavigate();
    const [user, setUser] = useState(null); // Store the logged-in user data
    const [error, setError] = useState(null); // Track error state
    const [loading, setLoading] = useState(true);

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

    // Add Collaborators Modal State
    const [isAddCollaboratorsOpen, setIsAddCollaboratorsOpen] = useState(false);
    const [usersInChapter, setUsersInChapter] = useState([]); // Active users

    // Fetch Project Data
    useEffect(() => {

        const fetchUserData = async () => {
            try {
              const token = localStorage.getItem('token');
              if (!token) {
                navigate('/login');
                return;
              }
        
              const response = await axios.get('http://localhost:5001/api/users/profile', {
                headers: { 'x-auth-token': token },
              });
        
              setUser(response.data);
           
        
            } catch (err) {
              console.error(err);
              setError('Failed to load user data');
            } finally {
              setLoading(false);
            }
          };





        const fetchProjectData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`/api/stories/${projectId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Ensure token is stored and accessible
                    },
                });
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
            fetchUserData();
            fetchProjectData();
        }
    }, [projectId]);

    // Fetch Chapters from Backend
    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`/api/stories/${projectId}/chapters`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Ensure token is stored and accessible
                    },
                });
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


   // Reference to the Quill editor instance
   const quillRef = useRef(null);

  
// Listen for updates to the user list
useEffect(() => {
    socket.on('updateUserList', (userList) => {
        setUsersInChapter(userList);
    });

    socket.on('receiveChanges', ({ chapterId, newContent }) => {
        if (chapterId === selectedChapterId) {
            setValue(newContent);
        }
    });

    return () => {
        socket.off('updateUserList');
        socket.off('receiveChanges');
    };
}, [selectedChapterId]);

const handleSelectChapter = async (chapterId) => {
    try {
        setSelectedChapterId(chapterId);

        const token = localStorage.getItem('token');
        const response = await fetch(`/api/chapters/${chapterId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch chapter content');
        }

        const chapterData = await response.json();
        setValue(chapterData.content);
        setLanguage(chapterData.language || 'en');

        // Join chapter room with username and profile image
        socket.emit('joinProject', { chapterId, username: user.fullname, profileImage: user.profileImage });
    } catch (error) {
        console.error('Error fetching chapter content:', error);
        toast.error(`Error fetching chapter content: ${error.message}`);
    }
};

const handleContentChange = (newContent) => {
    setValue(newContent);
    if (selectedChapterId) {
        socket.emit('sendChanges', { chapterId: selectedChapterId, content: newContent });
    } else {
        console.error('No chapter selected for emitting changes');
    }
};


const handleLeaveChapter = () => {
    if (selectedChapterId) {
        socket.emit('leaveProject', { chapterId: selectedChapterId, username: user.fullname });
        setSelectedChapterId(null);
        setValue('');
        setUsersInChapter([]);
        toast.info('You have left the chapter');
    }
};





   
   

    // Fetch Notes for a Chapter
    const fetchNotes = async (chapterId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/stories/${projectId}/chapters/${chapterId}/notes`, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Ensure token is stored and accessible
                },
            });
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

  
    const placeholderText = language === 'en' ? "Write your content here..." : "اپنا مواد یہاں لکھیں";

    // Notes Handlers

    // Add a new note
    const handleSaveNote = async () => {
        if (newNote.trim()) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`/api/stories/${projectId}/chapters/${selectedChapterId}/notes`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Ensure token is stored and accessible
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
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/notes/${noteId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`, // Ensure token is stored and accessible
                },
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
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/stories/${projectId}/chapters`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Ensure token is stored and accessible
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
   
    





    const handleSaveChapter = async () => { 
        if (!selectedChapterId) {
            toast.warn("Please select a chapter to save.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/chapters/${selectedChapterId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    content: value,
                    language: language,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save chapter');
            }

            const updatedChapter = await response.json();
            setChapters(chapters.map(chapter => chapter._id === selectedChapterId ? updatedChapter : chapter));
            toast.success("Chapter saved successfully!");

            // Optionally emit the save event to notify others
            socket.emit('editChapter', {
                chapterId: selectedChapterId,
                content: updatedChapter.content,
                language: updatedChapter.language
            });
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
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/chapters/${selectedChapterId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Ensure token is stored and accessible
                },
            });
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
                    'Authorization': `Bearer ${token}`, // Ensure token is stored and accessible
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


    return (
        <div className="story-Container">
            <Header/>
            <Sidebar projectId={projectId} />
           
        

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

                        theme="snow"
                        ref={quillRef}
                        modules={modules}
                        value={value}
                        onChange={handleContentChange}
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

                 <div className="storyboard-users-self-and-collab">
                    <h3 className="storyboard-users-number">Users in this chapter</h3>
                    <ul className="storyboard-collaborators-container">
                        {usersInChapter.map((user, index) => (
                            <li className="storyboard-collaborators" key={index}>
                                <img src={`http://localhost:5001/${user.profileImage}`} alt={user.username} width="16%" height="30" className="storyboard-users-profile-image" />
                                <span className="storyboard-user-name-collaborator">{user.username} </span>
                            </li>
                        ))}
                    </ul>
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
                <div
                className="story-close-button" 
                    onMouseOver={(e) => (e.target.src = crosshover)}
                    onMouseOut={(e) => (e.target.src = crossNohover)}
                    onClick={() => setIsNotesModalVisible(false)}>
                    <img src={crossNohover} alt="Close Note" className="story-close-icon-chapter" />
                </div>
                <div className="story-modal-content">
                    <input
                        className="story-note-text"
                        value={newNote}
                        onChange={setNewNote}
                        placeholder="Write your note here..."
                    />
                </div>
                <div onClick={handleSaveNote} className="story-save-note-button">Save</div>
            </Modal>

            {/* Add Chapter Modal */}
            <Modal 
                className="story-modal" 
                isOpen={isChapterModalVisible} 
                onRequestClose={handleCancelChapter}
            >
                <h3>Add New Chapter</h3>
                <div
                    className="story-close-button"
                    onMouseOver={(e) => (e.target.src = crosshover)}
                    onMouseOut={(e) => (e.target.src = crossNohover)}
                    onClick={handleCancelChapter}
                    >
                    <img src={crossNohover} alt="Close Chapter" className="story-close-icon-chapter" />
                </div>
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
               
                    <div onClick={handleChapterSubmit} className="submit-chapter-button">Submit</div>
                    
                
            </Modal>

            {/* Add Collaborators Modal */}
            <AddCollaborators 
                isOpen={isAddCollaboratorsOpen} 
                onClose={() => setIsAddCollaboratorsOpen(false)} 
                projectId={projectId} 
            />

            {/* Toast Notifications */}
            <ToastContainer />
        </div>
    );

}

export default Storyboard;
