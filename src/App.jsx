import React, { useState, useEffect } from 'react';
import LoginPage from './pages/Login';
import DashBoardPage from './pages/DashBoard';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      {isLoggedIn ? (
        <DashBoardPage onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
      {/* <DashBoardPage onLogout={handleLogout} /> */}
    </div>
  );
};

export default App;
