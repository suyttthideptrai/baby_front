import React from 'react'
import PropTypes from 'prop-types'
import QuestionMarkIcon from '../../assets/icons/settings/help_icon.svg'
//import { setShowModal, setModalContent } from '../../redux/modalSlices';


const ConfirmationButton = ({ text, onClick }) => {
  return (
    <div
      className='p-2 border-2 border-black rounded-lg text-center w-14 cursor-pointer hover:bg-primary duration-200 text-sm items-center'
      onClick={onClick}
    >
      {text}
    </div>
  );
};

ConfirmationButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

const DeleteConfirmation = ({ text, yes, no }) => {
  return (
    <div className='
      flex 
      flex-col 
      p-5 space-y-1 
      bg-white 
      border-2 border-black 
      rounded-lg 
      w-[280px] h-[220px] 
      items-center 
      text-center 
      justify-center'
    >
      <div>
        <img className='h-6' src={QuestionMarkIcon} alt='' />
      </div>
      <div className='w-auto text-[14px]'>{text}</div>
      <div className='flex space-x-2'>
        <ConfirmationButton text='Yes' onClick={yes} />
        <ConfirmationButton text='No' onClick={no} />
      </div>
    </div>
  );
};

DeleteConfirmation.propTypes = {
  text: PropTypes.string,
  yes: PropTypes.func,
  no: PropTypes.func,
};

export default DeleteConfirmation;
