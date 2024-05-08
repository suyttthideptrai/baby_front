import React from 'react'
import PropTypes from 'prop-types';


const Header = ({ title, children }) => {
  return (
    <div className='grid
    grid-cols-2
    h-16
    p-5
    items-center 
    place-content-center
    '>
        <p className='font-bold text-xl font-alata'>
            {title}
        </p>
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
        <img className='w-5' src={icon} alt="" />
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
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string])
};
HeaderButton.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    css: PropTypes.string
  };