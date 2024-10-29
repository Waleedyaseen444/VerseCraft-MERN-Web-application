import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

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
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ padding: '20px'  }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Manage Users</h2>
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '20px',
            border: '1px solid #ddd',
          }}
        >
          <thead>
            <tr>
              {['Full Name', 'Email', 'Age', 'Gender', 'Phone', 'Description', 'Profile Image', 'Actions'].map(
                (header) => (
                  <th
                    key={header}
                    style={{
                      padding: '10px',
                      backgroundColor: '#f8f8f8',
                      borderBottom: '1px solid #ddd',
                      textAlign: 'left',
                    }}
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  {editUserId === user._id ? (
                    <input
                      type="text"
                      value={editUserData.fullname}
                      onChange={(e) => setEditUserData({ ...editUserData, fullname: e.target.value })}
                      style={{ width: '100%', padding: '5px' }}
                    />
                  ) : (
                    user.fullname
                  )}
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  {editUserId === user._id ? (
                    <input
                      type="email"
                      value={editUserData.email}
                      onChange={(e) => setEditUserData({ ...editUserData, email: e.target.value })}
                      style={{ width: '100%', padding: '5px' }}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  {editUserId === user._id ? (
                    <input
                      type="number"
                      value={editUserData.age}
                      onChange={(e) => setEditUserData({ ...editUserData, age: e.target.value })}
                      style={{ width: '100%', padding: '5px' }}
                    />
                  ) : (
                    user.age
                  )}
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  {editUserId === user._id ? (
                    <select
                      value={editUserData.gender}
                      onChange={(e) => setEditUserData({ ...editUserData, gender: e.target.value })}
                      style={{ width: '100%', padding: '5px' }}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    user.gender
                  )}
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  {editUserId === user._id ? (
                    <input
                      type="text"
                      value={editUserData.phone}
                      onChange={(e) => setEditUserData({ ...editUserData, phone: e.target.value })}
                      style={{ width: '100%', padding: '5px' }}
                    />
                  ) : (
                    user.phone
                  )}
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  {editUserId === user._id ? (
                    <textarea
                      value={editUserData.description}
                      onChange={(e) => setEditUserData({ ...editUserData, description: e.target.value })}
                      style={{ width: '100%', padding: '5px', resize: 'vertical' }}
                    />
                  ) : (
                    user.description
                  )}
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  {editUserId === user._id ? (
                    <input
                      type="text"
                      value={editUserData.profileImage}
                      onChange={(e) => setEditUserData({ ...editUserData, profileImage: e.target.value })}
                      style={{ width: '100%', padding: '5px' }}
                    />
                  ) : user.profileImage ? (
                    <img
                      src={`http://localhost:5001/${user.profileImage}`}
                      alt="Profile"
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/default-profile.png';
                      }}
                    />
                  ) : (
                    <span>N/A</span>
                  )}
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  {editUserId === user._id ? (
                    <>
                      <button
                        onClick={() => handleSaveUser(user._id)}
                        style={{
                          padding: '5px 10px',
                          margin: '2px',
                          backgroundColor: '#28a745',
                          color: 'white',
                          border: 'none',
                          borderRadius: '3px',
                          cursor: 'pointer',
                        }}
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={handleCancelEditUser}
                        style={{
                          padding: '5px 10px',
                          margin: '2px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '3px',
                          cursor: 'pointer',
                        }}
                      >
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditUser(user)}
                        style={{
                          padding: '5px 10px',
                          margin: '2px',
                          backgroundColor: '#ffc107',
                          color: 'white',
                          border: 'none',
                          borderRadius: '3px',
                          cursor: 'pointer',
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        style={{
                          padding: '5px 10px',
                          margin: '2px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '3px',
                          cursor: 'pointer',
                        }}
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
