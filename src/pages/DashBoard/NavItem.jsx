import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavItem = ({ path, name, icon, activeNav, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(path);
    }
  }
  return (
    <li className={"flex pl-3 items-center h-[50px] py-6 hover:bg-[#525252] hover:bg-opacity-50 duration-200 " + ((activeNav === path) ? "bg-[#525252] rounded-md bg-opacity-50" : "")}
    onClick={handleClick}
    >
      <Link 
        to={path} 
        className="flex items-center w-full h-full p-2"
      >
        
        <img src={icon} alt={name} className="w-8 mr-2" />
        <span className='text-white text-lg'>{name}</span>
      </Link>
    </li>
  );
};

NavItem.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  activeNav: PropTypes.string,
  onClick: PropTypes.func,
};

export default NavItem;
