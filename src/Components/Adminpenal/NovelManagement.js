import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const NovelManagement = () => {
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editNovelId, setEditNovelId] = useState(null);
  const [editNovelData, setEditNovelData] = useState({});

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const novelsRes = await axios.get('http://localhost:5001/api/admin/novels');
      setNovels(novelsRes.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  const handleDeleteNovel = async (id) => {
    if (!window.confirm('Are you sure you want to delete this novel?')) return;
    try {
      await axios.delete(`http://localhost:5001/api/admin/novels/${id}`);
      setNovels(novels.filter((novel) => novel._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete novel. Please try again.');
    }
  };

  const handleEditNovel = (novel) => {
    setEditNovelId(novel._id);
    setEditNovelData({ ...novel });
  };

  const handleCancelEditNovel = () => {
    setEditNovelId(null);
    setEditNovelData({});
  };

  const handleSaveNovel = async (id) => {
    try {
      await axios.put(
        `http://localhost:5001/api/admin/novels/${id}`,
        editNovelData
      );
      setNovels(
        novels.map((novel) => (novel._id === id ? editNovelData : novel))
      );
      setEditNovelId(null);
      setEditNovelData({});
    } catch (err) {
      console.error(err);
      alert('Failed to update novel. Please check the input and try again.');
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p style={{ fontSize: '18px' }}>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', color: 'red', padding: '20px' }}>
        <p style={{ fontSize: '18px' }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Manage Novels</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={thStyle}>Short ID</th>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Genres</th>
              <th style={thStyle}>Tags</th>
              <th style={thStyle}>Author Email</th>
              <th style={thStyle}>Textfile ID</th>
              <th style={thStyle}>Collaborators</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {novels.map((novel) => (
              <tr key={novel._id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={tdStyle}>{novel.shortId}</td>
                <td style={tdStyle}>
                  {editNovelId === novel._id ? (
                    <input
                      type="text"
                      value={editNovelData.title}
                      onChange={(e) =>
                        setEditNovelData({
                          ...editNovelData,
                          title: e.target.value,
                        })
                      }
                      style={inputStyle}
                    />
                  ) : (
                    novel.title
                  )}
                </td>
                <td style={tdStyle}>
                  {editNovelId === novel._id ? (
                    <textarea
                      value={editNovelData.description}
                      onChange={(e) =>
                        setEditNovelData({
                          ...editNovelData,
                          description: e.target.value,
                        })
                      }
                      style={{ ...inputStyle, height: '60px' }}
                    />
                  ) : (
                    novel.description
                  )}
                </td>
                <td style={tdStyle}>
                  {editNovelId === novel._id ? (
                    <input
                      type="text"
                      value={editNovelData.genres.join(', ')}
                      onChange={(e) =>
                        setEditNovelData({
                          ...editNovelData,
                          genres: e.target.value.split(',').map((g) => g.trim()),
                        })
                      }
                      style={inputStyle}
                    />
                  ) : (
                    novel.genres.join(', ')
                  )}
                </td>
                <td style={tdStyle}>
                  {editNovelId === novel._id ? (
                    <input
                      type="text"
                      value={editNovelData.tags.join(', ')}
                      onChange={(e) =>
                        setEditNovelData({
                          ...editNovelData,
                          tags: e.target.value.split(',').map((t) => t.trim()),
                        })
                      }
                      style={inputStyle}
                    />
                  ) : (
                    novel.tags.join(', ')
                  )}
                </td>
                <td style={tdStyle}>{novel.authorEmail}</td>
                <td style={tdStyle}>{novel.textfileId || 'N/A'}</td>
                <td style={tdStyle}>
                  {novel.collaborators && novel.collaborators.length > 0 ? (
                    novel.collaborators.map((collab) => collab.email).join(', ')
                  ) : (
                    'N/A'
                  )}
                </td>
                <td style={tdStyle}>
                  {editNovelId === novel._id ? (
                    <>
                      <button
                        onClick={() => handleSaveNovel(novel._id)}
                        style={buttonStyle}
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={handleCancelEditNovel}
                        style={{ ...buttonStyle, backgroundColor: '#d9534f' }}
                      >
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditNovel(novel)}
                        style={{ ...buttonStyle, backgroundColor: '#5bc0de' }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteNovel(novel._id)}
                        style={{ ...buttonStyle, backgroundColor: '#d9534f' }}
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

const thStyle = {
  padding: '12px',
  textAlign: 'left',
  backgroundColor: '#f8f8f8',
  borderBottom: '1px solid #ddd',
  fontWeight: 'bold',
};

const tdStyle = {
  padding: '12px',
  textAlign: 'left',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  boxSizing: 'border-box',
};

const buttonStyle = {
  margin: '5px',
  padding: '8px',
  backgroundColor: '#5cb85c',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '4px',
};

export default NovelManagement;
