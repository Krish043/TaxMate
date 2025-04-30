import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Profile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const user = JSON.parse(localStorage.getItem('auth')) || { auth: false, id: '' };
    if (loading) {
        return <p className="text-center text-green-700">Loading profile...</p>;
      }
    
      if (error) {
        return <p className="text-center text-red-700">{error}</p>;
      }
    
  return (
    <div className="bg-white shadow-xl rounded-lg p-8 mb-8 h-screen pt-24">
          
          {user && (
            <>
              <div className="flex items-center space-x-6 mb-6">
                <img src={user.img} alt="User" className="w-24 h-24 rounded-full object-cover border-4 border-blue-600" />
                <div>
                  <p className="text-2xl font-semibold text-blue-700">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              
            </>
          )}
        </div>
  )
}

export default Profile
