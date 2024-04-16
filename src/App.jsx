import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoginPage from './pages/Login';
import DashBoardPage from './pages/DashBoard';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);

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
    </div>
  );
};

export default App;
