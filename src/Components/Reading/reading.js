import React, { useState, useEffect ,useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './readingProject.css';
import { useParams} from 'react-router-dom';
import Switch from '@mui/material/Switch';
import Header from '../Header/header'; 
import { Rating, TextField, Button } from '@mui/material';
import {  List, ListItem, ListItemText, Divider } from '@mui/material';


function Reading() {
    const navigate = useNavigate();
    const [chapters, setChapters] = useState([]);

    const { projectId } = useParams(); // Assuming projectId refers to Story ID
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
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

    fetchUserData();
  }, [navigate]);

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
            console.log("Error fetching chapters:", error);

        }
    };

    if (projectId) {
        fetchChapters();
    }
}, [projectId]);

const handleChapterClick = (chapterId) => {
  const chapterElement = chapterContainerRef.current.querySelector(
    `#chapter-${chapterId}`
  );
  if (chapterElement) {
    chapterContainerRef.current.scrollTo({
      top: chapterElement.offsetTop,
      behavior: 'smooth',
    });
  }
};

    const chapterContainerRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
  
    const handleScroll = () => {
      if (chapterContainerRef.current) {
        const scrollTop = chapterContainerRef.current.scrollTop;
        const clientHeight = chapterContainerRef.current.clientHeight;
        const scrollHeight = chapterContainerRef.current.scrollHeight;
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollPosition(progress);
      }
    };

    const handleDarkModeToggle = () => {
      const body = document.body;
      body.classList.toggle('dark-mode');
    };


      const [ratingValue, setRatingValue] = useState(0);
      const [comment, setComment] = useState('');
    
      const handleRatingChange = (event, newValue) => {
        setRatingValue(newValue);
      };
    
      const [comments, setComments] = useState([]);
      const [newComment, setNewComment] = useState('');
      const [username, setUsername] = useState('');
    
      const handleCommentChange = (event) => {
        setNewComment(event.target.value);
      };
    
      const handleUsernameChange = (event) => {
        setUsername(event.target.value);
      };
    
      const handleCommentSubmit = () => {
        const newCommentObject = {
          username,
          comment: newComment,
        };
        setComments((prevComments) => [...prevComments, newCommentObject]);
        setNewComment('');
        setUsername('');
      };

  return (
    <div className="reading-container">
     <Header/>
     
      <div className="readingProject-dashboard">
        
          <div className="reading-dashboard-progressbar">
              <div className="reading-progressbar-container">
                <div
                  className="reading-progressbar"
                  style={{ width: `${scrollPosition}%` }}
                >
                  <span className="reading-progressbar-text">
                  {Math.round(scrollPosition)}%
                </span>
                </div>
              </div>
            </div>

            <div className="reading-toolbar-options">
             
              <div className="reading-toolbar-option">
              Dark Mode
                <Switch onChange={handleDarkModeToggle} />
              </div>
           


          <div className="reading-toolbar-option">
          Font Size
            <select className="reading-font-size-select">
              

              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
         
        </div>

        <div className="reading-project-chapter-outline-container">
          <div className="reading-project-chapter-outline-heading">Chapters</div>
          <div className="reading-project-chapter-outline-list">
            {chapters.map((chapter) => (
              <div
                key={chapter._id}
                className="reading-project-chapter-outline-item"
                onClick={() => handleChapterClick(chapter._id)}
              >
                <span>Chapter {chapter.number}: {chapter.title}</span>
              </div>
            ))}
          </div>
        </div>

     

            <div className="readingProject-heading">
                <h1>Story Project</h1>
            </div>
    
            <div className="readingProject-chapter-container" ref={chapterContainerRef} onScroll={handleScroll}>
              {chapters.map((chapter) => (
                <div key={chapter._id} id={`chapter-${chapter._id}`} className="readingProject-chapter">
                  <h2 className="readingProject-chapter-title">
                    Chapter {chapter.number}: {chapter.title}
                  </h2>
                  <div
                    className="readingProject-chapter-content"
                    dangerouslySetInnerHTML={{ __html: chapter.content }}
                  />
                </div>
              ))}
            </div>

          <div className="readingProject-evaluation">
            <div className="readingProject-evaluation-Rating">
              <h2>Rating</h2>
              <Rating
                name="rating"
                value={ratingValue}
                onChange={handleRatingChange}
                precision={0.5}
                max={5}
              />
            </div>
            <div className="readingProject-evaluation-Comments">
              <h2>Comments</h2>
              <List>
                {comments.map((comment, index) => (
                  <div key={index}>
                    <ListItem>
                      <ListItemText primary={`${comment.username}: ${comment.comment}`} />
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
              <div className="readingProject-evaluation-Comments-Form">
                <TextField
                  fullWidth
                  label="Username"
                  value={username}
                  onChange={handleUsernameChange}
                />
                <TextField
                  fullWidth
                  label="Write a comment"
                  value={newComment}
                  onChange={handleCommentChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCommentSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
  </div>


    </div>
  );
}

export default Reading;