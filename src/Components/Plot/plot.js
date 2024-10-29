import React, { useState,useRef,useEffect} from 'react';
import './plot.css';
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
import comIcon from "../Images/comm.png"
import plusIcon from '../Images/Plus.png';
import downrightIcon from '../Images/downright.png';
import zoomInIcon from '../Images/zoom_in.png';   // Add these icons
import zoomOutIcon from '../Images/zoom_out.png'; // Add these icons
import {useNavigate } from 'react-router-dom';
import botIcon from "../Images/Bot.png";

function Plot() {
    const [mainPlots, setMainPlots] = useState([]); //managing the main plots 
    const [linesCount, setLinesCount] = useState(0); // State to track number of white lines for main plots 
    const [overviewCount, setOverviewCount] = useState(0); // State to track number of overview items
    const [overviewItems, setOverviewItems] = useState({}); //managing the overview items 
    const [subPlots, setSubPlots] = useState({}); 

    const [sections, setSections] = useState({}); //managing the main sections 
    const [subSections, setSubSections] = useState({}); //managing the sub sections 
    const [isModalOpen, setIsModalOpen] = useState(false); //open a modal 
    const [sectionModalOpen, setSectionModalOpen] = useState(false); // For section deletion
    const [currentIndex, setCurrentIndex] = useState(null); //keeping track of main sections 
    const [currentSection, setCurrentSection] = useState(null); // For tracking the current section
    const [showSections, setShowSections] = useState({});
    const [isMainPlotModalOpen, setIsMainPlotModalOpen] = useState(false);
    const [isMainSectionModalOpen, setIsMainSectionModalOpen] = useState(false);
    const [selectedMainPlotIndex, setSelectedMainPlotIndex] = useState(null);
    const [selectedMainSectionIndex, setSelectedMainSectionIndex] = useState(null);
    const [isSubSectionModalOpen, setIsSubSectionModalOpen] = useState(false);
    const [currentSubPlotIndex, setCurrentSubPlotIndex] = useState(null);
    const [currentSubSectionIndex, setCurrentSubSectionIndex] = useState(null);
    const mainSectionRefs = useRef({});
    const [activeMainSectionIndex, setActiveMainSectionIndex] = useState(null); // Track the selected main section
    const [sublinesCount, setsubLinesCount] = useState(0); // State to track number of lines
    const [mainPlotIndex, setMainPlotIndex] = useState(null); 
    const [sectionSummaries, setSectionSummaries] = useState({});
    const [zoomLevel, setZoomLevel] = useState(1); // Add zoom level state
    const [verticalLinePosition, setVerticalLinePosition] = useState({});

    const overviewRefs = useRef({});

    const handleZoomIn = () => {
        setZoomLevel(prevZoom => Math.min(prevZoom + 0.1, 2)); // Limit zoom in to 2x
    };

    const handleZoomOut = () => {
        setZoomLevel(prevZoom => Math.max(prevZoom - 0.1, 0.5)); // Limit zoom out to 0.5x
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



    const addMainPlot = () => {
        setMainPlots([...mainPlots, '']);
        setLinesCount(linesCount + 1);
    };

       // Handle changes in main plot sections
       const handleSectionChange = (mainPlotIndex, sectionIndex, newValue) => {
        const updatedSections = [...sections];
        updatedSections[mainPlotIndex][sectionIndex] = newValue;
        setSections(updatedSections);

        // Automatically update corresponding subplot names
        const updatedSubPlots = [...subPlots];
        if (!updatedSubPlots[mainPlotIndex]) {
            updatedSubPlots[mainPlotIndex] = [];
        }
        updatedSubPlots[mainPlotIndex][sectionIndex] = newValue;
        setSubPlots(updatedSubPlots);
    };


    const removeMainPlot = (index) => {
        const newPlots = mainPlots.filter((_, i) => i !== index);
        setMainPlots(newPlots);
    
        // Update lines count
        if (newPlots.length < linesCount) {
            setLinesCount(linesCount - 1);
        }
    
        // Remove sections related to the deleted main plot
        setSections((prevSections) => {
            const updatedSections = { ...prevSections };
            delete updatedSections[index]; // Remove the sections of the deleted plot
    
            // Adjust the keys of the sections for the remaining plots
            const newSections = {};
            Object.keys(updatedSections).forEach((key) => {
                const numKey = parseInt(key, 10);
                if (numKey > index) {
                    newSections[numKey - 1] = updatedSections[key]; // Shift down the section index
                } else if (numKey < index) {
                    newSections[numKey] = updatedSections[key]; // Keep the same if before deleted index
                }
            });
    
            return newSections;
        });



    
        // Remove sub-sections related to the deleted main plot
        setSubSections((prevSubSections) => {
            const updatedSubSections = { ...prevSubSections };
            delete updatedSubSections[index]; // Remove the sub-sections of the deleted plot
    
            // Adjust the keys of the sub-sections for the remaining plots
            const newSubSections = {};
            Object.keys(updatedSubSections).forEach((key) => {
                const numKey = parseInt(key, 10);
                if (numKey > index) {
                    newSubSections[numKey - 1] = updatedSubSections[key]; // Shift down the sub-section index
                } else if (numKey < index) {
                    newSubSections[numKey] = updatedSubSections[key]; // Keep the same if before deleted index
                }
            });
    
            return newSubSections;
        });
    
        closeModal();
    };

    const addSubPlot = (mainPlotIndex, sectionIndex) => {
        const key = `${mainPlotIndex}-${sectionIndex}`;
        const overviewElement = overviewRefs.current[key];

        if (overviewElement) {
            const rect = overviewElement.getBoundingClientRect();
            const container = document.querySelector('.plot-dashboard');
            const containerRect = container.getBoundingClientRect(); // Get container's bounding rect

            // Define dynamic offsets
            const topOffset = 10; // 10px below the element
            const leftOffset = 15; // 15px to the right of the center

            // Calculate positions relative to the scaled container and adjust for zoom level
            const top = (rect.bottom - containerRect.top + topOffset) / zoomLevel;
            const left = (rect.left - containerRect.left + rect.width / 2 + leftOffset) / zoomLevel;

            setVerticalLinePosition((prev) => ({
                ...prev,
                [key]: {
                    top: top,
                    left: left,
                },
            }));
        }

        // Add subplot logic
        setSubPlots((prev) => ({
            ...prev,
            [key]: [
                ...(prev[key] || []),
                `Sub-plot ${prev[key]?.length + 1 || 1}`,
            ],
        }));
    };

    // Recalculate vertical line positions on zoom or window resize
    useEffect(() => {
        const handleResizeAndZoom = () => {
            Object.keys(subPlots).forEach((key) => {
                const [mainPlotIndex, sectionIndex] = key.split('-').map(Number);
                const overviewElement = overviewRefs.current[key];

                if (overviewElement) {
                    const rect = overviewElement.getBoundingClientRect();
                    const container = document.querySelector('.plot-dashboard');
                    const containerRect = container.getBoundingClientRect();

                    const topOffset = 10; // Same as in addSubPlot
                    const leftOffset = 15; // Same as in addSubPlot

                    const top = (rect.bottom - containerRect.top + topOffset) / zoomLevel;
                    const left = (rect.left - containerRect.left + rect.width / 2 + leftOffset) / zoomLevel;

                    setVerticalLinePosition((prev) => ({
                        ...prev,
                        [key]: {
                            top: top,
                            left: left,
                        },
                    }));
                }
            });
        };
           // Initial calculation
           handleResizeAndZoom();

           // Add event listeners
           window.addEventListener('resize', handleResizeAndZoom);
   
           // Clean up event listeners on unmount
           return () => {
               window.removeEventListener('resize', handleResizeAndZoom);
           };
       }, [zoomLevel, subPlots]);
   
    
    
    const overviewRef = (mainPlotIndex, sectionIndex) => (element) => {
        overviewRefs.current[`${mainPlotIndex}-${sectionIndex}`] = element; // Store reference to overview-item
    };
    

    const removeSubPlot = (index) => {
        const newPlots = subPlots.filter((_, i) => i !== index);
        setSubPlots(newPlots);
        closeModal();
    };



    const openModal = (index, isMain) => {
        setIsModalOpen(true);
        setCurrentIndex({ index, isMain });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentIndex(null);
    };



    const openSectionModal = (sectionIndex, isMain) => {
        setSectionModalOpen(true);
        setCurrentSection({ sectionIndex, isMain });
    };

    const closeSectionModal = () => {
        setSectionModalOpen(false);
        setCurrentSection(null);
    };



    const handleDelete = () => {
        if (currentIndex.isMain) {
            removeMainPlot(currentIndex.index);
        } else {
            removeSubPlot(currentIndex.index);
        }
    };

    const handleSectionSummaryChange = (plotIndex, sectionIndex, newSummary) => {
        setSectionSummaries((prevSummaries) => ({
            ...prevSummaries,
            [plotIndex]: {
                ...prevSummaries[plotIndex],
                [sectionIndex]: newSummary,
            },
        }));
    };



    const deleteSection = () => {
        if (currentSection.isMain) {
            setSections((prev) => {
                const updatedSections = [...(prev[currentSection.sectionIndex.index] || [])];
                updatedSections.splice(currentSection.sectionIndex.secIndex, 1);
                return { ...prev, [currentSection.sectionIndex.index]: updatedSections };
            });
            setOverviewCount(overviewCount - 1);
        } else {
            setSubSections((prev) => {
                const updatedSubSections = [...(prev[currentSection.sectionIndex.index] || [])];
                updatedSubSections.splice(currentSection.sectionIndex.secIndex, 1);
                return { ...prev, [currentSection.sectionIndex.index]: updatedSubSections };
            });
        }
        closeSectionModal();
    };




    const addSection = () => {
        if (currentIndex.isMain) {
            // Get the current number of sections for this main plot
            const currentSectionCount = (sections[currentIndex.index] || []).length;
            const newOverviewItem = `Main-section ${currentSectionCount +1}`;
            
            setSections((prev) => {
                const updatedSections = {
                    ...prev,
                    [currentIndex.index]: [...(prev[currentIndex.index] || []), newOverviewItem],
                };
                setShowSections((prevShow) => ({
                    ...prevShow,
                    [`main_${currentIndex.index}`]: true,
                }));
                return updatedSections;
            });
            
            setOverviewItems((prev) => ({
                ...prev,
                [currentIndex.index]: [...(prev[currentIndex.index] || []), newOverviewItem],
            }));
    
        } else {
            const currentSubSectionCount = (subSections[currentIndex.index] || []).length;
            const newSubSection = `Sub-section ${currentSubSectionCount}`;
            
            setSubSections((prev) => {
                const updatedSubSections = {
                    ...prev,
                    [currentIndex.index]: [...(prev[currentIndex.index] || []), newSubSection],
                };
                setShowSections((prevShow) => ({
                    ...prevShow,
                    [`sub_${currentIndex.index}`]: true,
                }));
                return updatedSubSections;
            });
        }
        closeModal();
    };




    const handleSectionNameChange = (index, secIndex, newName) => {
        setSections((prevSections) => {
            const updatedSections = {
                ...prevSections,
                [index]: prevSections[index].map((section, i) => (i === secIndex ? newName : section)), // Update section name
            };
            return updatedSections;
        });
    
        setOverviewItems((prevOverviewItems) => {
            const updatedOverviewItems = {
                ...prevOverviewItems,
                [index]: prevOverviewItems[index].map((item, i) => (i === secIndex ? newName : item)), // Update corresponding overview item
            };
            return updatedOverviewItems;
        });
    };

    
    const togglemainSectionVisibility = (index) => {
        const key = `main_${index}`;
        setShowSections((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const togglesubSectionVisibility = (index) => {
        setShowSections((prev) => ({ ...prev, [`sub_${index}`]: !prev[`sub_${index}`] }));
    };



    const openMainPlotModal = () => {
        setIsMainPlotModalOpen(true);
    };

    const closeMainPlotModal = () => {
        setIsMainPlotModalOpen(false);
    };

    const openMainSectionModal = (mainPlotIndex) => {
        setSelectedMainPlotIndex(mainPlotIndex);
        setIsMainSectionModalOpen(true);
        closeMainPlotModal();
    };

    const closeMainSectionModal = () => {
        setIsMainSectionModalOpen(false);
        setSelectedMainPlotIndex(null);
        setSelectedMainSectionIndex(null);
    };

    const selectMainSection = (secIndex) => {
        setSelectedMainSectionIndex(secIndex);
        closeMainSectionModal();
        addSubPlot(selectedMainPlotIndex, secIndex);
    };


    const addSubSection = (subplotIndex) => {
        setSubSections((prev) => {
            const updatedSubSections = { ...prev };
            updatedSubSections[subplotIndex] = [
                ...(updatedSubSections[subplotIndex] || []),
                '',
            ];
            return updatedSubSections;
        });
    };

    const handleSubSectionChange = (subplotIndex, secIndex, value) => {
        setSubSections((prev) => {
            const updatedSubSections = [...(prev[subplotIndex] || [])];
            updatedSubSections[secIndex] = value;
            return { ...prev, [subplotIndex]: updatedSubSections };
        });
    };

    const deleteSubSection = (subplotIndex, secIndex) => {
        setSubSections((prev) => {
            const updatedSubSections = [...(prev[subplotIndex] || [])];
            updatedSubSections.splice(secIndex, 1); // Remove the section
            return { ...prev, [subplotIndex]: updatedSubSections };
        });
    };

    const openSubSectionModal = (index, secIndex) => {
        setCurrentSubPlotIndex(index);
        setCurrentSubSectionIndex(secIndex);
        setIsSubSectionModalOpen(true);
    };

    const closeSubSectionModal = () => {
        setIsSubSectionModalOpen(false);
        setCurrentSubPlotIndex(null);
        setCurrentSubSectionIndex(null);
    };


    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar state
    };

    const [overviewColors, setOverviewColors] = useState({}); // Store colors for each overview item
    const [customMenuVisible, setCustomMenuVisible] = useState(false); // Toggle for custom context menu
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 }); // Context menu position
    const [selectedOverviewIndex, setSelectedOverviewIndex] = useState(null); // Track which overview item is selected for context menu



// Update to store both mainPlotIndex and sectionIndex
const handleRightClick = (e, mainPlotIndex, sectionIndex) => {
    e.preventDefault();
    setSelectedOverviewIndex({ mainPlotIndex, sectionIndex });
    setMenuPosition({ x: e.pageX, y: e.pageY });
    setCustomMenuVisible(true);
};

// Update to use both mainPlotIndex and sectionIndex as key
const handleColorChange = (color) => {
    if (selectedOverviewIndex !== null) {
        const { mainPlotIndex, sectionIndex } = selectedOverviewIndex;
        setOverviewColors((prevColors) => ({
            ...prevColors,
            [`${mainPlotIndex}-${sectionIndex}`]: color,
        }));
    }
    setCustomMenuVisible(false);
};

    const handleClickOutside = () => {
        setCustomMenuVisible(false);
    };

    
    const [characters, setCharacters] = useState([
        
      ]); 
      const [selectedCharacters, setSelectedCharacters] = useState([]);
      const [newCharacter, setNewCharacter] = useState(''); // State to handle new character input
    
      const handleCharacterChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedCharacters(selectedOptions);
      };
    
      const handleAddCharacter = () => {
        if (newCharacter.trim()) {
          setCharacters((prevCharacters) => [...prevCharacters, newCharacter.trim()]);
          setNewCharacter(''); // Clear the input field after adding
        }
      };





    return (
        <div className="plot-container">
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
      
            <div className="plot-sidepanel">
                <h1 className="plot-header">Plot Navigation</h1>
                <div className="main-plots">
                    <h1>Main Plots</h1>
                    <img src={plusIcon} alt="main-plus" className="main-plus-icon" onClick={addMainPlot} />
                    <div className="add-main-plot">
                        {mainPlots.map((plot, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    placeholder={`Main Plot ${index + 1}`} 
                                    className="main-plot-input"
                                    value={plot}
                                    onChange={(e) => {
                                        const newPlots = [...mainPlots];
                                        newPlots[index] = e.target.value;
                                        setMainPlots(newPlots);
                                    }}
                                    onContextMenu={(e) => {
                                        e.preventDefault();
                                        openModal(index, true);
                                    }}
                                />
                                <button className={`dropdown-main ${showSections[`main_${index}`] ? 'rotated' : ''}`}
                                onClick={() => togglemainSectionVisibility(index, false)}>

                                    {showSections[`main_${index}`]? '' : ''}
                                </button>
                                {showSections[`main_${index}`] && (
                                    <div className="sections">
                                        {(sections[index] || []).map((section, secIndex) => (
                                            <div key={secIndex} className="section-item">
                                                <img src={downrightIcon} alt="down-icon" className="downright-icon" />
                                                <input
                                                    type="text"
                                                    placeholder={`Main-section ${secIndex + 1}`} 
                                                    className="main-plot-section-input"
                                                    value={section}
                                                    onChange={(e) => {
                                                        const updatedSections = [...(sections[index] || [])];
                                                        updatedSections[secIndex] = e.target.value;
                                                        setSections({ ...sections, [index]: updatedSections });
                                                    }}
                                                    onContextMenu={(e) => {
                                                        e.preventDefault(); // Prevent the default context menu
                                                        openSectionModal({ index, secIndex }, true); // Open the section modal
                                                    }}
                                                    onChangeName={(e) => handleSectionNameChange(index, secIndex, e.target.value)} // Update section and overview simultaneously
                                                    onContextMenuName={(e) => {
                                                        e.preventDefault(); // Prevent the default context menu
                                                        openSectionModal({ index, secIndex }, true); // Open the section modal
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="sub-plots">
                <h1>Sub Plots</h1>
                <img src={plusIcon} alt="Add Sub Plot" className="sub-plus-icon" onClick={openMainPlotModal} />
                <div className="add-sub-plot">
                            {Object.entries(subPlots).map(([key, plots]) => (
                                plots.map((plot, index) => (
                                    <div key={`${key}-${index}`}>
                                        {/* Automatically update the subplot name based on the main section name */}
                                        <input
                                            type="text"
                                            placeholder="Sub Plot"
                                            className="sub-plot-input"
                                            value={sections[mainPlotIndex]?.[index] || plot} // Use main section name if available
                                            onChange={(e) => {
                                                // Extract mainPlotIndex and sectionIndex from the key
                                                const [mainPlotIdx, sectionIdx] = key.split('-').map(Number);
                                                setSubPlots((prev) => ({
                                                    ...prev,
                                                    [key]: prev[key].map((p, i) => (i === index ? e.target.value : p)),
                                                }));
                                            }}
                                            onContextMenu={(e) => {
                                                e.preventDefault();
                                                openSubSectionModal(key, index); // Pass key and subplot index
                                            }}
                                            onDoubleClick={() => openSubSectionModal(key, index)} // Pass key and subplot index
                                        />
                                        <button
                                            className={`dropdown-sub ${showSections[`sub_${key}-${index}`] ? 'rotated' : ''}`}
                                            onClick={() => togglesubSectionVisibility(`${key}-${index}`)}
                                        >
                                            {/* Add an icon or symbol here if needed */}
                                        </button>
                                        
                                        {showSections[`sub_${key}-${index}`] && (
                                            <div className="sections">
                                                {(subSections[key] || []).map((section, secIndex) => (
                                                    <div key={secIndex} className="section-item">
                                                        <img src={downrightIcon} alt="down-icon" className="sub-downright-icon" />
                                                        <input
                                                            type="text"
                                                            placeholder="Sub-Section"
                                                            className="sub-plot-section-input"
                                                            value={section}
                                                            onChange={(e) => handleSubSectionChange(key, secIndex, e.target.value)}
                                                            onContextMenu={(e) => {
                                                                e.preventDefault();
                                                                openSubSectionModal(key, secIndex); // Pass key and section index
                                                            }}
                                                            onDoubleClick={() => openSubSectionModal(key, secIndex)} // Pass key and section index
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))
                            ))}
                        </div>
            </div>
            </div>

            {/* Modal for Confirmation and Add Section */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Plot Actions</h2>
                        <button onClick={handleDelete}>Delete</button>
                        <button onClick={addSection}>Add Section</button>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
            {/* Delete Section Modal */}
            {sectionModalOpen && (
                <div className="modal">
                    <div className="modal-overlay">
                        <h2>Delete Section</h2>
                        <p>Are you sure you want to delete this section?</p>
                        <button className="modal-button" onClick={deleteSection}>
                            Delete
                        </button>
                        <button className="modal-button" onClick={closeSectionModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            
                <div className="plot-dashboard" onClick={handleClickOutside} >
                    
                    <div className="zoom-controls">
                        {/* Buttons for Zoom In and Zoom Out */}
                        <button className="zoom-button" onClick={handleZoomIn}>
                            <img src={zoomInIcon} alt="Zoom In" />
                        </button>
                        <button className="zoom-button" onClick={handleZoomOut}>
                            <img src={zoomOutIcon} alt="Zoom Out" />
                        </button>
                    </div>
                            
                    <div className="main-plot-visual" style={{ transform: `scale(${zoomLevel})`, transformOrigin: '0 0' }}>
                        {mainPlots.map((plot, index) => (
                            <div key={index} className="main-plot-container">
                                {/* Plot indicator placed above the white line */}
                                <div className="white-line" />

                                {/* Render the corresponding overview below the white line */}
                                <div className="overview">
                                    <div className="plot-indicator">
                                        {mainPlots[index] || `Main-Plot ${index + 1}`} {/* Display main plot name */}
                                    </div>
                                    {(sections[index] || []).map((sectionName, secIndex) => (
                                        <div
                                            key={secIndex}
                                            className="overview-item"
                                            ref={overviewRef(index, secIndex)}
                                            style={{
                                                backgroundColor: overviewColors[`${index}-${secIndex}`] || 'white',
                                            }}
                                            onContextMenu={(e) => handleRightClick(e, index, secIndex)}
                                        >
                                            <div className="section-header">
                                                {sectionName || `Main-section ${secIndex + 1}`} {/* Display section name */}
                                            </div>
                                            {/* Summary Section within each overview-item */}
                                            <div className="section-summary">
                                                <h4>Summary</h4>
                                                <textarea
                                                    placeholder="Enter section summary..."
                                                    className="summary-textarea"
                                                    value={sectionSummaries[index]?.[secIndex] || ''}
                                                    onChange={(e) =>
                                                        handleSectionSummaryChange(index, secIndex, e.target.value)
                                                    }
                                                />
                                            </div>

                                            
                                            <div className="section-characters">
                                                {/* Add character input */}
                                                <div className="add-character-section">
                                                    <input
                                                        type="text"
                                                        value={newCharacter}
                                                        placeholder="Add new character"
                                                        onChange={(e) => setNewCharacter(e.target.value)}
                                                    />
                                                    <button onClick={handleAddCharacter}>Add Character</button>
                                                    </div>
                                                <h4>Characters Involved</h4>
                                                <select multiple value={selectedCharacters} onChange={handleCharacterChange}>
                                                {characters.map((character, idx) => (
                                                    <option key={idx} value={character}>
                                                    {character}
                                                    </option>
                                                ))}
                                                </select>

                                                
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                       
                    </div>
                     {/* Render Vertical Lines Inside the Scaled Container */}
                     {Object.entries(verticalLinePosition || {}).map(([key, position]) => (
                            <div
                                key={key}
                                className="subplot-line"
                                style={{
                                    position: 'absolute',
                                    top: `${position.top}px`,
                                    left: `${position.left}px`,
                                    height: '30px', // Adjust as needed
                                    width: '4px',
                                    backgroundColor: 'white',
                                }}
                            />
                        ))}

                 
                </div>
         

            {/* Custom Context Menu for Color Selection */}
            {customMenuVisible && (
                <div
                    className="custom-menu"
                    style={{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }}
                >
                    <button onClick={() => handleColorChange('lightblue')}>Light Blue</button>
                    <button onClick={() => handleColorChange('lightgreen')}>Light Green</button>
                    <button onClick={() => handleColorChange('lightcoral')}>Light Coral</button>
                    <button onClick={() => handleColorChange('lightgoldenrodyellow')}>Light Yellow</button>
                </div>
            )}


               {/* Modal for selecting main plot */}
            {isMainPlotModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Select Main Plot</h2>
                        {mainPlots.map((plot, index) => (
                            <button key={index} onClick={() => openMainSectionModal(index)}>
                                {plot || `Main Plot ${index + 1}`}
                            </button>
                        ))}
                        <button onClick={closeMainPlotModal}>Close</button>
                    </div>
                </div>
            )}

            {/* Modal for selecting main section */}
            {isMainSectionModalOpen && selectedMainPlotIndex !== null && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Select Main Section for {mainPlots[selectedMainPlotIndex]}</h2>
                        {(sections[selectedMainPlotIndex] || []).map((section, secIndex) => (
                            <button key={secIndex} onClick={() => selectMainSection(secIndex)}>
                                {section || `Main Section ${secIndex + 1}`}
                            </button>
                        ))}
                        <button onClick={closeMainSectionModal}>Close</button>
                    </div>
                </div>
            )}




            {/* Modal for managing sub-sections */}
            {isSubSectionModalOpen && currentSubPlotIndex !== null && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Manage Sub-Section</h2>
                        <button onClick={() => {
                            addSubSection(currentSubPlotIndex); // Add section
                            closeSubSectionModal();
                        }}>Add Sub-Section</button>
                        <button onClick={() => {
                            if (currentSubSectionIndex !== null) {
                                deleteSubSection(currentSubPlotIndex, currentSubSectionIndex); // Delete section
                            }
                            closeSubSectionModal();
                        }}>Delete Sub-Section</button>
                        <button onClick={closeSubSectionModal}>Close</button>
                    </div>
                </div>
            )}

        </div>
          
    
    );
}

export default Plot;
