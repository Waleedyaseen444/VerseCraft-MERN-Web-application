// src/components/UserManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
//import './UserManagement.css'; // Import the corresponding CSS

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editUserId, setEditUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({});

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const usersRes = await axios.get('http://localhost:5001/api/admin/users');
      setUsers(usersRes.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`http://localhost:5001/api/admin/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete user. Please try again.');
    }
  };

  const handleEditUser = (user) => {
    setEditUserId(user._id);
    setEditUserData({ ...user });
  };

  const handleCancelEditUser = () => {
    setEditUserId(null);
    setEditUserData({});
  };

  const handleSaveUser = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/admin/users/${id}`, editUserData);
      setUsers(users.map((user) => (user._id === id ? editUserData : user)));
      setEditUserId(null);
      setEditUserData({});
    } catch (err) {
      console.error(err);
      alert('Failed to update user. Please check the input and try again.');
    }
  };

  if (loading) {
    return <div className="adminusermange-loading">Loading...</div>;
  }

  if (error) {
    return <div className="adminusermange-error">{error}</div>;
  }

  return (
    <div className="adminusermange-container">
      <h2 className="adminusermange-title">Manage Users</h2>
      <div className="adminusermange-table-container">
        <table className="adminusermange-table">
          <thead>
            <tr>
              {[
                'Full Name',
                'Email',
                'Age',
                'Gender',
                'Phone',
                'Description',
                'Profile Image',
                'User Type', // New Column
                'Actions',
              ].map((header) => (
                <th key={header} className="adminusermange-table-header">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="adminusermange-table-row">
                <td className="adminusermange-table-cell">
                  {editUserId === user._id ? (
                    <input
                      type="text"
                      value={editUserData.fullname}
                      onChange={(e) =>
                        setEditUserData({ ...editUserData, fullname: e.target.value })
                      }
                      className="adminusermange-input"
                    />
                  ) : (
                    user.fullname
                  )}
                </td>
                <td className="adminusermange-table-cell">
                  {editUserId === user._id ? (
                    <input
                      type="email"
                      value={editUserData.email}
                      onChange={(e) =>
                        setEditUserData({ ...editUserData, email: e.target.value })
                      }
                      className="adminusermange-input"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="adminusermange-table-cell">
                  {editUserId === user._id ? (
                    <input
                      type="number"
                      value={editUserData.age}
                      onChange={(e) =>
                        setEditUserData({ ...editUserData, age: e.target.value })
                      }
                      className="adminusermange-input"
                    />
                  ) : (
                    user.age
                  )}
                </td>
                <td className="adminusermange-table-cell">
                  {editUserId === user._id ? (
                    <select
                      value={editUserData.gender}
                      onChange={(e) =>
                        setEditUserData({ ...editUserData, gender: e.target.value })
                      }
                      className="adminusermange-select"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    user.gender
                  )}
                </td>
                <td className="adminusermange-table-cell">
                  {editUserId === user._id ? (
                    <input
                      type="text"
                      value={editUserData.phone}
                      onChange={(e) =>
                        setEditUserData({ ...editUserData, phone: e.target.value })
                      }
                      className="adminusermange-input"
                    />
                  ) : (
                    user.phone
                  )}
                </td>
                <td className="adminusermange-table-cell">
                  {editUserId === user._id ? (
                    <textarea
                      value={editUserData.description}
                      onChange={(e) =>
                        setEditUserData({ ...editUserData, description: e.target.value })
                      }
                      className="adminusermange-textarea"
                    />
                  ) : (
                    user.description
                  )}
                </td>
                <td className="adminusermange-table-cell">
                  {editUserId === user._id ? (
                    <input
                      type="text"
                      value={editUserData.profileImage}
                      onChange={(e) =>
                        setEditUserData({ ...editUserData, profileImage: e.target.value })
                      }
                      className="adminusermange-input"
                    />
                  ) : user.profileImage ? (
                    <img
                      src={`http://localhost:5001/${user.profileImage}`}
                      alt="Profile"
                      className="adminusermange-profile-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/default-profile.png';
                      }}
                    />
                  ) : (
                    <span className="adminusermange-no-image">N/A</span>
                  )}
                </td>
                <td className="adminusermange-table-cell">
                  {editUserId === user._id ? (
                    <select
                      value={editUserData.userType}
                      onChange={(e) =>
                        setEditUserData({ ...editUserData, userType: e.target.value })
                      }
                      className="adminusermange-select"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="moderator">Moderator</option>
                      {/* Add more roles as needed */}
                    </select>
                  ) : (
                    user.userType.charAt(0).toUpperCase() + user.userType.slice(1)
                  )}
                </td>
                <td className="adminusermange-table-cell adminusermange-actions">
                  {editUserId === user._id ? (
                    <>
                      <button
                        onClick={() => handleSaveUser(user._id)}
                        className="adminusermange-button save"
                        aria-label="Save"
                        title="Save"
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={handleCancelEditUser}
                        className="adminusermange-button cancel"
                        aria-label="Cancel"
                        title="Cancel"
                      >
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditUser(user)}
                        className="adminusermange-button edit"
                        aria-label="Edit"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="adminusermange-button delete"
                        aria-label="Delete"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
