import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LoginPage from './Login'
import DashBoardPage from './DashBoard'



const MainPage = () => {
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
          <div>
                    <div className='
                              max-w-screen
                              h-screen
                              overflow-x-hidden'>
                    {isAuthenticated ? (
                              <DashBoardPage />
                              ) : (
                              <LoginPage onLogin={handleLogin} />
                    )}
                    {/* <DashBoardPage onLogout={handleLogout} /> */}
                    </div>
          </div>
          )
}

export default MainPage