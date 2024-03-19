import React from 'react'
import { Link } from 'react-router-dom'

const NavItem = ( path, name, icon) => {
  return (
    <li>
        <img src={icon} alt="icon"/> 
        <Link to={path}> {name} </Link>
    </li>
  )
}

export default NavItem