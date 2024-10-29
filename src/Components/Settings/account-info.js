import React, { useState } from 'react';
import './settings.css';

import profileIcon from "../Images/generic-user-profile-picture.png";
import backgroundIcon from "../Images/user-background-image.png";


function AccountInfo(){

    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    // State for handling login times
  const [loginTimes] = useState([
    '2024-10-01 14:32',
    '2024-09-28 10:22',
    '2024-09-25 08:11',
    '2024-09-20 19:45',
    '2024-10-01 14:32',
    '2024-09-28 10:22',
    '2024-09-25 08:11',
    '2024-09-20 19:45',
    '2024-10-01 14:32',
    '2024-09-28 10:22',
    '2024-09-25 08:11',
    '2024-09-20 19:45',
  ]);

  // States for handling password change
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState(profileIcon);
  const [backgroundImage, setBackgroundImage] = useState(backgroundIcon);
   // Email and Notification Preferences State
   const [email, setEmail] = useState('user@example.com');
   const [generalUpdates, setGeneralUpdates] = useState(true);
   const [securityAlerts, setSecurityAlerts] = useState(true);
   const [featureAnnouncements, setFeatureAnnouncements] = useState(false);
   const [emailNotifications, setEmailNotifications] = useState(true);
   const [notificationFrequency, setNotificationFrequency] = useState('immediately');

    // Function to verify the email address
    const handleVerifyEmail = () => {
        alert('A verification link has been sent to your email address. Please check your inbox.');
    };

    // Function to unsubscribe from all non-essential emails
    const handleUnsubscribeAll = () => {
        setGeneralUpdates(false);
        setFeatureAnnouncements(false);
        alert('You have been unsubscribed from all non-essential emails.');
    };

    // Function to save changes made to email and notification settings
    const handleSaveChanges = () => {
        // Example logic to save settings (in a real application, you'd send this data to your backend)
        alert('Your email and notification preferences have been saved.');
        console.log({
            email,
            generalUpdates,
            securityAlerts,
            featureAnnouncements,
            emailNotifications,
            notificationFrequency,
        });
    };


  // Function to open the password change modal
  const handleOpenModal = () => {
    setPasswordModalOpen(true);
  };


    // Function to handle profile image change
    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    // Function to handle background image change
    const handleBackgroundImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setBackgroundImage(imageUrl);
        }
    };


  // Function to close the password modal
  const handleCloseModal = () => {
    setPasswordModalOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrorMessage('');
  };

  // Function to validate password and move to the next step
  const handlePasswordChange = () => {
    // Example validation logic for password
    if (currentPassword !== 'your_current_password') {
      setErrorMessage('Current password is incorrect.');
    } else if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password do not match.');
    } else {
      // Assume password change is successful
      setErrorMessage('');
      alert('Password changed successfully!');
      handleCloseModal(); // Close modal on success
    }
  };


    return(

        <div className="setting-account-page">
            <h1 className="setting-profile-header">Profile</h1>
            <h2 className="setting-profile-header-description"> Manage your profile details</h2>
            <div className="setting-profile-header-line01"></div>
            <div className="setting-profile-picture">
                <img src={profileImage} alt="Profile" className="setting-profile-icon" />
                <input
                    type="file"
                    id="profileImageInput"
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleProfileImageChange}
                />
                <button
                    className="edit-profile-image-button"
                    onClick={() => document.getElementById('profileImageInput').click()}
                >
                    edit image
                </button>
            </div>

            <div className="setting-profile-background-image">
                <img src={backgroundImage} alt="Background" className="setting-background-icon" />
                <input
                    type="file"
                    id="backgroundImageInput"
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleBackgroundImageChange}
                />
                <button
                    className="edit-background-image-button"
                    onClick={() => document.getElementById('backgroundImageInput').click()}
                >
                    Change Background Image
                </button>
            </div>

             {/* Input field for username */}
             <div className="setting-display-name">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    className="username-input-field"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username "
                />
                
            </div>

            {/* Textarea for biography */}
            <div className="setting-bio">
                <label htmlFor="bio">Biography</label>
                <textarea
                    id="bio"
                    className="bio-field"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell people something about yourself"
                />
               
            </div>
            
            <h1 className="setting-security-header">Security Settings</h1>
            <h2 className="setting-security-header-description">Manage your security preferences</h2>
            <div className="setting-security-header-line01"></div>
            {/* Change Password Section */}
        <div className="setting-change-password">
            <span>Change Password:</span>
            <button onClick={handleOpenModal} className="change-password-button">Change Password</button>
        </div>

        <div className="setting-security-header-line02"></div>

        {/* Login Activity Section */}
        <div className="setting-login-activity">
            <h2>Login Activity</h2>
            <ul>
            {loginTimes.map((time, index) => (
                <li key={index}>{time}</li>
            ))}
            </ul>
        </div>

        {/* Password Change Modal */}
        {isPasswordModalOpen && (
            <div className="modal">
            <div className="modal-content">
                <h2>Change Password</h2>
                <label>
                Current Password
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                </label>
                <label>
                New Password
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                </label>
                <label>
                Confirm Password
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                </label>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button onClick={handlePasswordChange} className="confirm-button">
                Confirm Change
                </button>
                <button onClick={handleCloseModal} className="cancel-button">
                Cancel
                </button>
            </div>
            </div>
             )}


            <h1 className="setting-email-header">Email and Notifications</h1>
            <h2 className="setting-email-header-description">View your email and notification preferences</h2>
            <div className="setting-email-header-line01"></div>

            <div className="setting-email-address">
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    className="email-input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                />
                
            </div>
            <button className="verify-email-button" onClick={handleVerifyEmail}>Verify Email</button>
            <div className="setting-email-header-line02"></div>

            
            <div className="setting-notification-preferences">
                <h3>Notification Preferences</h3>
                
                <div className="setting-notification-option">
                    <input
                        type="checkbox"
                        id="generalUpdates"
                        checked={generalUpdates}
                        onChange={(e) => setGeneralUpdates(e.target.checked)}
                    />
                    <label htmlFor="generalUpdates">Receive general updates and news</label>
                </div>

                <div className="setting-notification-option">
                    <input
                        type="checkbox"
                        id="securityAlerts"
                        checked={securityAlerts}
                        onChange={(e) => setSecurityAlerts(e.target.checked)}
                    />
                    <label htmlFor="securityAlerts">Receive login alerts and password change notifications</label>
                </div>

                <div className="setting-notification-option">
            <input
                type="checkbox"
                id="featureAnnouncements"
                checked={featureAnnouncements}
                onChange={(e) => setFeatureAnnouncements(e.target.checked)}
            />
            <label htmlFor="featureAnnouncements">Receive new feature announcements</label>
                </div>


                <div className="setting-notification-option">
                    <input
                        type="checkbox"
                        id="emailNotifications"
                        checked={emailNotifications}
                        onChange={(e) => setEmailNotifications(e.target.checked)}
                    />
                    <label htmlFor="emailNotifications">Enable email notifications</label>
                </div>
                <div className="setting-notification-frequency">
                <h3>Notification Frequency</h3>
                <select
                    id="notificationFrequency"
                    className="notification-frequency-select"
                    value={notificationFrequency}
                    onChange={(e) => setNotificationFrequency(e.target.value)}
                >
                    <option value="immediately">Immediately</option>
                    <option value="daily">Daily Summary</option>
                    <option value="weekly">Weekly Summary</option>
                </select>
            </div>
        <div className="setting-unsubscribe">
            <button className="unsubscribe-button" onClick={handleUnsubscribeAll}>
                Unsubscribe from All Non-Essential Emails
            </button>
        </div>
        <div className="setting-save-changes">
            <button className="save-changes-button" onClick={handleSaveChanges}>
                Save Changes
            </button>
        </div>
        </div>



            <h1 className="setting-personal-info">Personal Information</h1>
            <h2 className="setting-email-personal-description">Edit your personal details</h2>
            <div className="setting-personal-header-line01"></div>
            <div className="setting-full-name">
                <label htmlFor="fullName">Full Name</label>
                <input
                    type="text"
                    id="fullName"
                    className="name-input-field"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                />
            </div>

            {/* Input field for Date of Birth */}
            <div className="setting-dob">
                <label htmlFor="dob">Date of Birth</label>
                <input
                    type="date"
                    id="dob"
                    className="dob-input-field"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                />
            </div>

            {/* Input field for Phone Number */}
            <div className="setting-phone-number">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    className="phone-input-field"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                />
            </div>

            {/* Input field for Gender */}
            <div className="setting-gender">
                <label htmlFor="gender">Gender</label>
                <select
                    id="gender"
                    className="gender-input-field"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>

        </div>

    );

}

export default AccountInfo;