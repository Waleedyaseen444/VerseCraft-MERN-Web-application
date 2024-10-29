import React from 'react';
import './settings.css';


function Editprofile(){

    return(

        <div className="account-page">
            <h1 className="profile-header">Profile Settings</h1>
            <div className="profile-picture"></div>
            <div className="display-name">Username</div>
            <div className="bio">biography</div>
            

            <h1 className="security-header">Security Settings</h1>
            <div className="change-password"></div>
            <div className="login-acitvity"></div>
         
            
            <h1 className="email-header">Email and Notifications</h1>
            <div className="email-address"></div>
            <div className="notfication-preferences"></div>
            

            <h1 className="personal-info">Personal Information</h1>
            <div className="full-name"></div>
            <div className="dob"></div>
            <div className="gender"></div>
            <div className="phone-number"></div>

        </div>

    );

}

export default Editprofile;