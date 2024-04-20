import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoginPage from './pages/Login';
import DashBoardPage from './pages/DashBoard';
import Modal from '../src/components/Modal/Modal';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);
  const showModal = useSelector(state => state.modal.showModal);
  // const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  
  return (
    <div className='
    max-w-screen
    h-screen
    overflow-x-hidden'>
      {isAuthenticated ? (
        <DashBoardPage />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
      <Modal open={showModal} />
    </div>
  );
};

export default App;
