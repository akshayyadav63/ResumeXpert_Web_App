import React, { useState } from 'react';
import Input from './Input';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utills/axiosInstance';
import { API_PATHS } from '../utills/apiPath';

function CreateResumeForm() {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreateResume = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Please enter a resume title');
      return;
    }

    setError(null);
  console.log(API_PATHS.RESUME.CREATE);


    try {
      const token = localStorage.getItem('token'); 
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, { title });
        
      if (response.data && response.data._id) {
        navigate(`/resume/${response.data._id}`);
      } else {
        setError('Unexpected response from server.');
      }
    } catch (err) {
       console.error(err); 
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl border border-gray-100 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Create New Resume</h3>
      <p className="text-gray-600 mb-8">
        Give your resume a title to get started. You can customize everything later.
      </p>

      <form onSubmit={handleCreateResume}>
        <Input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          label="Resume Title"
          placeholder="e.g., Akshay Yadav – Software Engineer"
          type="text"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black rounded-2xl hover:scale-105 hover:shadow-xl hover:shadow-rose-200 transition-all"
        >
          Create Resume
        </button>
      </form>
    </div>
  );
}

export default CreateResumeForm;
