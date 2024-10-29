import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import Homepage from './Components/Homepage/homepage';
import SplashScreen from './Components/SplashScreen/splashscreen'; 
import Login from './Components/Login/login'; 
import SignUp from './Components/Signup/signup'; 
import Plot from "./Components/Plot/plot";
import Character from "./Components/Character/character";
import Setting from "./Components/Settings/settings";
import Profile from "./Components/Profile/profile"; 
import Publish from "./Components/Publishing/publishing";
import Saved from "./Components/SavedWorks/savedworks";
import Notification from "./Components/Notifications/notifications";
import Progress from "./Components/ProgressPage/progress";
import Version from "./Components/Version/version";
import Novelboard from "./Components/NovelDashboard/noveldashboard"
import Favorite from "./Components/Favorites/favorites"
import Avatar from "./Components/Avatar/Avatarapp"
import Storyboard from "./Components/Storyboard/storyboard";
import Admin from "./Components/Adminpenal/Adminpenal";
import Chatbot from "./Components/Chatbot/ChatbotApp";
import CharacterGrid from "./Components/CharacterCards/CharacterGrid";


import Urduboard from "./Components/UrduEditor/urdueditor";


import './App.css'; 


function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to manage authentication

  // Show splash screen for a certain duration (4 seconds in this case)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 8000); // Adjust the duration of the splash screen as needed

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />; // Show SplashScreen initially
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/Homepage" replace />
            ) : (
              <Navigate to="/Login" replace />
            )
          }
        />
        
        <Route
          path="/Login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
       
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Homepage" element={<Homepage />} />
        {/* <Route path="/Novelboard" element={<Novelboard/>} /> */}
        <Route path="/Plot" element={<Plot />} />
        <Route path="/Character" element={<Character />} />
        <Route path="/Publishing" element={<Publish />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Saved" element={<Saved />} />
        <Route path="/Setting" element={<Setting/>} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/Progress" element={<Progress/>} />
        <Route path="/Favorite" element={<Favorite/>} />
        <Route path="/Version" element={<Version/>} />
        <Route path="/Avatar" element={<Avatar/>} />
        <Route path="/Admin" element={<Admin/>} />
        <Route path="Chatbot" element={<Chatbot/>} />
        <Route path="CharacterGrid" element={<CharacterGrid/>} />
        {/* <Route path="/Urduboard" element={<Urduboard/>} /> */}

        <Route path="/Storyboard/:projectId" element={<Storyboard />} />
        <Route path="/Novelboard/:projectId" element={<Novelboard />} />
        <Route path="/Urduboard/:projectId" element={<Urduboard />} />


       
        
        
       

      </Routes>
    </div>
  );
}

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;


/*
import './App.css';   // Ensure you have App.css for general app styling


function App() {
    return (
        <div className="App">
            <Avatar />
        </div>
    );
}

export default App;
*/