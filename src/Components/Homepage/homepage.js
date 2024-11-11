import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './homepage.css'; 
import profileIcon from '../Images/generic-user-profile-picture.png';
import favIcon from '../Images/fav.png';
import notiIcon from '../Images/noti.png';
import setIcon from '../Images/set.png';
import journalIcon from '../Images/journal.png';
import featuredImage1 from '../Images/rectangle_92.png'; 
import featuredImage2 from '../Images/rectangle_92.png'; 
import featuredImage3 from '../Images/rectangle_92.png'; 
import logoIcon from '../Images/Logo-V.png';
import botIcon from "../Images/Bot.png";
import axios from 'axios'; // Ensure axios is imported

const Homepage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationPaused, setAnimationPaused] = useState(false);
  const [animationClass, setAnimationClass] = useState('sliding-in');
  const [user, setUser] = useState(null); // Store the logged-in user data
  const [error, setError] = useState(null); // Track error state
  const navigate = useNavigate();
  //const [projectType, setProjectType] = useState('Storyboard'); // Default to Storyboard
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]); // State to hold user projects
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectType, setProjectType] = useState('Storyboard'); // Default to Storyboard



 // Fetch user data and user projects on component mount
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
      fetchUserProjects(response.data.email); // Fetch user projects
    } catch (err) {
      console.error(err);
      setError('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProjects = async (email) => {
    try {
      const [storiesResponse, novelsResponse, urduResponse] = await Promise.all([
        axios.get(`http://localhost:5001/api/stories/user/${email}`),
        axios.get(`http://localhost:5001/api/novels/user/${email}`),
        axios.get(`http://localhost:5001/api/urdu/user/${email}`),
      ]);
  
      const combinedProjects = [
        ...storiesResponse.data.map(project => ({ ...project, projectType: 'Storyboard' })),
        ...novelsResponse.data.map(project => ({ ...project, projectType: 'Novelboard' })),
        ...urduResponse.data.map(project => ({ ...project, projectType: 'Urduboard' })),
      ];
  
      setProjects(combinedProjects);
    } catch (err) {
      console.error('Failed to load projects:', err);
    }
  };
  

  fetchUserData();
}, [navigate]);

