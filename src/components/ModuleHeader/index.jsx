import React from 'react'
import PropTypes from 'prop-types';


const Header = ({ title, children, middleChild }) => {
  return (
    <div className='flex
    h-16
    p-5
    items-center 
    place-content-between
    '>
        <p className='font-bold text-2xl font-alata'>
            {title}
        </p>
        <div>
            {middleChild}
        </div>
        <div className='flex justify-self-end gap-x-6 items-center'>
          {children}
        </div>
    </div>
  )
}

export default Header;

export const HeaderButton = ({ icon, title, onClick, css }) => {
    
    const handleClick = () => {
        onClick()
    }

    return (
    <div className={"flex p-2.5 gap-x-2 rounded-xl cursor-pointer transition-all select-none duration-200 bg-secondary hover:rounded-md hover:bg-[#EAECF0] " + css } onDoubleClick={handleClick}>
        {
          icon &&
          <img className='w-5' src={icon} alt="" />
        }
        {
          title &&
          <span
          className='font-alata'
          >{title}</span>
        }
    </div>)
}

Header.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: PropTypes.arrayOf(PropTypes.node),
    middleChild: PropTypes.elementType
};
HeaderButton.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    css: PropTypes.string
  };