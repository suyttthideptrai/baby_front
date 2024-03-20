import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavItem = ({ path, name, icon }) => {
  return (
    <li className="
    flex 
    items-center 
    h-[40px]
    p-[5px_5px_5px_5px]
    hover:bg-[#525252]">
      <Link to={path} className="flex items-center">
        <img src={icon} alt={name} className="w-6 h-6 mr-2" />
        <span className='text-white'>{name}</span>
      </Link>
    </li>
  );
};

NavItem.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default NavItem;
