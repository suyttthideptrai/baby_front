import React from 'react'
import { useEffect } from 'react'
import { setAuthenticated } from '../../redux/auth'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () =>{
      dispatch(setAuthenticated(false));
      navigate("/");
      window.location.reload()
    }
    useEffect(() => {
      handleLogout();
    }, [])
  return (
    <>
    </>
  )
}

export default Logout;