const handleItemClick = (projectId, projectType) => {
  if (projectType === 'Storyboard') {
    navigate(`/Storyboard/${projectId}`);
  } else if (projectType === 'Novelboard') {
    navigate(`/Novelboard/${projectId}`);
  } else if (projectType === 'Urduboard') {
    navigate(`/Urduboard/${projectId}`);
  }
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

  const handleChatbotClick = () => {
    navigate('/Chatbot'); 
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


  const handleVersionClick = () => {
    navigate('/Version'); 
  };

  const featuredWorks = [
    { title: 'Featured Work 1', imageUrl: featuredImage1 },
    { title: 'Featured Work 2', imageUrl: featuredImage2 },
    { title: 'Featured Work 3', imageUrl: featuredImage3 },
    { title: 'Featured Work 4', imageUrl: featuredImage1 },
    { title: 'Featured Work 5', imageUrl: featuredImage2 },
    { title: 'Featured Work 6', imageUrl: featuredImage3 },
    { title: 'Featured Work 7', imageUrl: featuredImage1 },
    { title: 'Featured Work 8', imageUrl: featuredImage2 },
    { title: 'Featured Work 9', imageUrl: featuredImage3 },
  ];

  

  // Effect to handle automatic slide changing
  useEffect(() => {
    const interval = setInterval(() => {
      if (!animationPaused) { // Only change index if animation is not paused
        setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredWorks.length);
      }
    }, 1000); // Change slide every second

    return () => clearInterval(interval);
  }, [featuredWorks.length, animationPaused]); // Dependency on animationPaused

  // Start the animation when the page loads
  useEffect(() => {
    const itemsContainer = document.querySelector('.homepage-features-works-items');
    itemsContainer.classList.add(animationClass); // Use state to manage the animation class

    const intervalId = setInterval(() => {
      if (itemsContainer) {
        itemsContainer.classList.remove(animationClass); // Remove the sliding-in class
        void itemsContainer.offsetHeight; // Trigger reflow
        itemsContainer.classList.add(animationClass); // Add it back to trigger animation
      }
    }, 20000); // Duration of the slide animation

    return () => clearInterval(intervalId);
  }, [animationClass]);

  // Handler for clicking on a work item
  const handleWorkItemClick = () => {
    setAnimationPaused(true); // Pause animation
    setAnimationClass(''); // Remove the sliding-in class

    // Restart animation after 5 seconds
    setTimeout(() => {
      setAnimationPaused(false); // Resume animation
      setAnimationClass('sliding-in'); // Reapply animation class
    }, 5000);
  };

  const handleFavoriteClick = () => {
    navigate('/Favorite'); 
  };

  const [particlesArray, setParticlesArray] = useState([]);

  useEffect(() => {
    generateParticles();

    // Interval to generate new particles after the previous set has finished moving
    const interval = setInterval(() => {
      generateParticles();
    }, 10000); // Match the duration of the particle animation (10s)

    return () => clearInterval(interval);
  }, []);

  const generateParticles = () => {
    const newParticles = Array.from({ length: 80 }).map((_, index) => (
      <div
        key={index}
        className="homepage-particle"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${index * 0.5}s`, // Uniform incremental delay for smoother particle generation
        }}
      ></div>
    ));
    setParticlesArray(newParticles);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar state
  };

 


    // Initial list of tasks as an array of objects
  const [tasks, setTasks] = useState([
    
  ]);

  const [newTask, setNewTask] = useState('');

  // Function to handle adding new tasks
  const handleAddTask = () => {
    if (newTask.trim() === '') return; // Prevent empty tasks
    const newTaskItem = {
      id: tasks.length + 1,
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, newTaskItem]); // Add the new task to the array
    setNewTask(''); // Clear input field
  };

  // Function to handle task completion
  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };
  



  const handleCreateNewClick = () => {
    setIsModalOpen(true); // Open the modal when "Create New" is clicked
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  // Function to handle project creation submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!projectName) {
      alert('Please provide a project name.');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
  
      const newProject = {
        title: projectName,
        projectType: projectType,
        author: {
          name: user?.fullname || user.fullname,
          email: user?.email || user.email,
        },
        description: 'A new project created by the user.',
        genres: ['Adventure'], // Example genre
        collaborators: [], // Optionally add collaborators later
      };
  
      // Determine the endpoint based on projectType
      let endpoint = '';
      if (projectType === 'Storyboard') {
        endpoint = 'http://localhost:5001/api/stories';
      } else if (projectType === 'Novelboard') {
        endpoint = 'http://localhost:5001/api/novels';
      } else if (projectType === 'Urduboard') {
        endpoint = 'http://localhost:5001/api/urdu';
      } else {
        alert('Invalid project type selected.');
        return;
      }
  
      const response = await axios.post(endpoint, newProject, {
        headers: { 'x-auth-token': token },
      });
  
      alert('Project created successfully!');
      setIsModalOpen(false); // Close the modal after creation
      navigate('/Homepage'); // Redirect to projects page
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project');
    }
  };
  


  return (
    <div className="homepage-container">
      <div className="homepage-header">
        <header className="homepage-header-item">
          <img src={logoIcon} alt="Menu" className="homepage-menu-icon"  />
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
                  <img
                           src={user?.profileImage ? `http://localhost:5001/${user.profileImage}` : profileIcon}
                           alt="Profile"
                           className="homepage-profile-icon"
                       />
                             <span>{user ? user.fullname : 'Guest'}</span>
              </li>
            </ul>
          </nav>
        </header>
      </div>




      <div className="homepage-dashboard">
        <div className="homepage-banner">
          <div className="homepage-banner-text">Write - Create - Inspire</div>
          {particlesArray}
         
        </div>

        <div className="homepage-searchbar">
              <input
                type="text"
                placeholder="Search works..."
                className="hompage-search-input"
              />
              
            </div>

        <div className="hompage-create-new-work-container">
          
          <div className="homepage-new-project">
            <div className="homepage-new-project-title" >Create a New Project</div>
            <button className="homepagecreate-new-work-button" onClick={handleCreateNewClick}>
              Create New
            </button>
          </div>
            {/* Modal */}
            {isModalOpen && (
              <div className="homepage-modal-overlay">
                <div className="homepage-modal-content">
                  <h3>Create New Project</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="homepage-modal-input-group">
                      <label htmlFor="projectName">Name your project</label>
                      <input
                        type="text"
                        id="projectName"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="homepage-modal-input-group">
                      <label htmlFor="projectType">Project Type</label>
                      <select
                        id="projectType"
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        required
                      >
                        <option value="">Select Project Type</option>
                        <option value="Novelboard">Novelboard</option>
                        <option value="Storyboard">Storyboard</option>
                        <option value="Urduboard">Urduboard</option>
                      </select>
                    </div>

                    <button type="submit" className="homepage-modal-submit-btn">
                      Create Project
                    </button>
                    <button
                      type="button"
                      className="homepage-modal-close-btn"
                      onClick={handleModalClose}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            )}
        </div>

        <div className="homepage-my-projects"> 
          <div className="homepage-my-projects-title">Recent Projects</div>
          <div className="homepage-my-projects-add-project" onClick={handleVersionClick}>
            View All 
          </div>



          <div
  className="homepage-my-projects-container"
  style={{ display: 'flex', overflowX: 'auto', gap: '10px', padding: '10px' }}
>
  {projects.length > 0 ? (
    projects.map((project) => (
      <div
        key={project._id}
        className="homepage-my-projects-item"
        style={{
          minWidth: '200px',
          flexShrink: 0,
          border: '1px solid #ddd',
          borderRadius: '8px',
          overflow: 'hidden',
        }}


        
        onClick={() => handleItemClick(project._id, project.projectType)}

      >
        <div
          className="homepage-my-projects-item-image"
          style={{
            backgroundImage: `url(${project.imageUrl || featuredImage3})`,
            width: '100%',
            height: '150px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div
          className="homepage-my-projects-item-name"
          style={{
            textAlign: 'center',
            padding: '10px 0',
            backgroundColor: '#f8f8f8',
            fontSize: '16px',
            fontWeight: 'bold',
            borderTop: '1px solid #ddd',
          }}
        >
          {project.title || 'Untitled Project'}  {/* Fallback in case title is missing */}
        </div>
      </div>
    ))
  ) : (
    <div>No projects found for this user.</div>
  )}
</div>



        </div>

        <div className="homepage-todo-list-container">
          <div className="homepage-todo-list-container-header">
            <h2>Your To-Do List</h2>
          </div>

          <div className="homepage-todo-add-task">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="homepage-todo-input"
            />
            <button className="homepage-todo-add-button" onClick={handleAddTask}>Add Task</button>
          </div>
          <div className="homepage-todo-task-list">
            {tasks.map((task) => (
              <div key={task.id} className="hompage-todo-task-item">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="homepage-todo-checkbox"
                />
                <label className={`homepage-todo-task-text ${task.completed ? 'completed' : ''}`}>
                  {task.text}
                </label>
              </div>
            ))}
          </div>
        </div>

        


        <div className="homepage-featured-works-container">
          
          <div className="homepage-featured-works">
            <p className="homepage-featured-works-heading">Featured Works</p>
            <div className="homepage-features-works-items">
              <div className="homepage-features-works-image-container">
                <div
                  className="homepage-features-works-images"
                  style={{ backgroundImage: `url(${featuredImage1})` }}
                ></div>
                <div className="homepage-features-works-title">Featured Work 1</div>
              </div>
              <div className="homepage-features-works-image-container">
                <div
                  className="homepage-features-works-images"
                  style={{ backgroundImage: `url(${featuredImage2})` }}
                ></div>
                <div className="homepage-features-works-title">Featured Work 2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
