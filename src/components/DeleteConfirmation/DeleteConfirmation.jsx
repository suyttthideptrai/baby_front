import React from 'react'
import PropTypes from 'prop-types'
import QuestionMarkIcon from '../../assets/icons/settings/help_icon.svg'

const DeleteConfirmation = ({text, yes, no}) => {
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
    fixed inset-x-1/2 
    inset-y-1/5
    z-50 
    justify-center'>
        <div>
            <img className='h-6' src={QuestionMarkIcon} alt="" />
        </div>
        <div className='w-auto text-[14px]'>
            {text}
        </div>
        <div className='flex space-x-2'>
            <div className='p-2 border-2 border-black rounded-lg text-center w-14 cursor-pointer hover:bg-[#dddd] duration-200 text-sm items-center' onClick={yes}>
                Yes
            </div>
            <div className='p-2 border-2 border-black rounded-lg text-center w-14 cursor-pointer hover:bg-[#dddd] duration-200 text-sm items-center' onClick={no}>
                No
            </div>
        </div>
    </div>
  )
}

export default DeleteConfirmation

DeleteConfirmation.propTypes = {
    text: PropTypes.string,
    yes: PropTypes.func,
    no: PropTypes.func
};