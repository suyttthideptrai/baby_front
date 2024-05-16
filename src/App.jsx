import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoginPage from './pages/Login';
import DashBoardPage from './pages/DashBoard';
import Modal from '../src/components/Modal/Modal';

const App = () => {
  const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);
  const showModal = useSelector(state => state.modal.showModal);

  return (
    <div className='
    min-w-screen
    min-h-screen
    overflow-x-hidden'>
      {isAuthenticated ? (
        <DashBoardPage />
      ) : (
        <LoginPage />
      )}
      <Modal open={showModal} />
    </div>
  );
};

export default App;
