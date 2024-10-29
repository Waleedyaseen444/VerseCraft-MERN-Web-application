import React, { useState } from 'react';
import './character.css';
import menuIcon from '../Images/Logo-V.png';
import dashboardIcon from '../Images/Dashboard.png';
import dropdownIcon from '../Images/Dropdown.png';
import plotIcon from '../Images/Plot.png';
import characterIcon from '../Images/Character.png';
import publishIcon from '../Images/Published.png';
import botIcon from '../Images/Bot.png';
import profileIcon from '../Images/generic-user-profile-picture.png';
import uploadIcon from '../Images/upload.png';
import plusIcon from '../Images/Plus.png';
import goalIcon from '../Images/goal.png';
import favIcon from '../Images/fav.png';
import notiIcon from '../Images/noti.png';
import setIcon from '../Images/set.png';
import journalIcon from '../Images/journal.png';
import closeIcon from '../Images/Close.png';
import commIcon from '../Images/comm.png';
import verticalOptionIcon from '../Images/Close.png';
import ImageUploading from 'react-images-uploading';
import Modal from 'react-modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate } from 'react-router-dom';
import comIcon from "../Images/comm.png";
Modal.setAppElement('#root');

function Character() {
  const [visible, setVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [isTransparent, setIsTransparent] = useState(false);
  const [modalPage, setModalPage] = useState(1); // State to track modal pages
  const [newNote, setNewNote] = useState('');

  const modules = {
    toolbar: false,
  };

  const maxNumber = 1;
  const onChange = (imageList) => {
    setImages(imageList);
  };

  const handleSave = () => {
    if (images.length > 0) {
      setBackgroundImage(images[0].data_url); // Set the background image to the first selected image
      setIsTransparent(true); // Make h1 and upload-image transparent
      setVisible(false); // Close the modal
    }
  };

  const handleRemove = () => {
    setBackgroundImage(null); // Remove the background image
    setIsTransparent(false); // Reset transparency for h1 and upload-image
  };

  const [info, setInfo] = useState({
    fullName: '',
    age: '',
    gender: '',
    ethnicity: '',
  });

  const [summary, setSummary] = useState('');
  const [backstory, setBackstory] = useState('');

  const [physicalTraits, setPhysicalTraits] = useState([{ name: '', description: '' }]);
  const [personalityTraits, setPersonalityTraits] = useState([{ name: '', description: '' }]);
  const [characterArcs, setCharacterArcs] = useState([{ name: '', description: '' }]);
  const [relationships, setRelationships] = useState([{ name: '', description: '' }]);
  const [skills, setSkills] = useState([{ name: '', description: '' }]);
  const [weaknesses, setWeaknesses] = useState([{ name: '', description: '' }]);
  const [roles, setRoles] = useState([{ name: '', description: '' }]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSummaryChange = (e) => {
    setSummary(e.target.value);
  };

  const handleBackstoryChange = (e) => {
    setBackstory(e.target.value);
  };

  const addTrait = (setTraitFunction, traitList) => {
    setTraitFunction([...traitList, { name: '', description: '' }]);
  };

  const deleteTrait = (indexToDelete, setTraitFunction, traitList) => {
    setTraitFunction(traitList.filter((_, index) => index !== indexToDelete));
  };

  const navigate = useNavigate();

  
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

  const handleProgressClick = () => {
    navigate('/Progress'); // Assuming your profile page route is '/profile'
  };

  const handleSettingClick = () => {
    navigate('/Setting'); // Assuming your profile page route is '/profile'
  };

  const handleAvatarClick = () => {
    navigate('/Avatar'); // Assuming your profile page route is '/profile'
  };

  const handleChatbotClick = () => {
    navigate('/Chatbot'); // Assuming your profile page route is '/profile'
  };



  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar state
  };

  const handleFavoriteClick = () => {
    navigate('/Favorite'); 
};





  return (
    <div className="character-container">
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



      <div className="character-overview">
        <button className="character-save-btn">Save Character</button>
        <div className="character-list">Character List</div>
        <ul className="character-list__items">
  <li className="character-list__item">
    <img src={characterIcon} alt="John Doe" className="character-list__picture" />
    <span className="character-list__name">John Doe</span>
  </li>
  <li className="character-list__item">
    <img src={characterIcon} alt="Jane Smith" className="character-list__picture" />
    <span className="character-list__name">Jane Smith</span>
  </li>
  <li className="character-list__item">
    <img src={characterIcon} alt="Alice Johnson" className="character-list__picture" />
    <span className="character-list__name">Alice Johnson</span>
  </li>
  <li className="character-list__item">
    <img src={characterIcon} alt="Michael Brown" className="character-list__picture" />
    <span className="character-list__name">Michael Brown</span>
  </li>
  <li className="character-list__item">
    <img src={characterIcon} alt="Emily Davis" className="character-list__picture" />
    <span className="character-list__name">Emily Davis</span>
  </li>
  <li className="character-list__item">
    <img src={characterIcon} alt="Robert Wilson" className="character-list__picture" />
    <span className="character-list__name">Robert Wilson</span>
  </li>
  <li className="character-list__item">
    <img src={characterIcon} alt="Sophia Martinez" className="character-list__picture" />
    <span className="character-list__name">Sophia Martinez</span>
  </li>
  <li className="character-list__item">
    <img src={characterIcon} alt="William Anderson" className="character-list__picture" />
    <span className="character-list__name">William Anderson</span>
  </li>
  <li className="character-list__item">
    <img src={characterIcon} alt="Olivia Taylor" className="character-list__picture" />
    <span className="character-list__name">Olivia Taylor</span>
  </li>
  <li className="character-list__item">
    <img src={characterIcon} alt="James Lee" className="character-list__picture" />
    <span className="character-list__name">James Lee</span>
  </li>
</ul>
      </div>

      <div className="character-dashboard">
        <div
          className="character-image"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h1 style={{ opacity: isTransparent ? 0 : 1 }}>Choose image</h1>
          <img
            src={uploadIcon}
            alt="upload"
            className="character-upload-image"
            onClick={() => setVisible(true)}
            style={{ opacity: isTransparent ? 0.0 : 1, zIndex: 10 }}
          />

          {/* Main Modal */}
          <Modal className="character-image-popup" isOpen={visible} onRequestClose={() => setVisible(false)}>
            {/* Slide transition based on modalPage */}
            <div className={`character-modal-page ${modalPage === 1 ? 'slide-in' : 'slide-out'}`}>
              <h1>Select Image</h1>
              <img src={closeIcon} alt="close" className="character-close-icon" onClick={() => setVisible(false)} />

              <div className="character-app">
                <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
                  {({ imageList, onImageUpload }) => (
                    <div className="character-upload__image-wrapper">
                      <button className="character-uploader" onClick={onImageUpload}>
                        Upload image
                      </button>

                      {imageList.map((image, index) => (
                        <div key={index} className="character-image-item">
                          <img src={image.data_url} className="character-image-selected" alt="image-selected" />
                          <div className="character-image-item__btn-wrapper">
                            <button className="character-updater" onClick={() => handleSave(image)}>Save</button>
                            <button className="character-remover" onClick={handleRemove}>Remove</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ImageUploading>
                <button onClick={handleAvatarClick} className="character-next-page-button">Generate</button>
              </div>
            </div>
          </Modal>
        </div>

        <div className="character-summary">
          <h1>Summary</h1>
          <textarea
            value={summary}
            onChange={handleSummaryChange}
            className="character-summary-textarea"
            placeholder="Enter the summary of the character"
          />
        </div>

        <div className="character-basic-info">
          <div className="character-basic-heading">Basic Information</div>

          <div className="character-field">
            <div className="character-label">Full name</div>
            <input
              type="text"
              name="fullName"
              value={info.fullName}
              onChange={handleInputChange}
              className="character-input-field"
              placeholder="Enter full name"
            />
          </div>

          <div className="character-field">
            <div className="character-label">Age</div>
            <input
              type="text"
              name="age"
              value={info.age}
              onChange={handleInputChange}
              className="character-input-field"
              placeholder="Enter age"
            />
          </div>

          <div className="character-field">
            <div className="character-label">Gender</div>
            <input
              type="text"
              name="gender"
              value={info.gender}
              onChange={handleInputChange}
              className="character-input-field"
              placeholder="Enter gender"
            />
          </div>

          <div className="character-field">
            <div className="character-label">Ethnicity</div>
            <input
              type="text"
              name="ethnicity"
              value={info.ethnicity}
              onChange={handleInputChange}
              className="character-input-field"
              placeholder="Enter ethnicity"
            />
          </div>
        </div>

        <div className="character-backstory">
          <h1>Backstory</h1>
          <textarea
            value={backstory}
            onChange={handleBackstoryChange}
            className="character-backstory-textarea"
            placeholder="Enter the backstory of the character"
          />
        </div>

        <div className="character-physical-traits">
          <h1>Physical Traits</h1>
          <button className="character-add-physical" onClick={() => addTrait(setPhysicalTraits, physicalTraits)}>
            <img src={plusIcon} alt="plus" className="character-plus-icon" />
          </button>
          {physicalTraits.map((trait, index) => (
            <div key={index} className="character-trait-item">
              <input
                type="text"
                placeholder="Trait Name"
                value={trait.name}
                onChange={(e) => {
                  const updatedTraits = [...physicalTraits];
                  updatedTraits[index].name = e.target.value;
                  setPhysicalTraits(updatedTraits);
                }}
                className="character-trait-name-input"
              />
              <textarea
                placeholder="Add description"
                value={trait.description}
                onChange={(e) => {
                  const updatedTraits = [...physicalTraits];
                  updatedTraits[index].description = e.target.value;
                  setPhysicalTraits(updatedTraits);
                }}
                className="character-trait-description-textarea"
              />
              <img
                src={verticalOptionIcon}
                alt="vert"
                className="character-vert-icon"
                onClick={() => deleteTrait(index, setPhysicalTraits, physicalTraits)}
              />
            </div>
          ))}
        </div>

        <div className="character-personality-traits">
          <h1>Personality Traits</h1>
          <button className="character-add-personality" onClick={() => addTrait(setPersonalityTraits, personalityTraits)}>
            <img src={plusIcon} alt="plus" className="character-plus-icon" />
          </button>
          {personalityTraits.map((trait, index) => (
            <div key={index} className="character-trait-item">
              <input
                type="text"
                placeholder="Trait Name"
                value={trait.name}
                onChange={(e) => {
                  const updatedTraits = [...personalityTraits];
                  updatedTraits[index].name = e.target.value;
                  setPersonalityTraits(updatedTraits);
                }}
                className="character-trait-name-input"
              />
              <textarea
                placeholder="Add description"
                value={trait.description}
                onChange={(e) => {
                  const updatedTraits = [...personalityTraits];
                  updatedTraits[index].description = e.target.value;
                  setPersonalityTraits(updatedTraits);
                }}
                className="character-trait-description-textarea"
              />
              <img
                src={verticalOptionIcon}
                alt="vert"
                className="character-vert-icon"
                onClick={() => deleteTrait(index, setPersonalityTraits, personalityTraits)}
              />
            </div>
          ))}
        </div>

        <div className="character-character-arcs">
          <h1>Character Arcs</h1>
          <button className="character-add-character-arc" onClick={() => addTrait(setCharacterArcs, characterArcs)}>
            <img src={plusIcon} alt="plus" className="character-plus-icon" />
          </button>
          {characterArcs.map((arc, index) => (
            <div key={index} className="character-trait-item">
              <input
                type="text"
                placeholder="Arc Name"
                value={arc.name}
                onChange={(e) => {
                  const updatedArcs = [...characterArcs];
                  updatedArcs[index].name = e.target.value;
                  setCharacterArcs(updatedArcs);
                }}
                className="character-trait-name-input"
              />
              <textarea
                placeholder="Add description"
                value={arc.description}
                onChange={(e) => {
                  const updatedArcs = [...characterArcs];
                  updatedArcs[index].description = e.target.value;
                  setCharacterArcs(updatedArcs);
                }}
                className="character-trait-description-textarea"
              />
              <img
                src={verticalOptionIcon}
                alt="vert"
                className="character-vert-icon"
                onClick={() => deleteTrait(index, setCharacterArcs, characterArcs)}
              />
            </div>
          ))}
        </div>

        <div className="character-relationships">
          <h1>Relationships</h1>
          <button className="character-add-relationship" onClick={() => addTrait(setRelationships, relationships)}>
            <img src={plusIcon} alt="plus" className="character-plus-icon" />
          </button>
          {relationships.map((relationship, index) => (
            <div key={index} className="character-trait-item">
              <input
                type="text"
                placeholder="Relationship Name"
                value={relationship.name}
                onChange={(e) => {
                  const updatedRelationships = [...relationships];
                  updatedRelationships[index].name = e.target.value;
                  setRelationships(updatedRelationships);
                }}
                className="character-trait-name-input"
              />
              <textarea
                placeholder="Add description"
                value={relationship.description}
                onChange={(e) => {
                  const updatedRelationships = [...relationships];
                  updatedRelationships[index].description = e.target.value;
                  setRelationships(updatedRelationships);
                }}
                className="character-trait-description-textarea"
              />
              <img
                src={verticalOptionIcon}
                alt="vert"
                className="character-vert-icon"
                onClick={() => deleteTrait(index, setRelationships, relationships)}
              />
            </div>
          ))}
        </div>

        <div className="character-skills">
          <h1>Skills</h1>
          <button className="character-add-skill" onClick={() => addTrait(setSkills, skills)}>
            <img src={plusIcon} alt="plus" className="character-plus-icon" />
          </button>
          {skills.map((skill, index) => (
            <div key={index} className="character-trait-item">
              <input
                type="text"
                placeholder="Skill Name"
                value={skill.name}
                onChange={(e) => {
                  const updatedSkills = [...skills];
                  updatedSkills[index].name = e.target.value;
                  setSkills(updatedSkills);
                }}
                className="character-trait-name-input"
              />
              <textarea
                placeholder="Add description"
                value={skill.description}
                onChange={(e) => {
                  const updatedSkills = [...skills];
                  updatedSkills[index].description = e.target.value;
                  setSkills(updatedSkills);
                }}
                className="character-trait-description-textarea"
              />
              <img
                src={verticalOptionIcon}
                alt="vert"
                className="character-vert-icon"
                onClick={() => deleteTrait(index, setSkills, skills)}
              />
            </div>
          ))}
        </div>

        <div className="character-weaknesses">
          <h1>Weaknesses</h1>
          <button className="character-add-weakness" onClick={() => addTrait(setWeaknesses, weaknesses)}>
            <img src={plusIcon} alt="plus" className="character-plus-icon" />
          </button>
          {weaknesses.map((weakness, index) => (
            <div key={index} className="character-trait-item">
              <input
                type="text"
                placeholder="Weakness Name"
                value={weakness.name}
                onChange={(e) => {
                  const updatedWeaknesses = [...weaknesses];
                  updatedWeaknesses[index].name = e.target.value;
                  setWeaknesses(updatedWeaknesses);
                }}
                className="character-trait-name-input"
              />
              <textarea
                placeholder="Add description"
                value={weakness.description}
                onChange={(e) => {
                  const updatedWeaknesses = [...weaknesses];
                  updatedWeaknesses[index].description = e.target.value;
                  setWeaknesses(updatedWeaknesses);
                }}
                className="character-trait-description-textarea"
              />
              <img
                src={verticalOptionIcon}
                alt="vert"
                className="character-vert-icon"
                onClick={() => deleteTrait(index, setWeaknesses, weaknesses)}
              />
            </div>
          ))}
        </div>

        <div className="character-roles">
          <h1>Roles</h1>
          <button className="character-add-role" onClick={() => addTrait(setRoles, roles)}>
            <img src={plusIcon} alt="plus" className="character-role-icon" />
          </button>
          {roles.map((role, index) => (
            <div key={index} className="character-trait-item">
              <input
                type="text"
                placeholder="Role Name"
                value={role.name}
                onChange={(e) => {
                  const updatedRoles = [...roles];
                  updatedRoles[index].name = e.target.value;
                  setRoles(updatedRoles);
                }}
                className="character-trait-name-input"
              />
              <textarea
                placeholder="Add description"
                value={role.description}
                onChange={(e) => {
                  const updatedRoles = [...roles];
                  updatedRoles[index].description = e.target.value;
                  setRoles(updatedRoles);
                }}
                className="character-trait-description-textarea"
              />
              <img
                src={verticalOptionIcon}
                alt="vert"
                className="character-vert-icon"
                onClick={() => deleteTrait(index, setRoles, roles)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Character;
