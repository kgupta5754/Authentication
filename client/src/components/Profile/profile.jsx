import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the JWT token from local storage
        const response = await axios.get('http://localhost:2222/pro/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header with the token
          },
        });
        setUserProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>First Name: {userProfile.firstName}</p>
      <p>Last Name: {userProfile.lastName}</p>
      <p>Email: {userProfile.email}</p>
      {/* Display other user profile information as needed */}
    </div>
  );
}

export default Profile;
