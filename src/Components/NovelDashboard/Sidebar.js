import React, { useState } from 'react';
import './noveldashboard.css';

function Sidebar({ chapters, addChapter, setCurrentPage }) {
  const [newChapterTitle, setNewChapterTitle] = useState('');

  const handleAddChapter = () => {
    if (newChapterTitle.trim()) {
      addChapter(newChapterTitle);
      setNewChapterTitle('');
    }
  };

  const handleChapterClick = (index) => {
    // Update the currentPage in App.js
    setCurrentPage(index); 
  };

  const renderChapter = (chapter, index) => {
    const id = chapter.title.replace(/\s+/g, '');
    return (
      <li key={id} onClick={() => handleChapterClick(index)}>
        <a href={`#${id}`}>
          {chapter.title}
        </a>
      </li>
    );
  };

  return (
    <div className="novelside-sidebar">
      <h3>Chapters</h3>

      <div className="novelside-add-chapter">
        <input 
          type="text" 
          value={newChapterTitle} 
          onChange={(e) => setNewChapterTitle(e.target.value)} 
          placeholder="New chapter title..." 
        />
        <button className="novelside-add-chapter-button" onClick={handleAddChapter}>Add Chapter</button>
      </div>

      <ul>
        {chapters.map((chapter, index) => renderChapter(chapter, index))}
      </ul>
      
    </div>
  );
}

export default Sidebar;