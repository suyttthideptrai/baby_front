import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavItem = ({ path, name, icon, css }) => {
  return (
    <li className=
    {"flex items-center h-[50px] py-6 hover:bg-[#525252] hover:bg-opacity-50 duration-200 " + css}
    >
      <Link to={path} className="flex items-center w-full h-full p-2">
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
  css: PropTypes.string
};

export default NavItem;
