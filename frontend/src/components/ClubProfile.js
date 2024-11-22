// src/components/ClubProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClubProfile() {
  const [profileData, setProfileData] = useState({ name: '', description: '', contactEmail: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get('/club/profile', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setProfileData(res.data);
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/club/profile', profileData, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      alert('Profile updated successfully!');
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Club Name" value={profileData.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={profileData.description} onChange={handleChange} />
        <input name="contactEmail" placeholder="Contact Email" value={profileData.contactEmail} onChange={handleChange} required />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default ClubProfile;
