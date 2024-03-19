// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
// Functional component
function ButtonLarge(props) {
  const { onClick, children } = props;

  return (
    <div className=' 
    hover:bg-[#525252]
    duration-300
    shadow-[0px_8px_21px_0px_rgba(0,0,0,0.16)]
    rounded-[16px]
    bg-[#0A66C2]
    m-[0_37.4px_18px_0]
    flex
    flex-row
    justify-center
    p-[17px_1.3px_17px_0]
    w-[124px]
    box-sizing-border
    cursor-pointer
    '>
        <button onClick={onClick} className=" break-words
          font-poppins
          font-bold
          text-[12px]
          text-[#FFFFFF]" >
      {children}
    </button>
    </div>
  );
}

ButtonLarge.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
  };

export default ButtonLarge;
