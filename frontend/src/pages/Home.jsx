import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import Typewriter from 'react-typewriter-effect';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const Home = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  const handlePredict = () => {
    navigate('/predict');
  };

  const handleResults = () => {
    navigate('/results');
  };

  const handleAbouts = () => {
    navigate('/abouts');
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "/api/v1/auth/logout",
        {},
        { withCredentials: true }
      );
      queryClient.invalidateQueries(['authUser']);
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen w-full bg-home px-4'>
      <div className='w-full max-w-md mx-auto'>
        <Typewriter
          text="Home"
          textStyle={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "white",
            textAlign: "center"
          }}
          typeSpeed={100}
          deleteSpeed={50}
          delay={500}
          cursorColor="transparent"
          loop={true}
        />
        <div className='flex flex-col gap-4 mt-8'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full transition-transform hover:scale-105 shadow-lg'
            onClick={handlePredict}
          >
            Predict
          </button>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full transition-transform hover:scale-105 shadow-lg'
            onClick={handleResults}
          >
            Results
          </button>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full transition-transform hover:scale-105 shadow-lg'
            onClick={handleAbouts}
          >
            About
          </button>
          <button
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg w-full transition-transform hover:scale-105 shadow-lg'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {error && <p className='text-red-500 font-bold mt-4 text-center'>{error}</p>}
    </div>
  );
};

export default Home;
