// src/components/AdminPanel/NotifyUsers.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPaperPlane } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
//import './NotifyUsers.css'; // Import the corresponding CSS file

const NotifyUsers = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [notificationType, setNotificationType] = useState('Reminder'); // Default type
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:5001/api/users/all', {
          headers: { 'x-auth-token': token },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users. Please try again later.');
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleSendNotification = async () => {
    if (!recipientId || !message || !notificationType) {
      alert('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // TODO: Replace with actual logic to obtain projectId and projectType
      const projectId = '67188a0e4cceef6e09074e64'; // Placeholder
      const projectType = 'Novel'; // Placeholder

      const response = await axios.post(
        'http://localhost:5001/api/notifications/send',
        {
          receiverId: recipientId,
          description: message,
          notificationType,
          projectId,
          projectType,
        },
        {
          headers: { 'x-auth-token': token },
        }
      );

      alert(response.data.message || 'Notification sent successfully.');
      setMessage('');
      setRecipientId('');
      setNotificationType('Reminder'); // Reset to default
    } catch (error) {
      console.error('Error sending notification:', error);
      setError(error.response?.data?.error || 'Failed to send notification.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adminNotifyUsers-container">
      <h2 className="adminNotifyUsers-title">Send Notifications</h2>

      {error && <div className="adminNotifyUsers-error">{error}</div>}

      <div className="adminNotifyUsers-form">
        {/* Recipient Selection */}
        <div className="adminNotifyUsers-form-group">
          <label htmlFor="recipient">Recipient:</label>
          <select
            id="recipient"
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
            className="adminNotifyUsers-select"
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.fullname} ({user.email})
              </option>
            ))}
          </select>
        </div>

        {/* Notification Type Selection */}
        <div className="adminNotifyUsers-form-group">
          <label htmlFor="notificationType">Notification Type:</label>
          <select
            id="notificationType"
            value={notificationType}
            onChange={(e) => setNotificationType(e.target.value)}
            className="adminNotifyUsers-select"
          >
            <option value="Reminder">Reminder</option>
            <option value="Update">Update</option>
            <option value="Alert">Alert</option>
            <option value="Invite">Invite</option>
          </select>
        </div>

        {/* Message Input */}
        <div className="adminNotifyUsers-form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="adminNotifyUsers-textarea"
            placeholder="Enter your message here..."
          ></textarea>
        </div>

        {/* Send Button */}
        <button
          className="adminNotifyUsers-button send"
          onClick={handleSendNotification}
          disabled={loading}
        >
          {loading ? 'Sending...' : <><FaPaperPlane /> Send Notification</>}
        </button>
      </div>
    </div>
  );
};

export default NotifyUsers;
